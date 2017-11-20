const asyncLoop = require('node-async-loop');
const {writeLocaleFile} = require('./helpers/utils');
const {getProject, fetchLocale} = require('./helpers/api');

const fetchAndSave = (config, projectID) =>
  new Promise((resolve, reject) => {
    asyncLoop(
      config.LOCALES,
      (locale, next) => {
        fetchLocale(config, projectID, locale).then(data => {
          writeLocaleFile(locale, config, data)
            .then(data => {
              console.log(data);
              next();
            })
            .catch(e => {
              console.log(e);
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
    const projectID = await getProject(config);
    await fetchAndSave(config, projectID);
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  cmdDownload
};
