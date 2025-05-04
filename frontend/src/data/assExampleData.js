const assExampleData = [
    {
      text: "His wife died in 2012 due to metastatic lung cancer. The patient was referred from an outside hospital with a chief complaint of increasing shortness of breath and tires easily with exertion. Docusate Sodium 100 mg Capsule as needed for constipation. Due to suboptimal technical quality, a focal wall motion abnormality cannot be fully excluded.",
      entities:[
        {
          "begin": 29,
          "end": 51,
          "ner_label": "problem",
          "chunk": "metastatic lung cancer",
          "assertion": "associated_with_someone_else",
          "score": 0.9890418648719788
        },
        {
          "begin": 129,
          "end": 159,
          "ner_label": "problem",
          "chunk": "increasing shortness of breath",
          "assertion": "present",
          "score": 0.9990553259849548
        },
        {
          "begin": 164,
          "end": 176,
          "ner_label": "problem",
          "chunk": "tires easily",
          "assertion": "conditional",
          "score": 0.9821186065673828
        },
        {
          "begin": 192,
          "end": 207,
          "ner_label": "treatment",
          "chunk": "Docusate Sodium",
          "assertion": "hypothetical",
          "score": 0.9176350831985474
        },
        {
          "begin": 237,
          "end": 249,
          "ner_label": "problem",
          "chunk": "constipation",
          "assertion": "hypothetical",
          "score": 0.9916055202484131
        },
        {
          "begin": 288,
          "end": 319,
          "ner_label": "problem",
          "chunk": "a focal wall motion abnormality",
          "assertion": "possible",
          "score": 0.9948655962944031
        }
      ]
    },
    {
      text: "Pts father died at 50 years from myocarditis. Pt denied SOB but sent to the Orthopedics for further evaluation. In TSICU , developed MRSA pneumonia with question of aspiration, treated Zosyn then 2 week course of Linazolid with resolution of fevers and pulmonary secretions. It was said Go to an Emergency Room if you experience continuing vomiting.",
      entities:   [
        {
          "begin": 33,
          "end": 44,
          "ner_label": "problem",
          "chunk": "myocarditis",
          "assertion": "associated_with_someone_else",
          "score": 0.9886453151702881
        },
        {
          "begin": 56,
          "end": 59,
          "ner_label": "problem",
          "chunk": "SOB",
          "assertion": "absent",
          "score": 0.9985806941986084
        },
        {
          "begin": 92,
          "end": 110,
          "ner_label": "test",
          "chunk": "further evaluation",
          "assertion": "present",
          "score": 0.9815264344215393
        },
        {
          "begin": 133,
          "end": 147,
          "ner_label": "problem",
          "chunk": "MRSA pneumonia",
          "assertion": "present",
          "score": 0.9992969036102295
        },
        {
          "begin": 165,
          "end": 175,
          "ner_label": "problem",
          "chunk": "aspiration",
          "assertion": "possible",
          "score": 0.9960575103759766
        },
        {
          "begin": 185,
          "end": 190,
          "ner_label": "treatment",
          "chunk": "Zosyn",
          "assertion": "present",
          "score": 0.9992507100105286
        },
        {
          "begin": 213,
          "end": 222,
          "ner_label": "treatment",
          "chunk": "Linazolid",
          "assertion": "present",
          "score": 0.9989213943481445
        },
        {
          "begin": 242,
          "end": 248,
          "ner_label": "problem",
          "chunk": "fevers",
          "assertion": "absent",
          "score": 0.9978640675544739
        },
        {
          "begin": 253,
          "end": 273,
          "ner_label": "problem",
          "chunk": "pulmonary secretions",
          "assertion": "absent",
          "score": 0.9967071413993835
        },
        {
          "begin": 329,
          "end": 348,
          "ner_label": "problem",
          "chunk": "continuing vomiting",
          "assertion": "hypothetical",
          "score": 0.9944045543670654
        }
      ]
    }
  ];
  
  export default assExampleData;
  