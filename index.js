#! /usr/bin/env node

/* eslint-disable no-console */

const fs = require('fs');

const colors = require('colors'); // eslint-disable-line no-unused-vars

function loadConfig () {
  const configPath = `${process.cwd()}/.phraseapp.json`;
  if (!fs.existsSync(configPath)) {
    console.error("Error: pharaseapp config file doesn't exist.".red.bold);
    process.exit(1);
  }

  let phrase;

  try {
    phrase = JSON.parse(fs.readFileSync(configPath));
  } catch (e) {
    console.error('Error: Your pharaseapp config file is incorrect .'.red.bold);
    process.exit(1);
  }

  if (!phrase.locales) {
    console.error('Error: please provide locales in config file ( for example:  locales: "pl_PL" ).'.red.bold);
    process.exit(1);
  }

  if (!phrase.access_token) {
    console.error(
      'Error: please provide access_token in config file .'.red.bold,
    );
    process.exit(1);
  }

  if (!phrase.project_id) {
    console.error('Error: please provide project_id in config file .'.red.bold);
    process.exit(1);
  }

  return phrase;
}

function getPhraseAppQueryParams (tag, fallbackLocale, branch) {
  const queryParams = {
    file_format: 'react_simple_json',
    tag,
  };

  if (fallbackLocale) {
    queryParams.include_empty_translations = 'true';
    queryParams.fallback_locale_id = fallbackLocale;
  }

  if (branch) {
    queryParams.branch = branch;
  }

  return Object.keys(queryParams)
    .map(key => `${key}=${queryParams[key]}`)
    .join('&');
}

async function loadLocale (phrase) {
  for (const locale of phrase.locales) {
    const filepath = `${phrase.path}${locale.locale_id}.json`;
    let file = {};

    if (fs.existsSync(filepath)) {
      file = JSON.parse(fs.readFileSync(filepath));
    }

    const tags = locale.tags || [false];

    for (const tag of tags) {
      try {
        const url = `https://${
          phrase.access_token
        }@api.phraseapp.com/api/v2/projects/${phrase.project_id}/locales/${
          locale.locale_id
        }/download?${getPhraseAppQueryParams(tag, locale.fallback_locale_id, phrase.branch)}`;
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.status === 200) {
          const body = await response.text();
          fs.writeFileSync(
            filepath,
            JSON.stringify(Object.assign(file, JSON.parse(body)), null, '\t'),
          );
          console.info(
            `Success: locale file [${locale.locale_id}.json]${
              tag ? ` for tag ${tag} ` : ' '
            }was updated`.green.bold,
          );
        } else {
          if (response.status !== 401) {
            const body = await response.text();
            const errorMessage = JSON.parse(body).message;
            console.error(
              `Error: locale file [${locale.locale_id}.json] error message: ${errorMessage}`.red.bold,
            );
          } else {
            console.error('Error: Please check your access_token'.red.bold);
          }
          throw new Error(`HTTP ${response.status}`);
        }
      } catch (error) {
        console.error(`Failed to fetch locale ${locale.locale_id}:`, error.message);
        // Continue with next tag instead of stopping completely
      }
    }
  }
}

async function loadLocalesFromConfig () {
  // load phraseapp config
  const phrase = loadConfig();

  // make sure dir to load files into exists
  if (!fs.existsSync(phrase.path)) {
    fs.mkdirSync(phrase.path);
  }

  // Update configs from phraseapp cli
  await loadLocale(phrase);
}

loadLocalesFromConfig().catch(error => {
  console.error('Error loading locales:', error);
  process.exit(1);
});
