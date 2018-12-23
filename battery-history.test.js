import test from 'ava'
import {
  batteryHistory
} from './battery-history'

test('example', t => {
  const inputHeader = ['Phone', 'Age', 'Name', '2018-05', '2018-06', '2018-07']
  const inputLines = [
    'X, 18-04, Peter, 100, 95, 90',
    '7, 18-01, Klaus, 97, 92, 87'
  ]
  const outputHeader = ['Month', '(Peter) X 18-04', '(Klaus) 7 18-01']
  const outputLines = [
    '2018-05, 100, 97',
    '2018-06, 95, 92',
    '2018-07, 90, 87'
  ]
  t.deepEqual(batteryHistory(inputHeader, inputLines), {
    header: outputHeader,
    csvLines: outputLines
  })
})

test('later start missing will have empty value', t => {
  const inputHeader = ['Phone', 'Age', 'Name', '2018-05', '2018-06', '2018-07']
  const inputLines = [
    'X, 18-04, Peter,   , 95, 90',
    '7, 18-01, Klaus, 97, 92, 87'
  ]
  const outputHeader = ['Month', '(Peter) X 18-04', '(Klaus) 7 18-01']
  const outputLines = [
    '2018-05, , 97',
    '2018-06, 95, 92',
    '2018-07, 90, 87'
  ]
  t.deepEqual(batteryHistory(inputHeader, inputLines), {
    header: outputHeader,
    csvLines: outputLines
  })
})

test('data not yet available will create empty place', t => {
  const inputHeader = ['Phone', 'Age', 'Name', '2018-05', '2018-06', '2018-07']
  const inputLines = [
    'X, 18-04, Peter, 100, 95',
    '7, 18-01, Klaus, 97, 92, 87'
  ]
  const outputHeader = ['Month', '(Peter) X 18-04', '(Klaus) 7 18-01']
  const outputLines = [
    '2018-05, 100, 97',
    '2018-06, 95, 92',
    '2018-07, , 87'
  ]
  t.deepEqual(batteryHistory(inputHeader, inputLines), {
    header: outputHeader,
    csvLines: outputLines
  })
})
