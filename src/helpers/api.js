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
          .filter(item => item.name === config.PROJECT_NAME)
          .map(item => item.id);
        if (projectID.length < 1) {
          reject(new Error(MESSAGES.PROJECT_NOT_FOUND));
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

      if (res.statusCode === 404) {
        reject(new Error(MESSAGES.PROJECT_NOT_FOUND));
      }

      if (res.statusCode === 401) {
        reject(new Error(MESSAGES.WRONG_TOKEN));
      }

      if (res.statusCode === 200) {
        resolve(body);
      } else {
        reject(
          new Error(
            `${MESSAGES.UNKNOWN_ERROR} \n ${JSON.stringify(body, null, 2)}`
          )
        );
      }
    });
  });

module.exports = {
  getProject,
  fetchLocale,
  endpoint
};
