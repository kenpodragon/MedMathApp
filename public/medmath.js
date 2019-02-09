//DECLARE ENUMS
const SCENARIO_TYPES = {
    DPM_CALC_WB: "DPM_CALC_WB",
    DPM_CALC_NWB: "DPM_CALC_NWB",
    IV_BOLUS_WB: "IV_BOLUS_WB",
    IV_BOLUS_NWB: "IV_BOLUS_NWB",
    DPM_RATE: "DPM_RATE"
};

const SCENARIO_TYPES_KEYS = Object.keys(SCENARIO_TYPES);

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

const G_MG_MCG_KEYS = Object.keys(G_MG_MCG);

function getRandomType() {
    return SCENARIO_TYPES_KEYS[Math.floor(Math.random() * SCENARIO_TYPES_KEYS.length)];
}

//HELPER CLASS
class Scenario {
    constructor() {
        this.scenarioType = getRandomType();
    }

    generateNewScenario() {
        this.scenarioType = getRandomType();
        switch (this.scenarioType) {
            case SCENARIO_TYPES.DPM_CALC_WB: {
                this.scenarioText = "I'm a WB DPM_CALC SCENARIO " + Math.floor((Math.random() * 100) + 1);
                this.calcFormHint = "PER MINUTE (Weight Based): PtWT * DD x DRIPSET / DOH [DOH = DRUG WT / BAG]";
                break;
            }
            case SCENARIO_TYPES.DPM_CALC_NWB: {
                this.scenarioText = "I'm a DPM_CALC SCENARIO " + Math.floor((Math.random() * 100) + 1);
                this.calcFormHint = "PER MINUTE: DD x DRIPSET / DOH [DOH = DRUG WT / BAG]";
                break;
            }
            case SCENARIO_TYPES.IV_BOLUS_WB:
                this.scenarioText = "I'm an WB IV_BOLUS SCENARIO " + Math.floor((Math.random() * 100) + 1);
                this.calcFormHint = "IV BOLUS/PUSH (Weight Based): PtWT * DD / DOH [DOH = DRUG WT / DRUG VOL]";
                break;
            case SCENARIO_TYPES.IV_BOLUS_NWB: {
                this.scenarioText = "I'm an IV_BOLUS SCENARIO " + Math.floor((Math.random() * 100) + 1);
                this.calcFormHint = "IV BOLUS/PUSH: DD / DOH [DOH = DRUG WT / VOL]";
                break;
            }
            case SCENARIO_TYPES.DPM_RATE: {
                this.scenarioText = "I'm a DPM_RATE SCENARIO " + Math.floor((Math.random() * 100) + 1);
                this.calcFormHint = "OVER TIME: BAG * DRIPSET / TIME";
                break;
            }
            default:
                console.log("Invalid Scenario Type");
        }
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
        scope.showWeightCalcArea = false;
        scope.doseOnHandArea = false;
        scope.dripSetArea= false;
        scope.ivBolusArea = false;
        scope.fluidRateArea = false;

    }

}

function changeKgLbButtonText(scope) {
    switch (scope.kgOrLb) {
        case "KG":
            scope.kgLbButtonText = "Convert KG to LB";
            scope.showKgLbConvertButton = false;
            break;
        case "LB":
            scope.kgLbButtonText = "Convert LB to KG";
            scope.showKgLbConvertButton = true;
            break;
        default:
            console.log("Invalid Kg or Lb selection");
    }
}

function convertKgLbFunc(scope) {
    if (null == scope.weightEntryText || scope.weightEntryText === 0) {
        scope.weightCalculationText = "Invalid Entry, please enter a number greater than 0.";
        scope.weightEntryText = 0;
        return;
    }
    let kg = 0;
    let lb = 0;
    switch (scope.kgOrLb) {
        case "KG":
            kg = scope.weightEntryText;
            lb = kg * 2.2;
            scope.weightCalculationText = "Conversion Math (Kg to Lb): " + kg + "kg *2.2 = " + lb + "Lbs";
            scope.weightEntryText = lb;
            scope.kgOrLb = scope.kbLbOpts[1];
            changeKgLbButtonText(scope);
            break;
        case "LB":
            lb = scope.weightEntryText;
            kg = lb / 2.2;
            //Ensures we only show up to 3 decimal places to prevent it from going off the screen.
            kg = kg.toFixed(3);
            kg = Number.parseFloat(kg);
            scope.weightCalculationText = "Conversion Math (Lb to Kg): " + lb + "Lbs / 2.2 = " + kg + "kg";
            scope.weightEntryText = kg;
            scope.kgOrLb = scope.kbLbOpts[0];
            changeKgLbButtonText(scope);
            break;
        default:
            scope.weightCalculationText = "Invalid Entry, please enter a number";
            scope.weightEntryText = 0;
    }
}

function convertGmmFunc(scope, selGmmOpt) {
    if (null == scope.dosePerKgEntryText || scope.dosePerKgEntryText === 0) {
        scope.doseWeightCalculationText = "Invalid Entry, please enter a number greater than 0.";
        scope.dosePerKgEntryText = 0;
        return;
    }
    let initVal = scope.dosePerKgEntryText;
    let initUnit = "";
    let convUnit = "";
    let convOps = "/";
    let convRatio = 1;
    let convRatioNorm = 1;
    let gmmIdx = 0;
    switch (scope.dpkgGMM) {
        case "G": {
            initUnit = "g";
            if (selGmmOpt === 0) {
                convUnit = "mg";
                convRatio = 1000;
                convRatioNorm = 1000;
                convOps = "*";
                gmmIdx = 1;
            } else {
                convUnit = "mcg";
                convRatio = 1000000;
                convRatioNorm = 1000000;
                convOps = "*";
                gmmIdx = 2;
            }
            break;
        }
        case "MG": {
            initUnit = "mg";
            if (selGmmOpt === 0) {
                convUnit = "g";
                convRatio = 1000;
                convRatioNorm = .001;
                convOps = "/";
                gmmIdx = 0;
            } else {
                convUnit = "mcg";
                convRatio = 1000;
                convRatioNorm = 1000;
                convOps = "*";
                gmmIdx = 2;
            }
            break;
        }
        case "MCG": {
            initUnit = "mcg";
            if (selGmmOpt === 0) {
                convUnit = "g";
                convRatioNorm = .000001;
                convRatio = 1000000;
                convOps = "/";
                gmmIdx = 0;
            } else {
                convUnit = "mg";
                convRatioNorm = .001;
                convRatio = 1000;
                convOps = "/";
                gmmIdx = 1;
            }
            break;
        }
        default: {
            scope.doseWeightCalculationText = "Invalid Entry, please enter a number";
            scope.dosePerKgEntryText = 0;
            return;
        }

    }
    let convVal = initVal * convRatioNorm;
    let tmpVal = convVal;
    tmpVal = tmpVal.toFixed(3);
    tmpVal = Number.parseFloat(tmpVal);
    if(tmpVal !== 0){
        convVal = tmpVal;
    }
    scope.dpkgGMM = scope.gmmOpts[gmmIdx];
    scope.doseWeightCalculationText = "Conversion Math (" + initUnit + " to " + convUnit + "): " + initVal + initUnit + convOps + convRatio + "=" + convVal + convUnit;
    scope.dosePerKgEntryText = convVal;
    changeGMMButtonText(scope);
}

function convertddGmmFunc(scope, selGmmOpt) {
     if (null == scope.desDoseEntryText || scope.desDoseEntryText === 0) {
        scope.desiredDoseWTCalculationText = "Invalid Entry, please enter a number greater than 0.";
        scope.dosePerKgEntryText = 0;
        return;
    }
    let initVal = scope.desDoseEntryText;
    let initUnit = "";
    let convUnit = "";
    let convOps = "/";
    let convRatio = 1;
    let convRatioNorm = 1;
    let gmmIdx = 0;
    switch (scope.ddkgGMM) {
        case "G": {
            initUnit = "g";
            if (selGmmOpt === 0) {
                convUnit = "mg";
                convRatio = 1000;
                convRatioNorm = 1000;
                convOps = "*";
                gmmIdx = 1;
            } else {
                convUnit = "mcg";
                convRatio = 1000000;
                convRatioNorm = 1000000;
                convOps = "*";
                gmmIdx = 2;
            }
            break;
        }
        case "MG": {
            initUnit = "mg";
            if (selGmmOpt === 0) {
                convUnit = "g";
                convRatio = 1000;
                convRatioNorm = .001;
                convOps = "/";
                gmmIdx = 0;
            } else {
                convUnit = "mcg";
                convRatio = 1000;
                convRatioNorm = 1000;
                convOps = "*";
                gmmIdx = 2;
            }
            break;
        }
        case "MCG": {
            initUnit = "mcg";
            if (selGmmOpt === 0) {
                convUnit = "g";
                convRatioNorm = .000001;
                convRatio = 1000000;
                convOps = "/";
                gmmIdx = 0;
            } else {
                convUnit = "mg";
                convRatioNorm = .001;
                convRatio = 1000;
                convOps = "/";
                gmmIdx = 1;
            }
            break;
        }
        default: {
            scope.desiredDoseWTCalculationText = "Invalid Entry, please enter a number";
            scope.desDoseEntryText = 0;
            return;
        }

    }
    let convVal = initVal * convRatioNorm;
    let tmpVal = convVal;
    tmpVal = tmpVal.toFixed(3);
    tmpVal = Number.parseFloat(tmpVal);
    if(tmpVal !== 0){
        convVal = tmpVal;
    }
    scope.ddkgGMM = scope.gmmOpts[gmmIdx];
    scope.desiredDoseWTCalculationText = "Conversion Math (" + initUnit + " to " + convUnit + "): " + initVal + initUnit + convOps + convRatio + "=" + convVal + convUnit;
    scope.desDoseEntryText = convVal;
    changeDDGMMButtonText(scope);
}

function calcWtBsdDD(scope){
    if(scope.kgOrLb==="LB"){
        convertKgLbFunc(scope);
    }
    let ptWT = scope.weightEntryText;
    let ddperKg = scope.dosePerKgEntryText;
    if(ptWT===0 || ddperKg===0){
        scope.desiredDoseCalculationText = "Invalid Entry, please enter Patient Weight and /or a dose per KG a number greater than 0.";
        scope.desDoseEntryText = 0;
        return;
    }
    let gmmIdx = 0;
    switch (scope.dpkgGMM) {
        case "G":
            gmmIdx = 0;
            break;
        case "MG":
            gmmIdx = 1;
            break;
        case "MCG":
            gmmIdx = 2;
            break;
        default:
            return;
    }

    let calcValue =  ptWT * ddperKg;
    scope.desiredDoseCalculationText = "Desired Dose Weight Base Math = " + ptWT +"kg * " + ddperKg + scope.dpkgGMM + " per Kg = " + calcValue;
    scope.desDoseEntryText = calcValue;
    scope.ddkgGMM = scope.gmmOpts[gmmIdx];
    changeDDGMMButtonText(scope);


}

function changeGMMButtonText(scope) {
    switch (scope.dpkgGMM) {
        case "G":
            scope.gmmDD1ButtonText = "Convert G to MG";
            scope.gmmDD2ButtonText = "Convert G to MCG";
            break;
        case "MG":
            scope.gmmDD1ButtonText = "Convert MG to G";
            scope.gmmDD2ButtonText = "Convert MG to MCG";
            break;
        case "MCG":
            scope.gmmDD1ButtonText = "Convert MCG to G";
            scope.gmmDD2ButtonText = "Convert MCG to MG";
            break;
        default:
            console.log("Invalid Kg or Lb selection");
    }
}

function changeDDGMMButtonText(scope) {
    switch (scope.ddkgGMM) {
        case "G":
            scope.ddgmmDD1ButtonText = "Convert G to MG";
            scope.ddgmmDD2ButtonText = "Convert G to MCG";
            break;
        case "MG":
            scope.ddgmmDD1ButtonText = "Convert MG to G";
            scope.ddgmmDD2ButtonText = "Convert MG to MCG";
            break;
        case "MCG":
            scope.ddgmmDD1ButtonText = "Convert MCG to G";
            scope.ddgmmDD2ButtonText = "Convert MCG to MG";
            break;
        default:
            console.log("Invalid Kg or Lb selection");
    }
}

function clearScreen(scope) {
    //TODO: change these when needing changes
    //TODO: Reset everything to default here
    scope.weightCalculationText = "";
    scope.doseWeightCalculationText = "";
    scope.desiredDoseWTCalculationText = "";
    scope.desiredDoseCalculationText = "";
    scope.weightEntryText = 0;
    scope.dosePerKgEntryText = 0;
    scope.desDoseEntryText = 0;
    scope.kgOrLb = scope.kbLbOpts[0];
    scope.dpkgGMM = scope.gmmOpts[0];
    scope.ddkgGMM = scope.gmmOpts[0];
    changeKgLbButtonText(scope);
    changeGMMButtonText(scope);
    changeDDGMMButtonText(scope);
}

function initMMP(scope) {
    //Display the initial scenario
    scope.currentScenario.generateNewScenarioAndUpdatePage(scope);

    //Hide the Loading DIV
    scope.loadingDiv = false;

    clearScreen(scope);
}

//INITIALIZE ANGULAR
const app = angular.module("MedMathApp", []);
app.controller("MedMathCtrl", function ($scope) {
    $scope.currentScenario = new Scenario();
    $scope.kbLbOpts = KG_LB_KEYS;
    $scope.gmmOpts = G_MG_MCG_KEYS;

    //Function for submit and reset scenario
    $scope.resetCalculations = function () {
        clearScreen($scope);
    };
    $scope.refreshScenario = function () {
        initMMP($scope);
    };
    $scope.convertKgLb = function () {
        convertKgLbFunc($scope);
    };
    $scope.updateKgLbDD = function () {
        changeKgLbButtonText($scope);
    };
    $scope.updategmmDD = function () {
        changeGMMButtonText($scope);
    };
    $scope.convertGmmDD = function (selGmmConvOpt) {
        convertGmmFunc($scope, selGmmConvOpt);
    };
    $scope.updateDDgmmDD = function () {
        changeDDGMMButtonText($scope);
    };
    $scope.convertddGmmDD = function (selGmmConvOpt) {
        convertddGmmFunc($scope, selGmmConvOpt);
    };
    $scope.calcWtBsdDD = function () {
        calcWtBsdDD($scope);
    };

    //Initialize the display after Angular has finished loading
    initMMP($scope);
});

//TODO: Getting new scenario should print out correct answers before refreshing
//TODO: Hide and reorder desired dose and buttons when there are no weight base calculations necessary.
//TODO: Score
//TODO: embed JScript in HTML and distribute

