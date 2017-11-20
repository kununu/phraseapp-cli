const {DEFAULT_DOWNLOAD_DIR, MESSAGES, SUPPORTED_FORMATS} = require('../constants');

const quitError = (err, code = 1) => {
  console.log(err.message);
  process.exit(code);
};

const mkConfig = args =>
  new Promise((resolve, reject) => {
    const config = {
      TOKEN: process.env.PHRASEAPP_ACCESS_TOKEN || args.token,
      PROJECT: process.env.PHRASEAPP_PROJECT || args.project,
      DIR: args.directory || DEFAULT_DOWNLOAD_DIR,
      FORMAT: args.format,
      TAGS: args.tags ? args.tags.split(',') : [],
      LOCALES: args.locales ? args.locales.split(',') : []
    };

    if (SUPPORTED_FORMATS.indexOf(config.FORMAT) < 0) {
      reject(new Error(MESSAGES.WRONG_FORMAT));
    }

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
