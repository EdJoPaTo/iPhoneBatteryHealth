const childProcess = require('child_process')
const util = require('util')

const exec = util.promisify(childProcess.exec)

const {readCsvFile, writeCsvFile} = require('./csv-files')
const {deviceHistory} = require('./device-history')

async function doIt() {
  const data = await readCsvFile('data.csv')

  await generateGraph(data, deviceHistory, 'device-history')
}
doIt()

async function generateGraph(data, func, name) {
  const output = func(data.header, data.csvLines)
  await writeCsvFile(`tmp/${name}.csv`, output.header, output.csvLines)
  await runGnuplot(`${name}.gnuplot`)
}

async function runGnuplot(script) {
  await exec(`gnuplot ${script}`)
}
