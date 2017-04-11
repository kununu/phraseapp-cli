# phraseapp-cli
> phraseapp-cli for https://phraseapp.com/

## Installation

Add to ```package.json```
```json
"phraseapp-cli": "kununu/phraseapp-cli"
```
```sh
$ npm i
```
```sh
$ npm link
```
## Configuration file

You have to use the ```.phraseapp.json``` to store repeating command line arguments like [phraseapp-config]

**For example**:
```json
{
  "access_token": "YOUR_ACCESS_TOKEN",
  "project_id": "YOUR_PROJECT_ID",
  "path": "YOUR_TRANSLATIONS_PATH",
  "locales":[
    {
      "locale_id": "pl_PL",
      "tags":[
        "TAG1",
        "TAG2",
        "TAG3"
      ]
    },
    {
      "locale_id": "en_US"
    }
  ]
}

  ```
## Config parameters
 - locale_id (**required**) - for example **pl_PL**
 - tags (*optional array*) - project tag
## Usage

```js
phraseapp-cli
```


## License

Apache-2.0 © [kununu](https://kununu.com)


[npm-image]: https://badge.fury.io/js/kununu.svg
[npm-url]: https://npmjs.org/package/kununu
[phraseapp-config]: https://phraseapp.com/docs/developers/cli/configuration/
