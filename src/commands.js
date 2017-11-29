const asyncLoop = require('node-async-loop');
const {writeLocaleFile, quitError} = require('./helpers/utils');
const {getProject, fetchLocale} = require('./helpers/api');

const fetchAndSave = (config, projectID) =>
  new Promise((resolve, reject) => {
    asyncLoop(
      config.LOCALES,
      (locale, next) => {
        fetchLocale(config, projectID, locale).then(data => {
          writeLocaleFile(locale, config, data)
            .then(data => {
              next();
            })
            .catch(e => {
              next(e);
            });
        });
      },
      err => {
        if (err) {
          reject(err);
        }
        resolve();
      }
    );
  });

const cmdDownload = async config => {
  try {
    const projectID = config.PROJECT_NAME
      ? await getProject(config)
      : config.PROJECT_ID;

    await fetchAndSave(config, projectID);
    return true;
  } catch (e) {
    quitError(e);
  }
};

module.exports = {
  cmdDownload
};
