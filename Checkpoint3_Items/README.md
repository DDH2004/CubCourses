# Checkpoint 3

## Getting Started
Simply type `npm install` in the terminal to install all the required packages and `npm run dev` to launch the app.

## About
This app is created as part of the third portion of the semester long project for the course CSE111 - Databases at UC Merced.

## Understanding the Code at a Glance
Most of the code is fairly self-explanatory if you are familiar with React. Basically, all the functions that start with 'fetch'
obtain some data from the database and store it in a state variable. That data is usually just rendered in a table. This is why
practically all the components are called some variation of a table. 

Additionally, every time a function encloses code in a try
catch block, it is attempting to interact with the database. This includes functions not called 'fetch'. Functions that attempt
to modify the db by creating students or whatnot.

The HTTP requests in the try catch blocks always state the name of the SQL statement to be executed. This name directly 
corresponds with a case in the route.ts file. So, if you want to find out what SQL is being executed for each of these
functions, all you have to do is go to route.ts and CTRL + F.