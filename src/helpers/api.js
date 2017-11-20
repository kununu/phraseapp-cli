const request = require('request');
const asyncLoop = require('node-async-loop');
const {PHRASEAPP_BASEURL} = require('../constants');
const {MESSAGES} = require('../constants');
const endpoint = (endpoint, token) => ({
  url: `https://${token}@${PHRASEAPP_BASEURL}/${endpoint}`,
  json: true
});

const getProject = config =>
  new Promise((resolve, reject) => {
    request.get(endpoint('projects', config.TOKEN), (err, res, body) => {
      if (err) {
        reject(err);
      }

      if (res.statusCode === 401) {
        reject(new Error(MESSAGES.INVALID_TOKEN));
      }

      if (res.statusCode === 200) {
        const projectID = body
          .filter(item => item.name === config.PROJECT)
          .map(item => item.id);

        if (projectID.length < 1) {
          // TODO: show which project was not found (name)
          reject(new Error(MESSAGES.NO_PROJECT));
        }

        resolve(projectID[0]);
      }
    });
  });

const getLocale = (config, projectID, locale) =>
  new Promise((resolve, reject) => {
    const localeEndpoint = endpoint(
      `projects/${projectID}/locales/${locale}/download?file_format=${config.FORMAT}`, // eslint-disable-line
      config.TOKEN
    );

    request.get(localeEndpoint, (err, res, body) => {
      if (err) {
        reject(err);
      }

      if (res.statusCode === 401) {
        reject(new Error(MESSAGES.WRONG_TOKEN));
      }

      resolve(body);
    });
  });

const fetchGivenLocales = (config, projectID) =>
  new Promise((resolve, reject) => {
    asyncLoop(
      config.LOCALES,
      (locale, next) => {
        getLocale(config, projectID, locale).then(data => {
          console.log('=================================================================== load ' + locale);
          console.log(data);
          next();
        });
      },
      err => {
        if (err) {
          reject(err);
        }
        console.log('finished');
      }
    );
  });

module.exports = {
  getProject,
  getLocale,
  fetchGivenLocales
};
