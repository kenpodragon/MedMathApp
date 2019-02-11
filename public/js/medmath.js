function getRandomType() {
    return SCENARIO_TYPES_KEYS[Math.floor(Math.random() * SCENARIO_TYPES_KEYS.length)];
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
    scope.correctAnswerText = "";
    scope.doseWeightCalculationText = "";
    scope.desiredDoseWTCalculationText = "";
    scope.desiredDoseCalculationText = "";
    scope.weightEntryText = 0;
    scope.dosePerKgEntryText = 0;
    scope.desDoseEntryText = 0;
    scope.finalAnswerEntryText = 0;
    scope.kgOrLb = scope.kbLbOpts[0];
    scope.dpkgGMM = scope.gmmOpts[0];
    scope.ddkgGMM = scope.gmmOpts[0];
    scope.answerUnits = scope.answerOpts[0];
    changeKgLbButtonText(scope);
    changeGMMButtonText(scope);
    changeDDGMMButtonText(scope);
}

function checkAnswer(scope){
    //TODO: show correct answers for the scenario in question as well as all calculations
    //TODO: error messages when incorrect
    scope.correctAnswerText = scope.currentScenario.getCorrectAnswerText();


    scope.inProgressButtonsShow = false;
    scope.nextQuestionButtonsShow = true;
}

function initMMP(scope) {
    //Display the initial scenario
    scope.currentScenario.generateNewScenarioAndUpdatePage(scope);
    scope.inProgressButtonsShow = true;
    scope.nextQuestionButtonsShow = false;

    //Hide the Loading DIV
    scope.loadingDiv = false;

    clearScreen(scope);
}



