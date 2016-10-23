# tp-crud
CRUD application for tp data

to run it:
mongod &;
npm install;
npm start;

to import data:
save the XLS as a CSV
add a row with the header names (what they will become in the database)
deleted the two existing header rows
to import use the command:
mongoimport -d datacollectiondb -c membranes --type csv --file some_data.csv --headerline
