const path = require('path');

const PHRASEAPP_BASEURL = 'api.phraseapp.com/api/v2';
const DEFAULT_DOWNLOAD_DIR = path.join(process.cwd(), './phraseapp');
const FORMATS = [
  {
    format: 'react_simple_json',
    ext: '.json'
  },
  {
    format: 'yml_symphony',
    ext: '.yml'
  },
  {
    format: 'gettext',
    ext: '.po'
  }
];

const SUPPORTED_FORMATS = FORMATS.map(item => item.format);

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
  MESSAGES,
  FORMATS
};