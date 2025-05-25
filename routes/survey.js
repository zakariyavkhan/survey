const express = require('express');
const Database = require('better-sqlite3');
const router = express.Router();
const db = new Database('survey.db');
const path = require('path');

// GET /survey/:id
router.get('/:id', (req, res) => {
  // Read HTML file and inject question text
  const fs = require('fs');
  const htmlPath = path.join(__dirname, '../views/patient_satisfaction.html');
  let html = fs.readFileSync(htmlPath, 'utf8');

  res.send(html);
});

module.exports = router;
