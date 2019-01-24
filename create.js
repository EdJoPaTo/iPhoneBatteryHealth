const fsPromise = require('fs').promises

const {batteryAge} = require('./battery-age')

doIt()
async function doIt() {
  const data = JSON.parse(await fsPromise.readFile('data.json', 'utf8'))
  const batteries = data
    .flatMap(person => person.batteries.map(bat => {
      bat.person = person._name
      return bat
    }))

  console.log('create battery-age')
  await batteryAge(batteries)
}
