var AssistantV2 = require('watson-developer-cloud/assistant/v2');

var assistant = new AssistantV2({
  username: '<username>',
  password: '<password>',
  url: 'https://gateway.watsonplatform.net/assistant/api/',
  version: '2018-09-19'
});

module.exports = assistant;