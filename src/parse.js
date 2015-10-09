'use strict';

const extractValues = (seq, cur) =>
  Object.assign(
    seq, { [cur.Metric]: cur.Values });

module.exports = function(obj) {
  return Object.keys(obj).reduce(
    (seq, cur) =>
      Object.assign(
        seq, { [cur]: obj[cur].reduce(extractValues, {}) }),
    {});
};

const newmap = () => new Map();
const newarr = () => [];

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
    results, point.tags.context, newmap);
  const series = get(
    origin, point.timestamp.slice(0, point.timestamp.length - 6), newmap);
  const values = get(
    series, point.tags.metric, newarr);
  values.push(point.fields.value);
  return results;
}

module.exports = function(data) {
  return data.reduce(parse, new Map());
};
