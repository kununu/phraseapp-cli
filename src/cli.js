require('dotenv').config();
const parsedArgs = require('./argparser');
const args = parsedArgs();
const {cmdDownload} = require('./commands');
const {quitError, quitSuccess, mkConfig} = require('./helpers/utils');
const {MESSAGES} = require('./constants');

switch (args.subcmd) {
  case 'download':
    mkConfig(args)
      .then(config => {
        cmdDownload(config).then(data => {
          quitSuccess(MESSAGES.SUCCESS);
        });
      })
      .catch(e => {
        quitError(e);
      });
    break;
}
