const path = require('path');

const PHRASEAPP_BASEURL = 'api.phraseapp.com/api/v2';
const DEFAULT_DOWNLOAD_DIR = path.join(process.cwd(), './phraseapp');

const MESSAGES = {
  INVALID_TOKEN: 'GIMME TOKEN NAO',
  NO_PROJECT: 'CAN I HAZ PROJECT'
};

module.exports = {
  PHRASEAPP_BASEURL,
  DEFAULT_DOWNLOAD_DIR,
  MESSAGES
};
