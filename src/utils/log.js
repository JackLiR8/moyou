const chalk = require('chalk')

exports.error = (msg) => {
  console.log(chalk.red.bold(`ERROR: `), chalk.red(`${msg}`))
  
}

exports.info = (msg) => {
  console.log(chalk.yellow.bold(`INFO: `),chalk.yellow(`${msg}`))
}

exports.success = (msg) => {
  console.log(chalk.green.bold(`SUCCESS: `), chalk.green(`${msg}`))
}