function deviceHistory(header, csvLines) {
  console.assert(header[0] === 'Phone', 'something is ')
  if (header[0] !== 'Phone' ||
      header[1] !== 'Age' ||
      header[2] !== 'Name') {
    throw new Error('csv header seems wrong')
  }

  const monthHeader = [...header]
  monthHeader.splice(0, 3)

  const outputHeader = ['Month']
  const monthRows = []
  for (let i = 0; i < monthHeader.length; i++) {
    monthRows[i] = [monthHeader[i]]
  }

  monthHeader.forEach(month => {
    monthRows[month] = [month]
  })

  for (const line of csvLines) {
    const [phone, age, name, ...percentages] = line
      .split(',')
      .map(o => o.trim())
    outputHeader.push(`${phone} ${age} (${name})`)

    for (let i = 0; i < percentages.length; i++) {
      monthRows[i].push(percentages[i])
    }
  }

  const outputLines = monthRows.map(o => o.join(', '))

  return {
    header: outputHeader,
    csvLines: outputLines
  }
}

module.exports = {
  deviceHistory
}
