const express = require('express');
const Database = require('better-sqlite3');
const router = express.Router();
const db = new Database('survey.db');

router.post('/responses', (req, res) => {
  const { question_id, response } = req.body;

  if (!question_id || response === undefined) {
    return res.status(400).json({ error: 'Missing question_id or response' });
  }

  const lookup = db.prepare(`
    SELECT rt.type FROM questions q
    JOIN response_types rt ON q.response_type_id = rt.id
    WHERE q.id = ?
  `).get(question_id);

  if (!lookup) return res.status(400).json({ error: 'Invalid question_id' });

  try {
    if (lookup.type === 'INTEGER') {
      db.prepare(`INSERT INTO responses (question_id, integer_response) VALUES (?, ?)`)
        .run(question_id, parseInt(response));
    } else if (lookup.type === 'TEXT') {
      db.prepare(`INSERT INTO responses (question_id, text_response) VALUES (?, ?)`)
        .run(question_id, response);
    } else {
      return res.status(400).json({ error: 'Unsupported response type' });
    }

    res.status(201).json({ success: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to insert response' });
  }
});

module.exports = router;
