#! /usr/bin/env node

/* eslint-disable no-console */

const fs = require('fs');

const request = require('request');
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

function getPhraseAppQueryParams (tag, fallbackLocale) {
  const queryParams = {
    file_format: 'react_simple_json',
    tag,
  };

  if (fallbackLocale) {
    queryParams.include_empty_translations = 'true';
    queryParams.fallback_locale_id = fallbackLocale;
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
      await new Promise((resolve, reject) => {
        const url = `https://${
          phrase.access_token
        }@api.phraseapp.com/api/v2/projects/${phrase.project_id}/locales/${
          locale.locale_id
        }/download?${getPhraseAppQueryParams(tag, locale.fallback_locale_id)}`;
        request.get(url, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            fs.writeFileSync(
              filepath,
              JSON.stringify(Object.assign(file, JSON.parse(body)), null, '\t'),
            );
            console.info(
              `Success: locale file [${locale.locale_id}.json]${
                tag ? ` for tag ${tag} ` : ' '
              }was updated`.green.bold,
            );
            resolve();
          } else {
            if (response.statusCode !== 401) {
              console.error(
                `Error: locale file [${locale.locale_id}.json] error message: ${
                  JSON.parse(body).message
                }`.red.bold,
              );
            } else {
              console.error('Error: Please check your access_token'.red.bold);
            }
            reject(response);
          }
        });
      });
    }
  }
}

function loadLocalesFromConfig () {
  // load phraseapp config
  const phrase = loadConfig();

  // make sure dir to load files into exists
  if (!fs.existsSync(phrase.path)) {
    fs.mkdirSync(phrase.path);
  }

  // Update configs from phraseapp cli
  loadLocale(phrase);
}

loadLocalesFromConfig();
