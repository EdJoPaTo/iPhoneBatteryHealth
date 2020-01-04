/* eslint unicorn/no-for-loop: warn */

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

  for (let i = 0; i < allInputLines.length; i++) {
    const lineContent = allInputLines[i].split(',')
      .map(s => s.trim())
    for (let j = 0; j < lineContent.length; j++) {
      if (!allOutputLines[j]) {
        allOutputLines[j] = []
      }

      allOutputLines[j].push(lineContent[j])
    }
  }

  const outputContent = allOutputLines
    .map(lineArr => lineArr.join(', '))
    .join('\n')
  return parseCsvFromFileContent(outputContent)
}

module.exports = {
  parseCsvFromFileContent,
  parseCsvToFileContent,
  simpleFlip
}
