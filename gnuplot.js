const childProcess = require('child_process')
const util = require('util')

const exec = util.promisify(childProcess.exec)

async function run(script, params = []) {
  let commandline = 'nice gnuplot '
  if (params.length > 0) {
    commandline += '-e "'
    commandline += params.join(';')

    commandline += '" '
  }

  commandline += script

  await exec(commandline)
}

module.exports = {
  run
}
