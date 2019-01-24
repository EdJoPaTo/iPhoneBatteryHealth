const gnuplot = require('./gnuplot')
const {writeCsvFile} = require('./csv-files')

async function generateBatteryCsvFile(battery, filename) {
  const header = [
    'Date',
    `(${battery.person}) ${battery.device} ${battery.age.slice(0, 7)}`
  ]

  const lines = Object.keys(battery.health)
    .map(key => {
      const timestamp = Date.parse(key) / 1000
      const value = battery.health[key]
      return `${timestamp}, ${value}`
    })

  await writeCsvFile(filename, header, lines)
}

async function batteryDate(batteries) {
  const sortedBatteries = batteries
    // Newest Battery first
    .sort((a, b) => Date.parse(b.age) - Date.parse(a.age))

  await Promise.all(
    sortedBatteries.map((o, i) => generateBatteryCsvFile(o, `tmp/date-${i + 1}.csv`))
  )
  await gnuplot.run('battery-date.gnuplot', [
    `lines=${sortedBatteries.length}`
  ])
}

module.exports = {
  batteryDate
}
