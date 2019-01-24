const gnuplot = require('./gnuplot')

const {readCsvFile, writeCsvFile} = require('./csv-files')
const {batteryAge} = require('./battery-age')

doIt()
async function doIt() {
  const data = await readCsvFile('data.csv')

  await generateGraph(data, batteryAge, 'battery-age')
}

async function generateGraph(data, func, name) {
  console.log('create', name)
  const output = func(data.header, data.csvLines)
  await writeCsvFile(`tmp/${name}.csv`, output.header, output.csvLines)
  await gnuplot.run(`${name}.gnuplot`)
}
