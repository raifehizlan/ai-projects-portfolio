
const clsExampleData = [ {text :
    "Successful treatment with carbimazole	of a hyperthyroid pregnancy with  hepatic impairment  after propylthiouracil administration:",
      output: [
    {
      "category": [
        "Positive"
      ],
      "classes": [
        {
          "label": "Positive",
          "score": 0.85
        },
        {
          "label": "Negative",
          "score": 0.15
        }
      ]
    }
  ]},
      
    { text : "Reversal of severe methanol-induced visual impairment: no evidence of retinal toxicity due to fomepizole.",
    output: [
            {
              "category": [
                "Positive"
              ],
              "classes": [
                {
                  "label": "Positive",
                  "score": 0.75
                },
                {
                  "label": "Negative",
                  "score": 0.25
                }
              ]
            }
          ]}]

export default clsExampleData;
