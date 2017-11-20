const {getProject, fetchGivenLocales} = require('./helpers/api');

const cmdDownload = async config => {
  try {
    const projectID = await getProject(config);
    // const locales = await getLocale(config, projectID, config.LOCALES);
    const locales = await fetchGivenLocales(config, projectID);
    return locales;
  } catch (e) {
    console.log(e.message);
  }
};

module.exports = {
  cmdDownload
};
