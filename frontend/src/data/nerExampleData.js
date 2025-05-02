
const nerExampleData = [ {text :
    "Medications include: Metformin 850 mg twice daily, Actos 30 mg daily, sitagliptin 100 mg daily.",
      entities :[
        {
          "begin": 21,
          "chunk": "Metformin",
          "confidence": 0.9999693632125854,
          "end": 30,
          "entity": "Drug"
        },
        {
          "begin": 31,
          "chunk": "850 mg",
          "confidence": 0.9999852180480957,
          "end": 37,
          "entity": "Strength"
        },
        {
          "begin": 38,
          "chunk": "twice daily",
          "confidence": 0.9999650716781616,
          "end": 49,
          "entity": "Frequency"
        },
        {
          "begin": 51,
          "chunk": "Actos",
          "confidence": 0.999991774559021,
          "end": 56,
          "entity": "Drug"
        },
        {
          "begin": 57,
          "chunk": "30 mg",
          "confidence": 0.9999821186065674,
          "end": 62,
          "entity": "Strength"
        },
        {
          "begin": 63,
          "chunk": "daily",
          "confidence": 0.9999542236328125,
          "end": 68,
          "entity": "Frequency"
        },
        {
          "begin": 70,
          "chunk": "sitagliptin",
          "confidence": 0.9999915361404419,
          "end": 81,
          "entity": "Drug"
        },
        {
          "begin": 82,
          "chunk": "100 mg",
          "confidence": 0.9999849796295166,
          "end": 88,
          "entity": "Strength"
        },
        {
          "begin": 89,
          "chunk": "daily",
          "confidence": 0.9999489784240723,
          "end": 94,
          "entity": "Frequency"
        }
      ]},
      
    { text : "SA 42 year-old woman with type 1 diabetes for 22 years was married recently, and she and her husband have decided to have a child. Neither had children previously. The woman has hypertension treated with an angiotensin converting enzyme (ACE) inhibitor and a diuretic with maintenance of blood pressure at 120/80 mm Hg. Her glycated hemoglobin (HbA1c) is 6.7% (normal, <5.7%). Her insulin doses are all administered through a continuous insulin infusion pump using insulin aspart. Her present weight is 60 kgÍ¾ thus, her insulin requirement was calculated as 0.6 times her weight in kilograms = 36 units per day with 1/2 basal and 1/2 bolus. She reported that she would try to become pregnant next month.",
        entities : [
            {
              "begin": 178,
              "chunk": "hypertension",
              "confidence": 0.98616623878479,
              "end": 190,
              "entity": "Reason"
            },
            {
              "begin": 207,
              "chunk": "angiotensin converting enzyme (ACE) inhibitor",
              "confidence": 0.9435437917709351,
              "end": 252,
              "entity": "Drug"
            },
            {
              "begin": 259,
              "chunk": "diuretic",
              "confidence": 0.9131276607513428,
              "end": 267,
              "entity": "Drug"
            },
            {
              "begin": 381,
              "chunk": "insulin",
              "confidence": 0.9996869564056396,
              "end": 388,
              "entity": "Drug"
            },
            {
              "begin": 437,
              "chunk": "insulin",
              "confidence": 0.9993079900741577,
              "end": 444,
              "entity": "Drug"
            },
            {
              "begin": 445,
              "chunk": "infusion pump",
              "confidence": 0.6683349609375,
              "end": 458,
              "entity": "Form"
            },
            {
              "begin": 465,
              "chunk": "insulin aspart",
              "confidence": 0.9907059073448181,
              "end": 479,
              "entity": "Drug"
            },
            {
              "begin": 521,
              "chunk": "insulin",
              "confidence": 0.9849677681922913,
              "end": 528,
              "entity": "Drug"
            },
            {
              "begin": 595,
              "chunk": "36 units",
              "confidence": 0.7907711863517761,
              "end": 603,
              "entity": "Dosage"
            },
            {
              "begin": 635,
              "chunk": "bolus",
              "confidence": 0.37209996581077576,
              "end": 640,
              "entity": "Form"
            }
          ]}]

export default nerExampleData;
