const {DEFAULT_DOWNLOAD_DIR, MESSAGES} = require('../constants');

const quitError = (err, code = 1) => {
  console.log(err.message);
  process.exit(code);
};

const mkConfig = args =>
  new Promise((resolve, reject) => {
    const config = {
      TOKEN: process.env.PHRASEAPP_ACCESS_TOKEN || args.token,
      PROJECT: process.env.PHRASEAPP_PROJECT || args.project,
      DIR: args.directory || DEFAULT_DOWNLOAD_DIR
    };

    if (!config.TOKEN) {
      reject(new Error(MESSAGES.INVALID_TOKEN));
    }

    if (!config.PROJECT) {
      reject(new Error(MESSAGES.NO_PROJECT));
    }

    resolve(config);
  });

module.exports = {
  quitError,
  mkConfig
};
