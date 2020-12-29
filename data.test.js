const fsPromises = require('fs').promises

const test = require('ava')
const stringify = require('json-stable-stringify')

test.before(async t => {
  const content = await fsPromises.readFile('data.json', 'utf8')
  t.context.content = content
  t.context.json = JSON.parse(content)
})

test('is data well structured', t => {
  const expected = stringify(t.context.json, {space: 2}) + '\n'
  t.is(t.context.content, expected)
})

test('data is array', t => {
  t.true(Array.isArray(t.context.json))
})

test('everyone has a name', t => {
  const withoutName = t.context.json
    .filter(o => !o._name)
  t.log(withoutName)
  t.deepEqual(withoutName, [])
})

test('everyone has a battery', t => {
  const withoutBattery = t.context.json
    .filter(o => (o.batteries || []).length === 0)
  t.log(withoutBattery)
  t.deepEqual(withoutBattery, [])
})

test('every battery has age and device', t => {
  const personWithBatteryWithoutAgeOrDevice = t.context.json
    .filter(o => (o.batteries || [])
      .some(b => !b.age || !b.device)
    )

  t.log(personWithBatteryWithoutAgeOrDevice)
  t.deepEqual(personWithBatteryWithoutAgeOrDevice, [])
})

test('every battery has at least one health entry', t => {
  const personWithoutBatteryHealthEntry = t.context.json
    .filter(o => (o.batteries || [])
      .some(b => Object.keys(b.health || {}).length === 0)
    )

  t.log(personWithoutBatteryHealthEntry)
  t.deepEqual(personWithoutBatteryHealthEntry, [])
})

test('health is newer than battery age', t => {
  const batteries = t.context.json
    .flatMap(o => o.batteries)
    .filter(o => o)
  const badEntries = batteries
    .filter(bat => {
      const age = Date.parse(bat.age)
      const healthTimestamps = Object.keys(bat.health)
        .map(o => Date.parse(o))
      const oldestHealthTimestamp = Math.min(...healthTimestamps)
      return age > oldestHealthTimestamp
    })

  t.log(badEntries)
  t.deepEqual(badEntries, [])
})

test('health between 0 and 100', t => {
  const healthPercentages = t.context.json
    .flatMap(o => o.batteries)
    .filter(o => o)
    .map(o => o.health)
    .filter(o => o)
    .flatMap(o => Object.values(o))

  const wrongValues = healthPercentages
    .filter(o => !Number.isFinite(o) || o < 0 || o > 100)

  t.deepEqual(wrongValues, [])
})

test('warning is newer than battery age', t => {
  const batteries = t.context.json
    .flatMap(o => o.batteries)
    .filter(o => o)
    .filter(o => o.warningSince)
  const badEntries = batteries
    .filter(bat => {
      const age = Date.parse(bat.age)
      const warning = Date.parse(bat.warningSince)
      return age > warning
    })

  t.log(badEntries)
  t.deepEqual(badEntries, [])
})
