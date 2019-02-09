# MedMathApp
Simple HTML5/AngularJS (browser only) to allow Paramedics to Practice their Medic Math.

Expansion to include score tracking (FB integration and high score boards), education, and scenario based practice (med math, treatment selection, and NREMT like scenario steps)

Repository Information:
Created by: Stephen A Salaka (kenpodragon) (https://www.linkedin.com/in/ssalaka/)
Primary github repo: https://github.com/kenpodragon/MedMathApp

ABOUT:
This tool is designed to help Paramedic students in the US to help practice Medic Math Problems in the 3 followng areas:
- OVER TIME (BAG * DRIP SET / TIME)
- PER MINUTE (DESIRED DOSE x DRIP SET / DOSE ON HAND [pluse Weight based alternate] -> DOSE ON HAND = DRUG WEIGHT / BAG)
- IV BOLUS/PUSH (DESIRED DOSE / DOSE ON HAND [plus weight base alternative] - DOSE ON HAND = DRUG WEIGHT / VOLUME)

FEATURE SET:
* Entries break down calcuations based on data from the scenario.
* Displays main calculation formula per scenario.
* Displays correct answers.
* Displays complete correct calculation breakdown.
* Shows errors in calculations.

Release notes:
02/09/2019 - initial framework. ALPHA

//TODO: List VERSON ALPHA 1:
1) Create basic framework
2) Create basic functionality
3) Initial testing (calculations/basic functionality)
4) Installation instructions

FRAMEWORK/FUNCTIONALITY NEEDED (ALPHA 1):
1) Finish entry areasfor data based on calculations
- OVER TIME
- IV BOLUS/PUSS
- FINAL ANSWER AREA (area for number, and pull down for units)
- CLEAR button functionality
- Submit/Get new scenario
- Show correct answer and errors
2) Create framework for random generation of scenarios
 - choose random med math problem type out of the 5 available
 - generate random scenario text and calculate correct answers
 - display scenario
 - on "check answer" - show correct calculation breakdown in new area
 - highlight errors in red
 3) Other things
 - Standard KG/LB mapping (5kg - 200kg and translate to LB)
 - peds vs adult (for ages) (Create standard list)
 - peds/adult mapping to reasonable weights
 - error display messages
 3) Add heroku deployment
 4) Text stuff (instructions, formulas, etc...)
 5) UI and usability bits
 6) Error messages and displays

ROADMAP
ALPHA 2:
1) Scoring
- need to come up with rules
- correct answer vs intermediate steps
2) Timer (choose standard)
3) Score tracking and display
4) UI Enhancements
5) Code Cleanup
- standardize JScript files and locations
- standard interfaces, redundant functionality condensation
6) Scenario drug listing to map correctly to actual symptoms/dosages
7) Settings (question types, KG to LB conversions, show/hide main formula, space for answer only, hide conversion buttons {remove some auto-calc functions}, display formulas on hover or hide completely)
8) KG to LB conversion only quiz
9) G->MG->MCG conversion only quiz
10) Using conversion button subtracts points (ask before showing)
11) Unit tests

ALPHA 3:
1) Convert AngularJS to ServerSide code
- set up container for deployment
- heroku updates
- standardize folder structure/file names/locations
- convert local JS to server side code
2) High score tracking (daily/weekly/monthly). (Single session score and cumulative over time)
- statistics (question type score history, individual calculation score history)
3) Facebook integration (score listing) for permanent records tracking, high score displays, sharing, etc...

ALPHA 4:
1) Learning Module
- walkthrough of calculations (step by step)
- Formula matching (selection only plus - display entry areas based on formulas)
- Instructional details about math
2) History view
- session list
- review answers and correct answers
- scoring analysis (breakdown based on question type, etc..., performance over time)
- keep score history over past XX days or YY sessions (setting in DB)
- clear data over time (retain user FB ID association or re-auth after auto deletion)

ALPHA 5:
1) Medicine selection
- select medication based on scenario
- correct vs incorrect (multiple avaiable correct answers)
- select correct dosages (ranges in system)
- plug in selected meds/dosages to use in calculations
2) Medication selection multiple choice quiz
3) Medication dosage multiple choice quiz
4) Medication explaination
- Correct answer
- incorrect answer
5) Peds vs Adult dosages
- Reference links to AHA guidelines
6) RSI practice
7) Scenario type selection
- cardiac, respiratory, medical, etc...

ALPHA 6:
1) NREMT Scenario steps quiz
- What comes first
- What comes next
- Step ordering
- Multiple choice
- Drop Down menu
2) Quizing selection and integration
3) Updates to scenarios (more details, random generation, etc...)

FUTURE IDEAS: 
1) Vitals
2) ECG tracing generation
- Random for scenario
- Ryhytm interpertation
- 12 Lead
3) ACLS/PALS algorithms
4) ECG to Med quiz



 

