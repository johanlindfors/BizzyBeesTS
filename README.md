Typescript and Phaser.io implementation of the Bizzy Bees game created by Tess Ferandez.


To try locally on Windows 10 use the following instructions:

Clone repository with:

git clone git@github.com:programmeramera/BizzyBeesTS.git

Install typescript with a powershell command window:

npm install -g typescript

Install node to act as a server locally:

npm install node-static

Change directory into the src directory. Then transpile the typescript files into the js directory served by node:

tsc --out ..\bin\js\game.js

Change directory back to the root directory of the repo and launch the server:

node .\server\server.js

Now open your favorite browser and point it to http://localhost:5858

The repository also contains configuration and tasks for Visual Studio Code.
