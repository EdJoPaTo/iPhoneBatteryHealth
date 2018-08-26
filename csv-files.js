const fsPromise = require('fs').promises

const {parseCsvFromFileContent, parseCsvToFileContent} = require('./csv-helper')

async function readCsvFile(filename) {
  let content = await fsPromise.readFile(filename, 'utf8')
  content = content.replace('\r\n', '\n')
  return parseCsvFromFileContent(content)
}

async function writeCsvFile(filename, header, csvLines) {
  const content = parseCsvToFileContent(header, csvLines)
  return fsPromise.writeFile(filename, content, 'utf8')
}

module.exports = {
  readCsvFile,
  writeCsvFile
}
