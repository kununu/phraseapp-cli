const {getProject} = require('./helpers/api');

const cmdDownload = (config) => {
  return getProject(config).then(data => {
    console.log(data);
  });
};

module.exports = {
  cmdDownload
};
