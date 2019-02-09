# MedMathApp
Instructions to install and deploy application, configure IDE, and push to remote server, as well as coding practices and policies for project.

## INSTALL AND DEPLOY INSTRUCTIONS ##
PRE-REQUISITES:
1) Git-hub account (https://www.github.com/)
2) Git client installed (e.g. https://git-scm.com/)
3) Working understanding of GIT/github (specifically downloading, cloning, code)
4) OPTIONAL - get source code and install external to GIT
5) OPTIONAL - Local HTTP serving Server Installed
6) OPTIONAL - WebStorm installed and configured (IDE of choice for this project)
### ALPHA - 1 ###
#### CHECKOUT AND DEPLOY ####
1) Git clone repo: git clone https://github.com/kenpodragon/MedMathApp.git
2) Place files in root directory of web server
3) Launch server/browse to location: http://localhost/MedMath.html
#### OPTIONAL  ####
1) Configure root of server to point to MedMath.html as root document (e.g. home => MedMath.html)
2) Launch server/browse to location: http://localhost/MedMath
#### CODING INSTRUCTIONS/POLICIES  ####
TBD - Instruction to import into IDE (WebStorm)
TBD - Don't commit IDE files (.idea, .eclipse, etc...) -> Updates to .gitignore
TBD - Config file changes (how to)
TBD - DB Update instructions (once server side stuff done)
TBD - NO TRANSIENT LOG FILES OR SERVER RUNING THINGS (e.g. big binaries)
TBD - Updates to INSTALL_INSTRUCTIONS
TBD - Updates to README.md (version notes)
TBD - Git commit version notes and use of GIT HUB for issue tracking
#### TBD: HEROKU INSTALLATION/DEPLOYMENT  ####
PRE-REQUISITES: 
1) Active Heroku account and Heroku CLI installed. (https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
2) node.js installed (greater than version 8)
3) npm installed (grater than version 6)
4) git installed (any verson)
5) Create heroku deployment app - heroku apps:create "APPNAME" (verify remotes have been added: git remote - v)
6) Deploy to heroku (git push heroku master)
SETUP LOCAL WEBSTORM SERVER:
TBD - PRE-REQ: heroku setup, container setup, local heroku push setup (links to do this go here)
TBD - npm local setup for local debugging via webstorm
TBD - DEPLOY TO HEROKU (steps, instructions, etc...)
DEPLOY AND TEST HEROKU:
START SERVER
STOP SERVER
REVIEW LOGS



