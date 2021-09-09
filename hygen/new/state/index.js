const instrumentsEnum = require('../../enums/instrumentsEnum');
const hygenHelper = require('../../helper/hygenHelper');

module.exports = {
  prompt: ({ inquirer }) => {
    const questions = [
      {
        type: 'input',
        name: 'stateName',
        message: 'What is the state name?',
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
      .then(hygenHelper.stateAnswerQuestions);
  },
};
