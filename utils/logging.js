const chalk = require('chalk');

const log_error = (tag, err) => {
    console.log(chalk.red(`[${tag}] ${err}.`))
}

const log_info = (tag, info) => {
    console.log(chalk.blue(`[${tag}] ${info}.`))
}

const log_success = (tag, info) => {
    console.log(chalk.green(`[${tag}] ${info}.`))
}

const log_warning = (tag, info) => {
    console.log(chalk.yellow(`[${tag}] ${info}.`))
}

module.exports = {log_error, log_info}