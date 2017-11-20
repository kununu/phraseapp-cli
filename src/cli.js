require('dotenv').config();
const parsedArgs = require('./argparser');
const args = parsedArgs();
const {cmdDownload} = require('./commands');
const {quitError, mkConfig} = require('./helpers/utils');

process.on('unhandledRejection', reason => {
  console.log('Unhandled Reject Reason: \n' + JSON.stringify(reason, null, 2));
});

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
