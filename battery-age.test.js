import test from 'ava'
import {
  getAgeVal,
  getAgeString,
  getAgeInMonths,
  getOldestAge,
  batteryAge
} from './battery-age'

test('getAgeVal YYYY-MM', t => {
  t.deepEqual(getAgeVal('2018-04'), {year: 2018, month: 4})
  t.deepEqual(getAgeVal('2014-11'), {year: 2014, month: 11})
})

test('getAgeVal YY-MM', t => {
  t.deepEqual(getAgeVal('18-04'), {year: 2018, month: 4})
  t.deepEqual(getAgeVal('14-11'), {year: 2014, month: 11})
})

test('getAgeVal ?', t => {
  t.deepEqual(getAgeVal('?'), {year: NaN, month: NaN})
})

test('getAgeString', t => {
  t.is(getAgeString({year: 2018, month: 11}), '2018-11')
  t.is(getAgeString({year: 2018, month: 4}), '2018-04')
  t.is(getAgeString({year: NaN, month: NaN}), '?')
})

test('getAgeInMonths', t => {
  t.is(getAgeInMonths('18-04', '18-04'), 0)
  t.is(getAgeInMonths('18-04', '18-01'), 3)
  t.is(getAgeInMonths('18-04', '17-04'), 12)
  t.is(getAgeInMonths('18-04', '17-01'), 15)
})

test('getOldestAge', t => {
  t.is(getOldestAge(['2018-04', '2018-01']), '2018-01')
})

test('batteryAge example', t => {
  const inputHeader = ['Phone', 'Age', 'Name', '2018-05', '2018-06', '2018-07']
  const inputLines = [
    'X, 18-05, Peter, 100, 95, 90',
    '7, 18-04, Klaus, 97, 92, 87'
  ]
  const outputHeader = ['Age', '(Peter) X 18-05', '(Klaus) 7 18-04']
  const outputLines = [
    '0, 100, ',
    '1, 95, 97',
    '2, 90, 92',
    '3, , 87'
  ]
  t.deepEqual(batteryAge(inputHeader, inputLines), {
    header: outputHeader,
    csvLines: outputLines
  })
})
