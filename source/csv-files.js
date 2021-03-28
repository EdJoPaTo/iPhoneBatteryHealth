import {readFile, writeFile} from 'fs/promises'

import {parseCsvFromFileContent, parseCsvToFileContent} from './csv-helper.js'

export async function readCsvFile(filename) {
  let content = await readFile(filename, 'utf8')
  content = content.replace('\r\n', '\n')
  return parseCsvFromFileContent(content)
}

export async function writeCsvFile(filename, header, csvLines) {
  const content = parseCsvToFileContent(header, csvLines)
  return writeFile(filename, content, 'utf8')
}
