const defCurrency = 'USD';

const promptList = [{
  message: 'Please fill a date with format YYYY-MM-DD(EX: 2022-05-05): ',
  name: 'date',
  type: 'string',
  default: '2017-04-27',
}, {
  message: 'Please fill a token. Ex: BTC, ETH: ',
  name: 'token',
  type: 'string',
  default: 'BTC',
}];

const roundOneQuestionList = [
  {
    key: 'q1',
    value: 'Given no parameters, return the latest portfolio value per token in USD' 
  },
  {
    key: 'q2',
    value: 'Given a token, return the latest portfolio value for that token in USD' 
  },
  {
    key: 'q3',
    value: 'Given a date, return the portfolio value per token in USD on that date' 
  },
  {
    key: 'q4',
    value: 'Given a date and a token, return the portfolio value of that token in USD on that date' 
  }
];

const defPromptData = {
  type: 'list',
  name: 'value',
  message: 'Choose a question?',
  default: 'Given no parameters, return the latest portfolio value per token in USD',
  choices: roundOneQuestionList,
};


const defMiPromptData = {
  type: 'list',
  name: 'key',
  message: 'Please chose a way to run!',
  default: 'Running the question list from DB.',
  choices: [
    {
      key: 'y',
      value: 'Running the question list from DB.'
    },
    {
      key: 'n',
      value: 'Running the question list from CSV.' 
    },
  ],
}

export {
  defCurrency,
  promptList,
  defPromptData,
  roundOneQuestionList,
  defMiPromptData
};
