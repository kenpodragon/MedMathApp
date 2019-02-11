//HELPER CLASS
class Scenario {
    constructor() {
        this.scenarioType = getRandomType();
    }

    generateNewScenario() {
        this.scenarioType = getRandomType();
        this.initializeValues();
        this.generateText();
    }

    generateNewScenarioAndUpdatePage(scope) {
        this.generateNewScenario();
        this.updatePage(scope);
        Scenario.showAndHideDivs(scope, this.scenarioType);
    }

    updatePage(scope) {
        scope.scenarioText = this.scenarioText;
        scope.calcFormText = this.calcFormHint;
    }

    static showAndHideDivs(scope, sType) {
        Scenario.hideAllDivs(scope);

        switch (sType) {
            case SCENARIO_TYPES.DPM_CALC_WB: {
                scope.showWeightCalcArea = true;
            }
            case SCENARIO_TYPES.DPM_CALC_NWB:{
                scope.doseOnHandArea = true;
                scope.desiredDoseArea = true;
                scope.dripSetArea = true;
                break;
            }
            case SCENARIO_TYPES.IV_BOLUS_WB: {
                scope.showWeightCalcArea = true;
            }
            case SCENARIO_TYPES.IV_BOLUS_NWB:{
                scope.doseOnHandArea = true;
                scope.desiredDoseArea = true;
                break;
            }
            case SCENARIO_TYPES.DPM_RATE: {
                scope.dripSetArea= true;
                scope.fluidRateArea = true;
                break;
            }
            default:
                console.log("Invalid Scenario Type");
        }
    }

    static hideAllDivs(scope){
        scope.desiredDoseArea = false;
        scope.showWeightCalcArea = false;
        scope.doseOnHandArea = false;
        scope.dripSetArea= false;
        scope.ivBolusArea = false;
        scope.fluidRateArea = false;

    }

    initializeValues() {
        this.ptGender = Scenario.getRandomGender();
        this.ptAge = Scenario.getRandomAge();

        //TODO: Set this to 1 for scenarios that aren't weight based
        if(this.scenarioType===SCENARIO_TYPES.DPM_CALC_NWB||this.scenarioType===SCENARIO_TYPES.IV_BOLUS_NWB){
            this.ptWeight.kg = 1;
        } else{
            this.ptWeight = Scenario.getRandomWeight(this.ptGender,this.ptAge);
        }
        this.ptWeight = Scenario.getRandomWeight(this.ptGender,this.ptAge);
        this.ptCondition = Scenario.getRandomConditionType();
        this.drug = Scenario.getRandomDrug(this.ptGender,this.ptAge,this.ptCondition);
        this.dosePerKg = Scenario.getRandomDosage(this.drug,this.ptAge);

        this.dripSetType = DS_TYPES[0];
        this.ampules = Math.floor(Math.random()*3+1);
        this.ampuleDrugWeight = Scenario.getRandomDrugWeight(this.dosePerKg, this.ampules);
        this.ampuleDrugVolume = Scenario.getRandomDrugVolume();
        this.bagVol = Scenario.getRandomBag();
        this.time = Scenario.getRandomTime();

        //CALCULATED ANSWERS
        this.medTotalWeight = this.ampules*this.ampuleDrugWeight;
        this.medConc = (this.ampuleDrugWeight/this.ampuleDrugVolume).toFixed(3);

        this.doseOnHand = (this.medTotalWeight/this.bagVol).toFixed(3);
        this.desiredDose = this.ptWeight.kg*this.dosePerKg;
        this.mlRequired = (this.desiredDose/this.medConc).toFixed(3);
        this.gttMinBag = (this.bagVol * this.dripSetType.rate / this.time).toFixed(3);
        this.gttMinDrug = (this.desiredDose * this.dripSetType.rate / this.doseOnHand).toFixed(3);
    }

    static getRandomTime() {
        let baseNum = 1;
        let randNum = Math.random();
        if(randNum<=0.33) {
            baseNum = 10;
        }
        else if (randNum<=0.66){
            baseNum = 15;
        }
        else {
            baseNum = 60;
        }
        let maxTime = 24;
        let minTime = 1;
        return Math.ceil(Math.random()*maxTime + minTime)*baseNum;
    }

    static getRandomConditionType() {
        //TODO: Make this random
        return MED_SCENARIO_CLASS[0];
    }

    static getRandomDrugWeight(dosePerKg, ampules) {
        let maxDoseScaling = 10;
        let maxDose = dosePerKg * (Math.random()*maxDoseScaling+1);
        return Math.ceil(maxDose / ampules);
    }

    static getRandomDrugVolume() {
        let maxMLSize = 50;
        let minMLSize = 5;
        return Math.ceil(Math.random()*maxMLSize + minMLSize);
    }

    static getRandomWeight(gender,age){
        //TODO: Random weight generator incorporate gender and age here
        let idx = Math.floor(Math.random()*WEIGHT_OPTIONS.length + 1);
        return WEIGHT_OPTIONS[idx];
    }

    static getRandomBag() {
        let idx = Math.floor(Math.random()*BAGS.length);
        return BAGS[idx];
    }

    static getRandomGender(){
        let idx = Math.floor(Math.random()*GENDERS.length);
        return GENDERS[idx];
    }

    static getRandomAge() {
        let minAge = 1;
        let maxAge = 100;
        return Math.ceil(Math.random()*maxAge + minAge);
    }

    static getRandomDrug(gender, age, ptConditionType) {
        //TODO: get a random drug appropriate for the gender/age group
        return DRUGS[0];
    }

    static getRandomConditionText(medType){
        //TODO: Based on the condition, get condition text
        return CONDITION_TEXTS[0];
    }

    static getRandomDosage(drug, age) {
        let range_low = 0;
        let range_high = 0;
        if(age<18){
            range_low = drug.ped_dose[0];
            range_high = drug.ped_dose[1];
        }
        else{
            range_low = drug.adult_dose[0];
            range_high = drug.adult_dose[1];
        }
        return Math.ceil(Math.random()*range_high +range_low);
    }

    generateText() {
        this.scenarioText = this.scenarioHeader();

        switch (this.scenarioType) {
            case SCENARIO_TYPES.DPM_CALC_WB: {
                this.scenarioText += this.genDPMScenarioText(0);
                this.calcFormHint = "PER MINUTE (Weight Based): PtWT * DD x DRIPSET / DOH [DOH = DRUG WT / BAG]";
                break;
            }
            case SCENARIO_TYPES.DPM_CALC_NWB: {
                this.scenarioText += this.genDPMScenarioText(1);
                this.calcFormHint = "PER MINUTE: DD x DRIPSET / DOH [DOH = DRUG WT / BAG]";
                break;
            }
            case SCENARIO_TYPES.IV_BOLUS_WB:
                this.scenarioText += this.genIVBolusScenarioText(0);
                this.calcFormHint = "IV BOLUS/PUSH (Weight Based): PtWT * DD / DOH [DOH = DRUG WT / DRUG VOL]";
                break;
            case SCENARIO_TYPES.IV_BOLUS_NWB: {
                this.scenarioText += this.genIVBolusScenarioText(1);
                this.calcFormHint = "IV BOLUS/PUSH: DD / DOH [DOH = DRUG WT / VOL]";
                break;
            }
            case SCENARIO_TYPES.DPM_RATE: {
                this.scenarioText += this.genDPMRateScenarioText();
                this.calcFormHint = "OVER TIME: BAG * DRIPSET / TIME";
                break;
            }
            default:
                console.log("Invalid Scenario Type");
        }

    }

    scenarioHeader(){
        let outputText = "You have a " + this.ptAge + "yo " + this.ptGender + " ";
        outputText += Scenario.getRandomConditionText(this.ptCondition).condition;
        outputText += ". ";
        return outputText;
    }

    static getRandomKGorLB(weightObject){
        if(Math.random()<=0.5)
            return [weightObject.kg,"kg"];
        else
            return [weightObject.lb,"lb"];
    }


    genIVBolusScenarioText(number) {
        //0 = weight based; 1 = non weight based
        //TODO: more ways to word this, look at structural components and use text formatting.
        let outputText = "";
        if(number===1){
            //TODO: dose per KG in g/MG/MCG random
            outputText = "You have been ordered to give " + this.dosePerKg + "mg of " + this.drug.name + ". ";
        }
        else {
            let kgOrLb = Scenario.getRandomKGorLB(this.ptWeight);
            //TODO: Dose in g/mg/mcg random
            outputText = "Your Patient weighs " + kgOrLb[0] + kgOrLb[1] + ", and you have been ordered to give: ";
            //TODO: dose per KG in G/MG/MCG random
            outputText += this.dosePerKg + "mg per kg of " + this.drug.name + ". ";
        }
        //TODO: Random change mg to g/mcg/mg
        outputText += this.drug.name + " comes packaged in " + this.ampuleDrugWeight + "mg in " + this.ampuleDrugVolume + "ml.";
        outputText += " How many mls of " + this.drug.name + " should you adminster to the patient?";
        return outputText;
    }

    genDPMScenarioText(number) {
        //0 = weight based; 1 = non weight based
        //TODO: more ways to word this, look at structural components and use text formatting.
        let outputText = "";
        if(number===1) {
            //TODO: dose per KG in g/MG/MCG random
            outputText = "You have been ordered to give " + this.dosePerKg + "mg per min of " + this.drug.name + ".";
        }
        else {
            outputText = "Your Patient weighs " + kgOrLb[0] + kgOrLb[1] + ", and you have been ordered to give: ";
            //TODO: dose per KG in G/MG/MCG random
            outputText += this.dosePerKg + "mg per kg per min of " + this.drug.name + ".";
        }
        //TODO: Normal Saline, d5W, etc...
        outputText += " You hang a " + this.bagVol + "ml bag of normal saline, and are using a " + this.dripSetType.name + "drip set. ";
        //TODO: vials/ampules/etc... (order change as well) - change mg to g/mcg/mg
        outputText += this.drug.name + " comes packaged in " + this.ampuleDrugWeight + "mg in " + this.ampuleDrugVolume + "ml.";
        //TODO: vial/ampules/etc...
        outputText += " You put " + this.ampules + " ampules of " + this.drug.name + " into the IV bag and start the drip.";
        outputText += " What drip rate do you need in order to deliver the medication successfully?";
        return outputText;
    }

    genDPMRateScenarioText() {
        //TODO: more ways to word this, look at structural components and use text formatting.
        //TODO: dose in G/MG/MCG random here
        //TODO: convert time in minutes to hours/minutes
        let outputText =  "You have been ordered to give " + this.dosePerKg + "mg of " + this.drug.name + "over " + this.time +" minutes.";
        //TODO: Normal Saline, d5W, etc...
        outputText += " You hang a " + this.bagVol + "ml bag of normal saline, and are using a " + this.dripSetType.name + "drip set.";
        outputText += " What drip rate do you need in order to deliver the medication successfully?";
        return outputText;
    }

    getCorrectAnswerText(){
        //TODO: based on type generate correct answer message.
        let outputText = "";
        switch (this.scenarioType) {
            case SCENARIO_TYPES.DPM_CALC_WB: {
                outputText = "Based on the patient's weight of "+this.ptWeight.kg+"kgs, you should administer "+this.desiredDose+"mg/min of "+this.drug.name+". ";
                outputText += "You end up putting "+this.medTotalWeight+"mg of "+this.drug.name+" into a "+this.bagVol+"ml IV Bag. ";
                outputText += "Using a "+this.dripSetType.name+" drip set, you would calculate "+this.gttMinDrug+" gtt/min.";
                break;
            }
            case SCENARIO_TYPES.DPM_CALC_NWB: {
                outputText = "You end up putting "+this.medTotalWeight+"mg of "+this.drug.name+" into a "+this.bagVol+"ml IV Bag. ";
                outputText += "Using a "+this.dripSetType.name+" drip set, you would calculate "+this.gttMinDrug+" gtt/min.";
                break;
            }
            case SCENARIO_TYPES.IV_BOLUS_WB:
                outputText = "Based on the patient's weight of "+this.ptWeight.kg+"kgs, you should administer "+this.desiredDose+"mg/min of "+this.drug.name+". ";
                outputText += "Because "+this.drug.name+" comes in a concentration of "+this.medConc+"mg/ml, you need to adminster "+this.mlRequired+"ml.";
                break;
            case SCENARIO_TYPES.IV_BOLUS_NWB: {
                outputText += "Because "+this.drug.name+" comes in a concentration of "+this.medConc+"mg/ml, you need to adminster "+this.mlRequired+"ml.";
                break;
            }
            case SCENARIO_TYPES.DPM_RATE: {
                outputText = "You would calculate "+this.gttMinBag+" gtt/min.";
                break;
            }
            default:
                console.log("Invalid Scenario Type");
        }
        return outputText;

    }
}


