require('dotenv').config();
const parsedArgs = require('./argparser');
const args = parsedArgs();
const {cmdDownload} = require('./commands');
const {quitError, mkConfig} = require('./helpers/utils');

switch (args.subcmd) {
  case 'download':
    mkConfig(args)
      .then(config => {
        cmdDownload(config).then(data => {
          console.log(data);
        });
      })
      .catch(e => {
        quitError(e);
      });
    break;
}
