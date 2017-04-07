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

You have to use the ```.phraseapp.yml``` to store repeating command line arguments like [phraseapp-config]

**For example**:
```yaml
phraseapp:
  access_token: YOUR_ACCESS_TOKEN
  project_id: YOUR_PROJECT_ID
  ```

## Usage

```js
phraseapp-cli locale tag
```

## Parameters
 - locale (**required**) - for example **pl_PL**
 - tag (*optional*) - project tag


## License

Apache-2.0 © [kununu](https://kununu.com)


[npm-image]: https://badge.fury.io/js/kununu.svg
[npm-url]: https://npmjs.org/package/kununu
[phraseapp-config]: https://phraseapp.com/docs/developers/cli/configuration/
