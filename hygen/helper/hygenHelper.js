const stringHelper = require('./stringHelper');

const {
  namePageToCamel,
  namePageToClassName,
  namePageToEnum,
  namePageToPascal,
} = stringHelper;

const getInfo = (pageName) => {
  const camelName = namePageToCamel(pageName);
  const pascalName = namePageToPascal(pageName);
  const enumName = namePageToEnum(pageName);
  const className = namePageToClassName(`${pageName}Container`);
  return {
    camelName,
    pascalName,
    enumName,
    className,
  };
};

const apiAnswerQuetions = ({ apiName, instrument }) => {
  const {
    camelName,
    pascalName,
    enumName,
  } = getInfo(apiName);

  const absPath = 'src';

  let path = '';
  if (instrument.length === 0) {
    path = '../';
  } else {
    instrument = `${instrument}/`;
    path = '../../';
  }

  return {
    path,
    absPath,
    apiName,
    camelApiName: camelName,
    enumApiName: enumName,
    instrumentName: instrument,
    pascalApiName: pascalName,
  };
};

const pageAnswerQuetions = ({ pageName, instrument }) => {
  const {
    camelName,
    className,
    pascalName,
    enumName,
  } = getInfo(pageName);

  const absPath = `src/content/${instrument}`;

  let path = '';
  if (instrument.length === 0) {
    path = '../';
  } else {
    instrument = `${instrument}/`;
    path = '../../';
  }

  return {
    path,
    absPath,
    camelPageName: camelName,
    classPageNameContainer: className,
    enumPageName: enumName,
    instrumentName: instrument,
    pageName,
    pascalPageName: pascalName,
  };
};

const stateAnswerQuestions = ({ stateName, instrument }) => {
  const {
    camelName,
    className,
    pascalName,
    enumName,
  } = getInfo(stateName);
  const absPath = 'src';

  let path = '';
  if (instrument.length === 0) {
    path = '../';
  } else {
    instrument = `${instrument}/`;
    path = '../../';
  }

  return {
    path,
    absPath,
    camelStateName: camelName,
    classStateNameContainer: className,
    enumStateName: enumName,
    instrumentName: instrument,
    stateName,
    pascalStateName: pascalName,
  };
};

module.exports = {
  apiAnswerQuetions,
  pageAnswerQuetions,
  stateAnswerQuestions,
};
