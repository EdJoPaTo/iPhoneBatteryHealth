import * as gnuplot from './gnuplot.js'
import {writeCsvFile} from './csv-files.js'

const MONTH_IN_SECONDS = 60 * 60 * 24 * 30

async function generateBatteryCsvFile(battery, filename) {
  const header = [
    'Age',
    `(${battery.person}) ${battery.device} ${battery.age.slice(0, 7)}`
  ]

  const ageTimestamp = Date.parse(battery.age)
  const lines = Object.keys(battery.health)
    .map(key => {
      const timestamp = Date.parse(key)
      const ageInSeconds = (timestamp - ageTimestamp) / 1000
      const ageInMonths = ageInSeconds / MONTH_IN_SECONDS
      const value = battery.health[key]
      return `${ageInMonths}, ${value}`
    })

  await writeCsvFile(filename, header, lines)
}

export async function batteryAge(batteries) {
  const sortedBatteries = batteries
    // Newest Battery first
    .sort((a, b) => Date.parse(b.age) - Date.parse(a.age))

  await Promise.all(
    sortedBatteries.map((o, i) => generateBatteryCsvFile(o, `tmp/age-${i + 1}.csv`))
  )
  await gnuplot.run('source/battery-age.gnuplot', [
    `lines=${sortedBatteries.length}`
  ])
}
