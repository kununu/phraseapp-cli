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

  cmdMain.addArgument(['-t', '--token'], {
    action: 'store',
    help: '',
    metavar: 'token'
  });

  return parser.parseArgs();
};

module.exports = parsedArgs;