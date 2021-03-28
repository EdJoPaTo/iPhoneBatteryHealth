import test from 'ava'
import {
  parseCsvFromFileContent,
  parseCsvToFileContent,
  simpleFlip
} from './csv-helper.js'

test('parseCsvFromFileContent example', t => {
  let csv = 'name,value\n'
  csv += 'peter,42\n'
  csv += 'klaus,0'
  t.deepEqual(parseCsvFromFileContent(csv), {
    header: ['name', 'value'],
    csvLines: [
      'peter,42',
      'klaus,0'
    ]
  })
})

test('parseCsvFromFileContent skip empty lines', t => {
  let csv = 'name,value\n'
  csv += '\n'
  csv += 'peter,42\n'
  csv += '\n'
  csv += 'klaus,0\n'

  t.deepEqual(parseCsvFromFileContent(csv), {
    header: ['name', 'value'],
    csvLines: [
      'peter,42',
      'klaus,0'
    ]
  })
})

test('parseCsvToFileContent example', t => {
  const header = ['name', 'value']
  const lines = [
    'peter,42',
    'klaus,0'
  ]
  let csv = 'name, value\n'
  csv += 'peter,42\n'
  csv += 'klaus,0\n'
  t.is(parseCsvToFileContent(header, lines), csv)
})

test('simpleFlip example', t => {
  const preHeader = ['name', 'value']
  const preLines = [
    'peter,42',
    'klaus,0'
  ]

  const postHeader = ['name', 'peter', 'klaus']
  const postLines = [
    'value, 42, 0'
  ]

  t.deepEqual(simpleFlip(preHeader, preLines), {
    header: postHeader,
    csvLines: postLines
  })
})
