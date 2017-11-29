var ArgumentParser = require('argparse').ArgumentParser;
const pkg = require('../package.json');
const {SUPPORTED_FORMATS} = require('./constants');

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
    help: 'Download'
  });

  cmdMain.addArgument(['-d', '--directory'], {
    action: 'store',
    help: 'Download Directory',
    metavar: 'directory'
  });

  cmdMain.addArgument(['-p', '--projectname'], {
    action: 'store',
    help: 'Projectname',
    metavar: 'projectname'
  });

  cmdMain.addArgument(['-i', '--projectid'], {
    action: 'store',
    help: 'Project ID',
    metavar: 'projectid'
  });

  cmdMain.addArgument(['--token'], {
    action: 'store',
    help: 'API Access Token',
    metavar: 'token'
  });

  cmdMain.addArgument(['--tag'], {
    action: 'store',
    help: 'Tagname',
    metavar: 'tag'
  });

  cmdMain.addArgument(['-f', '--format'], {
    action: 'store',
    help: `Format of the locales, Supported: ${SUPPORTED_FORMATS}`,
    metavar: 'format',
    required: true
  });

  cmdMain.addArgument(['-l', '--locales'], {
    action: 'store',
    help: 'Comma seperated list of locale IDs (de_DE,en_US)',
    metavar: 'format',
    required: true
  });

  return parser.parseArgs();
};

module.exports = parsedArgs;
