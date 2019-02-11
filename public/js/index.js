//INITIALIZE ANGULAR
const app = angular.module("MedMathApp", []);
app.controller("MedMathCtrl", function ($scope) {
    $scope.currentScenario = new Scenario();
    $scope.kbLbOpts = KG_LB_KEYS;
    $scope.gmmOpts = G_MG_MCG_KEYS;
    $scope.answerOpts = ANSWER_OPTS_KEYS;

    //Function for submit and reset scenario
    $scope.resetCalculations = function () {
        clearScreen($scope);
    };
    $scope.checkAnswer = function () {
        checkAnswer($scope);
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
    $scope.goNext = function () {
        //TODO: Updated so when this is clicked then show new question, but keep score
        initMMP($scope);
    };

    //Initialize the display after Angular has finished loading
    initMMP($scope);
});

//TODO: Getting new scenario should print out correct answers before refreshing
//TODO: Hide and reorder desired dose and buttons when there are no weight base calculations necessary.
//TODO: Score
//TODO: embed JScript in HTML and distribute