BEGIN TRANSACTION;

CREATE TABLE surveys (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    survey_name TEXT NOT NULL,
    survey_desc TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- UTC
);

CREATE TABLE questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    survey_id INTEGER,
    question_text TEXT NOT NULL,
    response_type_id INTEGER,
    FOREIGN KEY (survey_id) REFERENCES surveys(id)
    FOREIGN KEY (response_type_id) REFERENCES response_types(id)
);

CREATE TABLE responses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question_id INTEGER,
    integer_response INTEGER,
    text_response TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- UTC
    FOREIGN KEY (question_id) REFERENCES questions(id)
    CHECK ((integer_response IS NOT NULL AND text_response IS NULL) OR
           (integer_response IS NULL AND text_response IS NOT NULL))
);

CREATE TABLE response_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL
);

INSERT INTO response_types 
    (type) 
VALUES 
    ('INTEGER'), 
    ('TEXT');

COMMIT;