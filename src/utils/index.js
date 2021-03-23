'use strict'

const utils = [
  'log',
]

for (const util of utils) {
  Object.assign(exports, require(`./${util}`))
}