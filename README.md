# Decision support system for selecting software architecture pattern + tactics (IoT projects currently).

Thesis project. 

## Technologies

- mysql Ver 8.0.18 for osx10.15 on x86_64
- node v8.16.0 + npm
- knex for the DB
- Vue.js for the frontend (+ Buefy). 

## Installation

1. Install mysql latest version (```brew install ...```).
2. Install node js and npm (versions above).
3. Run mysql and update knexfile.js (parent folder) to connect to your DB. 
4. ```npm install knex -g``` - will install knex globally.
5. In the project folder run ```knex migrate latest``` - will create DB schema and seed data.
6. Run: 
```
npm install
npm run start
```
## Run

Server starts on port 7555. To access open browser: https://localhost:7555/
