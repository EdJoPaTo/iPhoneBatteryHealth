import test from 'ava'
import {
  deviceHistory
} from './parse-graph-data'

test('deviceHistory example', t => {
  const inputHeader = ['Phone', 'Age', 'Name', '2018-05', '2018-06', '2018-07']
  const inputLines = [
    'X, 18-04, Peter, 100, 95, 90',
    '7, 18-01, Klaus, 97, 92, 87'
  ]
  const outputHeader = ['Month', 'X 18-04 (Peter)', '7 18-01 (Klaus)']
  const outputLines = [
    '2018-05, 100, 97',
    '2018-06, 95, 92',
    '2018-07, 90, 87'
  ]
  t.deepEqual(deviceHistory(inputHeader, inputLines), {
    header: outputHeader,
    csvLines: outputLines
  })
})

test('deviceHistory later start missing will have empty value', t => {
  const inputHeader = ['Phone', 'Age', 'Name', '2018-05', '2018-06', '2018-07']
  const inputLines = [
    'X, 18-04, Peter,   , 95, 90',
    '7, 18-01, Klaus, 97, 92, 87'
  ]
  const outputHeader = ['Month', 'X 18-04 (Peter)', '7 18-01 (Klaus)']
  const outputLines = [
    '2018-05, , 97',
    '2018-06, 95, 92',
    '2018-07, 90, 87'
  ]
  t.deepEqual(deviceHistory(inputHeader, inputLines), {
    header: outputHeader,
    csvLines: outputLines
  })
})

test('deviceHistory data not yet available will create empty place', t => {
  const inputHeader = ['Phone', 'Age', 'Name', '2018-05', '2018-06', '2018-07']
  const inputLines = [
    'X, 18-04, Peter, 100, 95',
    '7, 18-01, Klaus, 97, 92, 87'
  ]
  const outputHeader = ['Month', 'X 18-04 (Peter)', '7 18-01 (Klaus)']
  const outputLines = [
    '2018-05, 100, 97',
    '2018-06, 95, 92',
    '2018-07, , 87'
  ]
  t.deepEqual(deviceHistory(inputHeader, inputLines), {
    header: outputHeader,
    csvLines: outputLines
  })
})
