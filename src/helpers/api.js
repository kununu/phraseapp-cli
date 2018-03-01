const request = require('request');

const {PHRASEAPP_BASEURL} = require('../constants');
const {MESSAGES} = require('../constants');

const getPhraseAppApiEndpoint = (endpoint, token) => ({
  url: `https://${token}@${PHRASEAPP_BASEURL}/${endpoint}`,
  json: true,
});

const getProject = config =>
  new Promise((resolve, reject) => {
    request.get(getPhraseAppApiEndpoint('projects', config.TOKEN), (err, res, body) => {
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

    // If there is a fallback specified, include_empty_translations also needs to be set to true
    const fallback = config.FALLBACK_LOCALE_ID ? `&include_empty_translations&fallback_locale_id=${config.FALLBACK_LOCALE_ID}` : '';
    const localeEndpoint = getPhraseAppApiEndpoint(
      `projects/${projectID}/locales/${locale}/download?file_format=${config.FORMAT}${tag}${fallback}`, // eslint-disable-line
      config.TOKEN,
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
            `${MESSAGES.UNKNOWN_ERROR} \n ${JSON.stringify(body, null, 2)}`,
          ),
        );
      }
    });
  });

module.exports = {
  getProject,
  fetchLocale,
  getPhraseAppApiEndpoint,
};
