const childProcess = require('child_process')
const util = require('util')

const exec = util.promisify(childProcess.exec)

const {readCsvFile, writeCsvFile} = require('./csv-files')
const {
  simpleFlip
} = require('./csv-helper')

async function doIt() {
  const {header, csvLines} = await readCsvFile('stats.csv')
  const flipped = simpleFlip(header, csvLines)
  await writeCsvFile('flipped.csv', flipped.header, flipped.csvLines)
}
doIt()
