const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const {
  DEFAULT_DOWNLOAD_DIR,
  MESSAGES,
  FORMATS,
  SUPPORTED_FORMATS
} = require('../constants');

const quitError = (err, code = 1) => {
  console.log(err.message);
  process.exit(code);
};

const quitSuccess = (msg) => {
  console.log(msg);
  process.exit(0);
};

const mkConfig = args =>
  new Promise((resolve, reject) => {
    const config = {
      TOKEN: process.env.PHRASEAPP_ACCESS_TOKEN || args.token,
      PROJECT_NAME: process.env.PHRASEAPP_PROJECT_NAME || args.projectname,
      PROJECT_ID: process.env.PHRASEAPP_PROJECT_ID || args.projectid,
      DIR: args.directory || DEFAULT_DOWNLOAD_DIR,
      FORMAT: args.format,
      TAG: args.tag || false,
      LOCALES: args.locales ? args.locales.split(',') : []
    };

    if (SUPPORTED_FORMATS.indexOf(config.FORMAT) < 0) {
      reject(new Error(MESSAGES.WRONG_FORMAT));
    }

    if (!config.TOKEN) {
      reject(new Error(MESSAGES.INVALID_TOKEN));
    }

    if (!config.PROJECT_NAME && !config.PROJECT_ID) {
      reject(new Error(MESSAGES.NO_PROJECT));
    }

    resolve(config);
  });

const writeLocaleFile = (locale, config, data) =>
  new Promise((resolve, reject) => {
    const fileExt = FORMATS.filter(item => item.format === config.FORMAT).map(
      item => item.ext
    )[0];
    const file = path.join(config.DIR, `${locale}${fileExt}`);

    mkdirp(config.DIR, err => {
      if (err) {
        reject(err);
      }

      const writeData =
        typeof data === 'object' ? JSON.stringify(data, null, 2) : data;

      fs.writeFile(file, writeData, err => {
        if (err) {
          reject(err);
        }
        resolve(`Written: ${file}`);
      });
    });
  });

module.exports = {
  quitSuccess,
  quitError,
  mkConfig,
  writeLocaleFile
};
