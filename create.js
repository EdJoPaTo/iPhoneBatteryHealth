const childProcess = require('child_process')
const util = require('util')

const exec = util.promisify(childProcess.exec)

const {readCsvFile, writeCsvFile} = require('./csv-files')
const {deviceHistory} = require('./device-history')

async function doIt() {
  const data = await readCsvFile('data.csv')
  const deviceHistoryCsv = await deviceHistory(data.header, data.csvLines)
  await writeCsvFile('tmp/device-history.csv', deviceHistoryCsv.header, deviceHistoryCsv.csvLines)
  await runGnuplot('device-history.gnuplot')
}
doIt()

async function runGnuplot(script) {
  await exec(`gnuplot ${script}`)
}
