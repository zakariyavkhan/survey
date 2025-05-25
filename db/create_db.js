// init-db.js

const Database = require('better-sqlite3');
const fs = require('fs');

const db = new Database('./survey.db');
const schema = fs.readFileSync('./db/create_db.sql', 'utf-8');

try {
  db.exec(schema);
  console.log('Database initialized successfully.');
} catch (err) {
  console.error('Failed to initialize database:', err.message);
}