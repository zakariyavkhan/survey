const Database = require('better-sqlite3');
const fs = require('fs');

// Load data
const surveys = JSON.parse(fs.readFileSync('./data/surveys.json', 'utf8'));

// Open DB
const db = new Database('./survey.db');

// Transaction to insert all surveys and their questions
const insertSurveys = db.transaction(() => {
  const insertSurvey = db.prepare(`
    INSERT INTO surveys (survey_name, survey_desc)
    VALUES (?, ?)
  `);
  const insertQuestion = db.prepare(`
    INSERT INTO questions (survey_id, question_text, response_type_id)
    VALUES (?, ?, ?)
  `);

  for (const survey of surveys) {
    const result = insertSurvey.run(survey.survey_name, survey.survey_desc);
    const surveyId = result.lastInsertRowid;

    for (const question of survey.questions) {
      insertQuestion.run(surveyId, question.question_text, question.response_type_id);
    }
  }
});

// Execute
insertSurveys();

console.log('Surveys and questions inserted successfully.');
