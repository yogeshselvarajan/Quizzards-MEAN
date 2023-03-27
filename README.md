# Quizzards

This is a replica of the famous online quiz web application "Kahoot!". This application however has only one of the functionalitites of kahoot, that is create a quiz and host it as a challenge by setting start date and time, end date and time and share it with students. This application makes use of chart.js library for generating and displaying charts and dialogFlow for chatbot. This is developed using MEAN stack.<br/>
There are two roles, namely student and teacher. The teacher can create a quiz and host it as a challenge by setting title, description, start date time, end date time. The students can log in to their account and play the quiz by entering the game PIN shared by the teacher. The student can see his score once the deadline has passed. The teacher can get a consolidated view of all student's performances with the help of charts.

## Installing the modules for the project:
1) cd Quizzards-Mean/
2) npm install
3) cd client/
4) npm install

## Running the Project
- If you dont, have Git SCM installed on your system, you can download it: https://git-scm.com/downloads
- Clone the repository by cicking the Code on the repository above, and copy the HTTP URL, then go to the comand prompt and use git clone <url copied>.
- Before starting the application, first create a database in mongo named "quizzards"
<br/>
- I have used DocumentDB from Azure as the MongoDB URI. You can download MongoDB locally and setup its URI here at config/database.js and replacing the "var dbURI =" variable with the URI of locally hosted MongoDB.</br>
- I have brought the domain "https://quizzards.site/" and is valid upto  2024-03-27 . So i have deployed the git repository on vercel and have routed to the custom domain brought.
- Here the front-end client source code hav been deployed sucessully and is live. The back-end is not deployed and needs to be started manually. 
- Hence, clone the repository and then start the server on your localhost by the steps gicen in the next section.

To start the Server :
<br/>

1. <b>node index.js</b>
   <br/>

To run the application on the browser: <br/>

1. Open a new terminal and run <b>cd client/</b><br/>
2. <b>ng serve</b> <br/>
3. Navigate to `http://localhost:4200/`.

## Features

1. Used JWT for login
2. The user can play a quiz only once
3. On submitting a quiz, the user is redirected to the feedback page. Here the student cannot redirect back to the Quiz.
4. Teachers can get an overview of student's performances with the help of charts.

## Tools Used:
1) Angular CLI - v8.3.0
2) NodeJS - v14.21.3
3) WebStorm IDE - 2022.3.4

## NodeJS Installation:
Here are the steps to install Node.js version 14.21.3 from the previous releases: </br>
1) Go to the official Node.js website: https://nodejs.org/en/
2) Click on the "Previous Releases" link located at the bottom of the page (https://nodejs.org/en/download/releases)
3) Scroll down and select the 14.21.3 version from the list of releases.
4) Choose the appropriate installer for your operating system. For Windows, you can select the "Windows Installer (.msi)" option.
5) Once the installer is downloaded, run it and follow the prompts to install Node.js on your system.
6) After the installation is complete, open a command prompt or terminal and verify the Node.js version by running the following command: <b>'node -v'</b> </br>
This will display the version of Node.js installed on your system.
That's it! You have successfully installed Node.js version 14.24 from the previous releases.

## Angular Installation:
To install Angular CLI version 8.3.0 on Windows using Command Prompt, follow these steps: </br>
1) Make sure you have Node.js installed on your system. You can follow the instructions in the above section to install the correct Node JS version for the project.
2) Open Command Prompt by pressing the Windows + R keys, typing "cmd", and pressing Enter.
3) To install the Angular CLI globally on your system, enter the following command: '<b>npm install -g @angular/cli@8.3.0</b>'
  This command will install the Angular CLI version 8.3.0 on your system. 
4) Verify that the Angular CLI is installed correctly by running the following command: '<b>ng version</b>'.
  This command will display the version of the Angular CLI installed on your system.
