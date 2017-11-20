const path = require('path');

const PHRASEAPP_BASEURL = 'api.phraseapp.com/api/v2';
const DEFAULT_DOWNLOAD_DIR = path.join(process.cwd(), './phraseapp');
const SUPPORTED_FORMATS = ['react_simple_json', 'yml_symfony', 'gettext', 'wat'];

const MESSAGES = {
  INVALID_TOKEN: 'GIMME TOKEN NAO',
  NO_PROJECT: 'CAN I HAZ PROJECT',
  WRONG_TOKEN: 'WRONG TOKEN',
  WRONG_FORMAT: `Format not Supported, Supported Formats: ${SUPPORTED_FORMATS}`
};

module.exports = {
  PHRASEAPP_BASEURL,
  DEFAULT_DOWNLOAD_DIR,
  SUPPORTED_FORMATS,
  MESSAGES
};