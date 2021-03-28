import * as childProcess from 'child_process'
import {promisify} from 'util'

const exec = promisify(childProcess.exec)

export async function run(script, parameters = []) {
  let commandline = 'nice gnuplot '
  if (parameters.length > 0) {
    commandline += '-e "'
    commandline += parameters.join(';')

    commandline += '" '
  }

  commandline += script

  await exec(commandline)
}
