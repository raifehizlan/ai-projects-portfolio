# ----- Kütüphane importları -----
from flask import Flask, request, jsonify
from flask_cors import CORS
from decouple import config
from transformers import AutoModelForTokenClassification, AutoTokenizer 
from aimped.nlp.tokenizer import sentence_tokenizer, word_tokenizer
from aimped.nlp.pipeline import Pipeline
import torch
import warnings
import os, json, requests, sys
from flasgger import Swagger
from flasgger import swag_from
# Local modül erişimi
sys.path.append(os.path.abspath(os.path.dirname(__file__)))
from model_loader import AzureModelLoader

# ----- Uyarıları kapat -----
warnings.filterwarnings('ignore')

# ----- Flask uygulamasını başlat -----
app = Flask(__name__)
CORS(app)  # Tüm domainlere CORS açılır
# ----- Swagger Yapılandırması -----
SWAGGER_CONFIG = {
    'swagger': '2.0',
    'title': 'NER Model API',
    'description': 'İlaç ve yan etki tespiti için geliştirilmiş Named Entity Recognition (NER) API.',
    'basePath': '/',
    'specs': [
        {
            'endpoint': 'health',
            'route': '/health.json',
            'rule_filter': lambda rule: True,  # Tüm kuralları dahil et
            'model_filter': lambda model: True,  # Tüm modelleri dahil et
        },
        {
            'endpoint': 'predict',
            'route': '/predict.json',
            'rule_filter': lambda rule: True,  # Tüm kuralları dahil et
            'model_filter': lambda model: True,  # Tüm modelleri dahil et
        }
    ],
    'static_url_path': '/flasgger_static',
    'swagger_ui': True,
    'specs_route': '/apidocs/'
}
app.config['SWAGGER'] = SWAGGER_CONFIG
swagger = Swagger(app)

print("Model dependencies imported")


# ----- Model Sınıfı -----
class NerModel:
    def __init__(self):
        self.name = config("MODEL_NAME")
        self.container_name = config("AZURE_STORAGE_CONTAINER")
        self.prefix = config("PREFIX")
        self.device = "cpu"
        self.local_dir = os.path.abspath(__file__).replace("main.py", config("LOCAL_FOLDER"))
        self.ready = False
        self.data_type = "data_json"

        self.model = None
        self.tokenizer = None
        self.pipe = None

        self.backend_url = config("BACKEND_URL", default=None)

        # Modeli Azure'dan indir
        model_loader = AzureModelLoader(
            connection_string=config("AZURE_STORAGE_CONNECTION_STRING"),
            container_name=self.container_name,
            prefix=self.prefix,
            local_dir=self.local_dir
        )
        model_loader.download_blobs()

        self.load()

    def load(self):
        try:
            print("model load")
            self.model = AutoModelForTokenClassification.from_pretrained(self.local_dir)
            self.model.to(self.device)
            self.tokenizer = AutoTokenizer.from_pretrained(self.local_dir)
            self.pipe = Pipeline(model=self.model, tokenizer=self.tokenizer, device=self.device)
            self.ready = True
            print(f"Model loaded successfully: {self.name}")
        except Exception as e:
            print(f"Error loading model: {e}")
            self.ready = False

    def get_prediction(self, text, white_label_list):
        sentences = sentence_tokenizer(text, "english")
        sents_tokens_list = word_tokenizer(sentences)
        tokens, preds, probs, begins, ends = self.pipe.ner_result(text=text, sents_tokens_list=sents_tokens_list, sentences=sentences)

        if not white_label_list:
            white_label_list = [
                "Drug", "ADE", "Reason", "Duration", "Form", "Route", "Strength", "Dosage",
                "Frequency"]

        results = self.pipe.chunker_result(text, white_label_list, tokens, preds, probs, begins, ends)

        return results

    def predict(self, request_data):
        if not self.ready:
            return {"status": False, "error": "Model not loaded", "output": []}, 503

        texts = request_data.get("text", [])
        entity = request_data.get("entity", [])


        if not texts:
            return {"status": False, "error": "No input text provided", "output": []}, 400

        try:
            outputs = [self.get_prediction(text, entity) for text in texts]
            return {
                "status": True,
                "data_type": self.data_type,
                "output": outputs,
                "error": None
            }, 200
        except Exception as e:
            print(f"Prediction error: {e}")
            return {"status": False, "error": str(e), "output": []}, 500


# ----- Modeli yükle -----
model_instance = NerModel()

swagger_file_path_health = './docs/health.yml'
print(swagger_file_path_health)
swagger_file_path_predict = './docs/predict.yml'

#----- Health check endpoint -----
@app.route("/health", methods=["GET"])
@swag_from(swagger_file_path_health)
def health():
    return jsonify({
        "name": model_instance.name,
        "status": "Ready" if model_instance.ready else "Loading"
    }), 200

# ----- Prediction endpoint -----
@app.route("/predict", methods=["POST"])
@swag_from(swagger_file_path_predict)
def predict():
    request_data = request.get_json()
    response_data, status_code = model_instance.predict(request_data)
    return jsonify(response_data), status_code


# ----- Giriş noktası -----
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
