const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const {DEFAULT_DOWNLOAD_DIR, MESSAGES, FORMATS} = require('../constants');

const quitError = (err, code = 1) => {
  console.log(err.message);
  process.exit(code);
};

const mkConfig = args =>
  new Promise((resolve, reject) => {
    const SUPPORTED_FORMATS = FORMATS.map(item => item.format);
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

const writeLocaleFile = (locale, config, data) =>
  new Promise((resolve, reject) => {
    const DLDIR = config.dir || DEFAULT_DOWNLOAD_DIR;
    const fileExt = FORMATS.filter(item => item.format === config.FORMAT).map(
      item => item.ext
    )[0];
    const file = path.join(DLDIR, `${locale}${fileExt}`);

    mkdirp(DLDIR, err => {
      if (err) {
        reject(err);
      }

      fs.writeFile(file, data, err => {
        if (err) {
          reject(err);
        }
        resolve(`Written: ${file}`);
      });
    });
  });

module.exports = {
  quitError,
  mkConfig,
  writeLocaleFile
};