function getAgeVal(age) {
  const splitted = age.split('-')
    .map(o => Number(o))

  if (splitted.length !== 2) {
    return {year: NaN, month: NaN}
  }

  let year = splitted[0]
  if (year < 100) {
    year += 2000
  }

  const month = splitted[1]

  return {year, month}
}

function getAgeString({year, month}) {
  if (!year || !month) {
    return '?'
  }
  let result = `${year}-`
  if (month < 10) {
    result += '0'
  }
  result += month
  return result
}

function getAgeInMonths(age, relativeTo) {
  const current = getAgeVal(age)
  const old = getAgeVal(relativeTo)

  const yearDiff = current.year - old.year
  const monthDiff = current.month - old.month

  return (yearDiff * 12) + monthDiff
}

function getOldestAge(ageArr) {
  const vals = ageArr
    .map(o => getAgeVal(o))
    .filter(o => !isNaN(o.year))

  const year = Math.min(...vals.map(o => o.year))

  const entriesInYear = vals
    .filter(o => o.year === year)

  const month = Math.min(...entriesInYear.map(o => o.month))

  return getAgeString({year, month})
}

function batteryAge(header, csvLines) {
  const oldestAge = getOldestAge(
    csvLines.map(line => line.split(',')[1].trim())
  )

  const monthHeader = [...header]
  monthHeader.splice(0, 3)
  const newestAge = monthHeader[monthHeader.length - 1]

  const totalMonths = getAgeInMonths(newestAge, oldestAge)
  const rows = []
  for (let i = 0; i <= totalMonths; i++) {
    rows[i] = [i]
  }

  const outputHeader = ['Age']

  for (const line of csvLines) {
    const [phone, age, name, ...percentages] = line
      .split(',')
      .map(o => o.trim())
    if (!getAgeVal(age).year) {
      continue
    }

    outputHeader.push(`(${name}) ${phone} ${age}`)

    for (let i = 0; i < percentages.length; i++) {
      if (!percentages[i]) {
        continue
      }
      const ageInMonths = getAgeInMonths(monthHeader[i], age)

      rows[ageInMonths].push(percentages[i])
    }
    const maxLength = Math.max(...rows.map(o => o.length))

    for (let i = 0; i < rows.length; i++) {
      if (rows[i].length < maxLength) {
        rows[i].push('')
      }
    }
  }

  const outputLines = rows.map(o => o.join(', '))

  return {
    header: outputHeader,
    csvLines: outputLines
  }
}

module.exports = {
  getAgeVal,
  getAgeString,
  getAgeInMonths,
  getOldestAge,
  batteryAge
}
