const {test} = require('ava');
const api = require('../src/helpers/api');

test('Will generate valid request opt for endpoint', t => {
  const f = api.endpoint('mahendpoint', 'mahtoken');

  t.deepEqual(f, {
    json: true,
    url: 'https://mahtoken@api.phraseapp.com/api/v2/mahendpoint'
  });
});
