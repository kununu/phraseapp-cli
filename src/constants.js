const path = require('path');

const PHRASEAPP_BASEURL = 'api.phraseapp.com/api/v2';
const DEFAULT_DOWNLOAD_DIR = path.join(process.cwd(), './phraseapp');
const FORMATS = [
  {
    format: 'react_simple_json',
    ext: '.json',
  },
  {
    format: 'yml_symphony',
    ext: '.yml',
  },
  {
    format: 'gettext',
    ext: '.po',
  },
  {
    format: 'simple_json',
    ext: '.json',
  },
];

const SUPPORTED_FORMATS = FORMATS.map(item => item.format);

const MESSAGES = {
  SUCCESS: 'phraseapp-cli: Successfully downloaded locales',
  UNKNOWN_ERROR: 'phraseapp-cli Error: Unknown Error',
  INVALID_TOKEN: 'phraseapp-cli Error: No Phraseapp Token given',
  NO_PROJECT: 'phraseapp-cli Error: No Project given',
  PROJECT_NOT_FOUND: 'phraseapp-cli Error: Project not found',
  WRONG_TOKEN: 'phraseapp-cli Error: Phraseapp Token is invalid',
  WRONG_FORMAT: `phraseapp-cli Error: Format not Supported, Supported Formats: ${
    SUPPORTED_FORMATS
  }`,
};

module.exports = {
  PHRASEAPP_BASEURL,
  DEFAULT_DOWNLOAD_DIR,
  SUPPORTED_FORMATS,
  MESSAGES,
  FORMATS,
};
