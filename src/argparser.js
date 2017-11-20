var ArgumentParser = require('argparse').ArgumentParser;
const pkg = require('../package.json');

const parsedArgs = () => {
  var parser = new ArgumentParser({
    version: pkg.version,
    addHelp: true,
    description: 'phraseapp-cli'
  });

  const subparsers = parser.addSubparsers({
    title: 'subcommands',
    dest: 'subcmd'
  });

  const cmdMain = subparsers.addParser('download', {
    addHelp: true,
    help: 'get DAUN!'
  });

  cmdMain.addArgument(['-d', '--directory'], {
    action: 'store',
    help: '',
    metavar: 'directory'
  });

  cmdMain.addArgument(['-p', '--project'], {
    action: 'store',
    help: '',
    metavar: 'project'
  });

  cmdMain.addArgument(['--token'], {
    action: 'store',
    help: '',
    metavar: 'token'
  });

  cmdMain.addArgument(['--tags'], {
    action: 'store',
    help: '',
    metavar: 'tags'
  });

  cmdMain.addArgument(['-f', '--format'], {
    action: 'store',
    help: '',
    metavar: 'format',
    required: true
  });

  cmdMain.addArgument(['-l', '--locales'], {
    action: 'store',
    help: '',
    metavar: 'format',
    required: true
  });



  return parser.parseArgs();
};

module.exports = parsedArgs;