'use strict';

const ndjson = require('ndjson');

function mem2mb(point) {
  if (point.key === 'memory') {
    point.fields.value = point.fields.value / 1024 / 1024;
  }
  return point;
}

module.exports = function(stream) {
  return new Promise((resolve, reject) => {
    let data = [];
    stream
      .pipe(ndjson.parse())
      .on('data', function(chunk) {
        data = data.concat(
          chunk.filter(
            point => ['measure', 'memory'].includes(point.key)).map(
            point => mem2mb(point)));
      })
      .on('end', () => resolve(data))
      .on('error', reject);
  });
};
