'use strict';

const newOrigin = () => new Map();
const newSeries = (rev) => new Map([['rev', rev], ['data', new Map()]]);
const newValues = () => [];

function get(map, key, def) {
  if (map.has(key)) {
    return map.get(key);
  }

  const val = def();
  map.set(key, val);
  return val;
}

function parse(results, point) {
  const origin = get(
    results, point.tags.context, newOrigin);
  const series = get(
    origin, point.timestamp.slice(0, point.timestamp.length - 6),
    () => newSeries(point.tags.revisionId));
  const values = get(
    series.get('data'), point.tags.metric, newValues);

  values.push(point.fields.value);
  return results;
}

module.exports = function(data) {
  return data.reduce(parse, new Map());
};
