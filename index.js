const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 4000;
const MONGO_BASE_URL = process.env.MONGO_BASE_URL;
const MONGO_DATABASE = process.env.MONGO_DATABASE;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_URL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_BASE_URL}/${MONGO_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URL).then(async () => {
  app.listen(PORT, () => {
    console.log('Ameliorate backend app listening on', PORT);
  });
});
