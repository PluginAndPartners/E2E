const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
  require('cypress-template-fixtures')(on, config);
  return config;
}
