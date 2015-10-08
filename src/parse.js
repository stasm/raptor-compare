'use strict';

exports.parse = function(json) {
  var measurements = {};
  for (var origin in json) {
    measurements[origin] = json[origin].reduce(extractValues, {});
  }
  return measurements;
};

function extractValues(seq, cur) {
  return Object.assign(seq, {
    [cur.Metric]: cur.Values
  });
}
