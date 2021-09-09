const replaceAt = (string = '', index = 0, replacement = '') => {
    return string.substr(0, index) + replacement + string.substr(index + replacement.length);
};

const namePageToClassName = (string) => {
    const splitedTxt = string.replace(/([A-Z][a-z])/g, '-$1').replace(/(\d)/g, '-$1');
    return splitedTxt.replace('-', '').toLowerCase();
};

const namePageToEnum = (string) => {
    const splitedTxt = string.replace(/([A-Z][a-z])/g, '_$1').replace(/(\d)/g, '_$1');
    return splitedTxt.replace('-', '').toLowerCase();
};

const namePageToCamel = (string) => {
    return replaceAt(string, 0, string[0].toLowerCase());
};

const namePageToPascal = (string = '') => {
    return replaceAt(string, 0, string[0].toUpperCase());
};

module.exports = {
    namePageToClassName,
    namePageToEnum,
    namePageToCamel,
    namePageToPascal,
    replaceAt,
};
