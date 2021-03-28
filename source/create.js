import {mkdir, readFile} from 'fs/promises'

import {batteryAge} from './battery-age.js'
import {batteryDate} from './battery-date.js'

doIt()
async function doIt() {
  await mkdir('tmp', {recursive: true})

  const data = JSON.parse(await readFile('data.json', 'utf8'))
  const batteries = data
    .flatMap(person => person.batteries.map(bat => {
      bat.person = person._name
      return bat
    }))

  console.log('create battery-age')
  await batteryAge(batteries)
  console.log('create battery-date')
  await batteryDate(batteries)
}
