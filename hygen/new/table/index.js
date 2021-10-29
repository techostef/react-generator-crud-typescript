const hygenHelper = require('../../helper/hygenHelper');
const instrumentsEnum = require('../../enums/instrumentsEnum');

module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'pageName',
        message: 'What is the table name?',
      },
      {
        type: 'select',
        name: 'instrument',
        message: 'Which Instrument is?',
        choices: Object.values(instrumentsEnum),
      },
    ];
    return inquirer
      .prompt(questions)
      .then(hygenHelper.pageAnswerQuetions);
  },
};
