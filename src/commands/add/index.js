const execa = require('execa')
const Listr = require('listr')
const fs = require('fs')
const ncp = require('ncp')
const { promisify } = require('util')
const { info, error, success } = require('../../utils')

const ADD_NAMES = ['axios', 'page', 'router']

const access = promisify(fs.access)
const copy = promisify(ncp)


async function add(name, options) {
  // validate name
  if (!ADD_NAMES.includes(name)) {
    error(`invalid argument! use \`moyu add <${ADD_NAMES.join(' | ')}>\`.`)
    process.exit(1)
  }

  // normalize opts
  options = normalizeOpts(name, options)

  // create task queue and run tasks
  let taskList = queueTasks(name, options)
  new Listr(taskList)
    .run()
    .catch(err => {
      error(err)
      process.exit(1)
    })
  
  success('DONE')
}

/**
 * Normalize options
 * @param {String} name 
 * @param {Object} opts 
 * @returns {Object} normalized opts
 */
function normalizeOpts(name, opts) {
  switch (name) {
    case 'axios':
      opts.dep = 'axios'
      break;
    case 'router':
      opts.dep = 'vue-router'
      break;
  }

  return { ...opts }
}

/**
 * create task list
 * @param {String} name 
 * @param {Object} opts 
 * @returns {Array} An array of tasks
 */
function queueTasks(name, opts) {
  let taskList = []
  // TODO queue tasks

  // add install dependency task
  if (opts.dep) {
    taskList.push({
      title: 'Installing dependency',
      task: () => installDep(opts.dep, opts.useNpm ? 'npm' : 'yarn')
    })
  }

  return taskList
}

/**
 * install dependency
 * @param {String} dep - dependency name
 * @param {String} pkgManager - package manager
 */
async function installDep(dep, pkgManager = 'yarn') {
  try {
    await execa(pkgManager, [pkgManager === 'yarn' ? 'add' : 'install', dep], )
  } catch (err) {
    error(err)
  }
}

/**
 * copy template files to target directory
 * @param {String} templateDir
 * @param {String} targetDir
 * @returns Promise 
 */
async function copyTemplateFiles(templateDir, targetDir = process.cwd()) {
  return copy(templateDir, targetDir, {
    clobber: false,
  })
}



module.exports = (...args) => {
  return add(...args).catch(err => {
    if (!process.env.MOYU_TEST) {
      process.exit(1)
    }
  })
}
