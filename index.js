#! /usr/bin/env node

'use strict';

const request = require('request');
const fs = require('fs');
const yml = require('yamljs');
const colors = require('colors');

const phrase_config = process.cwd() + '/.phraseapp.yml';
const src = `./src/translations/`;
const args = process.argv;

if (!args[2]) {
    console.error('Error: please provide locale id ( for example: pl_PL ).'.red.bold);
    process.exit(1);
}

if (!fs.existsSync(phrase_config)) {
    console.error('Error: pharaseapp config file doesn\'t exist.'.red.bold);
    process.exit(1);
}

const phrase = yml.load(phrase_config).phraseapp;

let locale_id = args[2];
let tag = args[3];
let tag_uri = tag ? `&tag=${tag}` : '';
let filepath = `${src}${locale_id}.json`;
let file = {};

if (fs.existsSync(filepath)) {
    file = JSON.parse(fs.readFileSync(filepath));
}

request.get(
    `https://${phrase.access_token}@api.phraseapp.com/api/v2/projects/${phrase.project_id}/locales/${locale_id}/download?file_format=react_simple_json&${tag_uri}`,
    function(error, response, body) {
        if (!error && response.statusCode == 200) {
            fs.writeFileSync(filepath, JSON.stringify(Object.assign(file, JSON.parse(body)), null, '\t'));
            console.info(`Succes: locale file ${locale_id}.json${tag ? ` for tag ${tag} ` : ` ` }was updated`.green.bold);
        } else {
            console.error(`Error: ${JSON.parse(body).message}`.red.bold);
        }
    }
);
