datahero
========

Datahero coding challenge

Steps to run this node application:
1/ Run local MySql server
2/ Create database named "datahero" with username "root", password "root"
3/ Run npm install
4/ Run application: node app.js

Features:
1/ Server will response 500 with user friendly error message if two required files are not uploaded at the same time
2/ Random file will be rejected
3/ Upload the same 2 files will result in 500 error with user friendly message 
4/ After uploading 2 files to server, ui will render these features:
  - Average salary by gender (male/female)
  - Employee information paginated (20 employees per request)
  - Two buttons "Next" and "Previous" to page through the employee data
  - Employee name is turned into a clickable link, which renders the salary history on click.
  - Salary history section contains text format of all salaries belong to an employee and a bar chart as a graphical representation
5/ Refreshing the page and the ui will automatically pull existing data from database and render the result.

Enjoy the app.
