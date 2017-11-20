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
      const projectID = body
        .filter(item => item.name === config.PROJECT)
        .map(item => item.id);

      if (projectID.length < 1) {
        // TODO: show which project was not found (name)
        reject(new Error(MESSAGES.NO_PROJECT));
      }

      resolve(projectID[0]);
    });
  });

module.exports = {
  getProject
};
