const chalk = require('chalk');

const title = chalk.bgBlack.green.underline.bold(`\n\t|| Welcome to Employee Manager ||\n`);
const chalker = (string) => {
    return chalk.bgBlack.red.bold(`\n\t|| ${string} ||\n`);
}

module.exports = { chalker, title };