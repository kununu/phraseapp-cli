#! /usr/bin/env node

'use strict';

const request = require('request');
const fs = require('fs');
const colors = require('colors');

const phrase_config = process.cwd() + '/.phraseapp.json';

if (!fs.existsSync(phrase_config)) {
    console.error('Error: pharaseapp config file doesn\'t exist.'.red.bold);
    process.exit(1);
}

let phrase;

try {
      phrase = JSON.parse(fs.readFileSync(phrase_config));
    } catch (e) {
      console.error('Error: Your pharaseapp config file is incorrect .'.red.bold);
      process.exit(1);
    }

if (!phrase.locales) {
    console.error('Error: please provide locales in config file ( for example:  locales: \'pl_PL\' ).'.red.bold);
    process.exit(1);
}

if(!phrase.access_token){
    console.error('Error: please provide access_token in config file .'.red.bold);
    process.exit(1);
}

if(!phrase.project_id){
    console.error('Error: please provide project_id in config file .'.red.bold);
    process.exit(1);
}


if (!fs.existsSync(phrase.path)) {
   fs.mkdirSync(phrase.path);
}

phrase.locales.forEach(function(locale) {

  let filepath = `${phrase.path}${locale.locale_id}.json`;
  let file = {};

  if (fs.existsSync(filepath)) {
      file = JSON.parse(fs.readFileSync(filepath));
  }

  const tags = locale.tags || [false];

  tags.forEach(function(tag){
      let tag_uri = tag ? `&tag=${tag}` : '';
      let url = `https://${phrase.access_token}@api.phraseapp.com/api/v2/projects/${phrase.project_id}/locales/${locale.locale_id}/download?file_format=react_simple_json${tag_uri}`;
      request.get(
        url,
        function(error, response, body) {
        if (!error && response.statusCode == 200) {
            fs.writeFileSync(filepath, JSON.stringify(Object.assign(file, JSON.parse(body)), null, '\t'));
            console.info(`Succes: locale file [${locale.locale_id}.json]${tag ? ` for tag ${tag} ` : ` ` }was updated`.green.bold);
        } else {
            if(response.statusCode != 401)
              console.error(`Error: locale file [${locale.locale_id}.json] error message: ${JSON.parse(body).message}`.red.bold);
            else
              console.error(`Error: Please check your access_token`.red.bold);
        }
    });
  });
});
