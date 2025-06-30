const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const surveyRoutes = require('./routes/survey');
const apiRoutes = require('./routes/api');

app.use('/survey', surveyRoutes);
app.use('/api', apiRoutes);

app.listen(3000, '0.0.0.0', () => console.log(`Server running on http://0.0.0.0:3000`));
