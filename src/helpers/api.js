const {PHRASEAPP_BASEURL} = require('../constants');
const {MESSAGES} = require('../constants');

const getPhraseAppApiEndpoint = (endpoint, token) => ({
  url: `https://${token}@${PHRASEAPP_BASEURL}/${endpoint}`,
  json: true,
});

const getProject = async config => {
  try {
    const endpoint = getPhraseAppApiEndpoint('projects', config.TOKEN);
    const response = await fetch(endpoint.url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.status === 401) {
      throw new Error(MESSAGES.INVALID_TOKEN);
    }

    if (response.status === 200) {
      const body = await response.json();
      const projectID = body
        .filter(item => item.name === config.PROJECT_NAME)
        .map(item => item.id);
      if (projectID.length < 1) {
        throw new Error(MESSAGES.PROJECT_NOT_FOUND);
      }

      return projectID[0];
    }

    throw new Error(`Unexpected status code: ${response.status}`);
  } catch (error) {
    throw error;
  }
};

const fetchLocale = async (config, projectID, locale) => {
  try {
    const tag = config.TAG ? `&tag=${config.TAG}` : '';
    const branch = config.BRANCH ? `&branch=${config.BRANCH}` : '';

    // If there is a fallback specified, include_empty_translations also needs to be set to true
    const fallback = config.FALLBACK_LOCALE_ID ? `&include_empty_translations&fallback_locale_id=${config.FALLBACK_LOCALE_ID}` : '';
    const localeEndpoint = getPhraseAppApiEndpoint(
      `projects/${projectID}/locales/${locale}/download?file_format=${config.FORMAT}${tag}${branch}${fallback}`, // eslint-disable-line
      config.TOKEN,
    );

    const response = await fetch(localeEndpoint.url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.status === 404) {
      throw new Error(MESSAGES.PROJECT_NOT_FOUND);
    }

    if (response.status === 401) {
      throw new Error(MESSAGES.WRONG_TOKEN);
    }

    if (response.status === 200) {
      return await response.text();
    } else {
      const body = await response.text();
      throw new Error(
        `${MESSAGES.UNKNOWN_ERROR} \n ${body}`,
      );
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getProject,
  fetchLocale,
  getPhraseAppApiEndpoint,
};
