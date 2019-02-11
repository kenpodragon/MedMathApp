//DECLARE ENUMS
const SCENARIO_TYPES = {
    DPM_CALC_WB: "DPM_CALC_WB",
    DPM_CALC_NWB: "DPM_CALC_NWB",
    IV_BOLUS_WB: "IV_BOLUS_WB",
    IV_BOLUS_NWB: "IV_BOLUS_NWB",
    DPM_RATE: "DPM_RATE"
};

const SCENARIO_TYPES_KEYS = Object.keys(SCENARIO_TYPES);

const MED_SCENARIO_CLASS = {
    //TODO: Make more of these
    CARDIAC: "Cardiac"
};

const KG_LB = {
    KG: "kg",
    LB: "lb"
};

const KG_LB_KEYS = Object.keys(KG_LB);

const G_MG_MCG = {
    G: "g",
    MG: "mg",
    MCG: "mcg"
};

const CONDITION_TEXTS = [
    {type: "Cardiac", condition: "suffering from a right branch bundle block"}
];

const G_MG_MCG_KEYS = Object.keys(G_MG_MCG);

const ANSWER_OPTS ={
    gttMin: "gtt/min",
    ML: "ml"
};

const ANSWER_OPTS_KEYS = Object.keys(ANSWER_OPTS);


const DS_TYPES = [
    {name: "Macro (10gtt/ml)", rate:10},
    {name: "Macro 15 (15gtt/ml)", rate:15},
    {name: "Micro (60gtt/ml)", rate:60}
];

const GENDERS = [
    "M","F"
];

const DRUGS = [
    //All drug dose ranges are given in mg
    //FORMAT NAME, Adult dose [low, high] ped_dose [low, high], type: what it treats
    {name: "Amioderone", adult_dose: [5,15], ped_dose: [5,10], type: MED_SCENARIO_CLASS.CARDIAC}
];

const BAGS = [
  50,100,250,500,1000
];

const WEIGHT_OPTIONS = [
    {kg: 0, lb: 0},
    {kg: 5, lb: 11},
    {kg: 10, lb: 22},
    {kg: 15, lb: 33},
    {kg: 20, lb: 44},
    {kg: 25, lb: 55},
    {kg: 30, lb: 66},
    {kg: 35, lb: 77},
    {kg: 40, lb: 88},
    {kg: 45, lb: 99},
    {kg: 50, lb: 110},
    {kg: 60, lb: 132},
    {kg: 70, lb: 154},
    {kg: 80, lb: 176},
    {kg: 90, lb: 198},
    {kg: 100, lb: 220},
    {kg: 110, lb: 242},
    {kg: 120, lb: 264},
    {kg: 130, lb: 286},
    {kg: 140, lb: 308},
    {kg: 150, lb: 330},
    {kg: 160, lb: 352},
    {kg: 170, lb: 374},
    {kg: 180, lb: 396}
];

