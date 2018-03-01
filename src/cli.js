require('dotenv').config();

const parsedArgs = require('./argparser');
const {cmdDownload} = require('./commands');
const {quitError, quitSuccess, mkConfig} = require('./helpers/utils');
const {MESSAGES} = require('./constants');

const args = parsedArgs();

if (args.subcmd === 'download') {
  mkConfig(args)
    .then((config) => {
      cmdDownload(config).then(() => {
        quitSuccess(MESSAGES.SUCCESS);
      });
    })
    .catch((e) => {
      quitError(e);
    });
}
