const fs = require('fs');

const nameConfigFile = 'config.json';

const nameCompToClassName = (string) => {
    const splitedTxt = string.replace(/([A-Z][a-z])/g, '-$1').replace(/(\d)/g, '-$1');
    return splitedTxt.replace('-', '').toLowerCase();
};

const writePathHistory = (path) => {
    const log = {
        path,
    };
    fs.writeFileSync(`${__dirname}\\${nameConfigFile}`, JSON.stringify(log, null, 2), {
        encoding: 'utf8',
    });
};

const getPathHistory = () => {
    let config = fs.readFileSync(`${__dirname}\\${nameConfigFile}`, { encoding: 'utf8' });
    config = JSON.parse(config);
    return config?.path;
};

const pushHistory = (path = '') => {
    const pathList = getPathHistory();
    const idx = pathList.findIndex((item) => item === path);
    if (idx !== -1) {
        pathList.splice(idx, 1);
    }
    const newPath = [path, ...pathList];
    writePathHistory(newPath);
};

const categoryEnum = {
    New: 'new',
};

module.exports = {
    prompt: ({ inquirer }) => {
        const questions = [
            {
                type: 'input',
                name: 'componentName',
                message: 'What is the component name?',
            },
            {
                type: 'select',
                name: 'category',
                message: 'Which Directory is?',
                choices: [categoryEnum.New, ...getPathHistory()],
            },
            {
                type: 'input',
                name: 'dir',
                message: 'Where is the directory(fill if choice new)',
            },
        ];
        return inquirer
            .prompt(questions)
            .then((answers) => {
                const { componentName, dir, category } = answers;
                let path;
                let absPath;
                const className = nameCompToClassName(componentName);
                if (category !== categoryEnum.New) {
                    absPath = `src/${category}`;
                    pushHistory(category);
                } else {
                    path = `${dir ? `${dir}/` : ''}`;
                    absPath = `src/${path}`;
                    pushHistory(path);
                }

                return { className, componentName, path, absPath };
            });
    },
};
