const request = require('request');
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

const fetchLocale = (config, projectID, locale) =>
  new Promise((resolve, reject) => {
    const tag = config.TAG ? `&tag=${config.TAG}` : '';
    const localeEndpoint = endpoint(
      `projects/${projectID}/locales/${locale}/download?file_format=${config.FORMAT}${tag}`, // eslint-disable-line
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

module.exports = {
  getProject,
  fetchLocale
};
