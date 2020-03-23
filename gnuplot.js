const childProcess = require('child_process')
const util = require('util')

const exec = util.promisify(childProcess.exec)

async function run(script, parameters = []) {
  let commandline = 'nice gnuplot '
  if (parameters.length > 0) {
    commandline += '-e "'
    commandline += parameters.join(';')

    commandline += '" '
  }

  commandline += script

  await exec(commandline)
}

module.exports = {
  run
}
