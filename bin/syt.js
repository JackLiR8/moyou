#!/usr/bin/env node

const chalk = require('chalk')
const program = require('commander')
const fs = require('fs')
const path = require('path')
const minimist = require('minimist')
const { info, error } = require('../src/utils/index')

program
  .version(`${require('../package.json').version}`)
  .usage('<command> [options]')

program
  .command('add <name>')
  .description('add a preset into current work directory')
  .option('-s, --skip-install', 'Skip install dependency')
  .option('-n, --use-npm', 'Use npm install dependency (use yarn if not specified)')
  .action((name, options) => {
    if (minimist(process.argv.slice(3))._.length > 1) {
      info('you provided more than one argument. Only the first will be took.')
    }

    require('../src/commands/add')(name, options)
  })


program.parse(process.argv)