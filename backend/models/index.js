

'use strict';

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// MongoDB Connection
let mongoURI;
if (config.use_env_variable) {
  mongoURI = process.env[config.use_env_variable];
} else {
  mongoURI = "mongodb://localhost:27017/cityride";
}

mongoose.connect(mongoURI, {
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Load all models dynamically
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));
    db[model.modelName] = model;
  });

module.exports = db;
