function parseCsvFromFileContent(content) {
  let preparedContent = content.trim()

  while (preparedContent.includes('\n\n')) {
    preparedContent = preparedContent.replace('\n\n', '\n')
  }

  const allLines = preparedContent.split('\n')

  const [headerLine, ...csvLines] = allLines
  const header = headerLine.split(',')
    .map(s => s.trim())

  const preparedCsvLines = csvLines.map(l => l.trim())

  return {header, csvLines: preparedCsvLines}
}

function parseCsvToFileContent(header, csvLines) {
  const headerLine = header.join(', ')
  const lines = [headerLine, ...csvLines]
  const content = lines.join('\n') + '\n'
  return content
}

function simpleFlip(header, csvLines) {
  const headerLine = header.join(', ')
  const allInputLines = [headerLine, ...csvLines]
  const allOutputLines = []

  for (const inputLine of allInputLines) {
    const lineContent = inputLine.split(',')
      .map(s => s.trim())
    for (const [j, entry] of lineContent.entries()) {
      if (!allOutputLines[j]) {
        allOutputLines[j] = []
      }

      allOutputLines[j].push(entry)
    }
  }

  const outputContent = allOutputLines
    .map(lineArray => lineArray.join(', '))
    .join('\n')
  return parseCsvFromFileContent(outputContent)
}

module.exports = {
  parseCsvFromFileContent,
  parseCsvToFileContent,
  simpleFlip
}
