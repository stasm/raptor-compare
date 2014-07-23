'use strict';

/* global suite, suiteSetup, test */

var path = require('path');
var assert = require('assert');
var tps = require('../src/tps.js');
var table = require('../src/table.js');

suite('Summary builder', function() {
  var results;

  suiteSetup(function(done) {
    var argv = {
      _: [
        path.join(__dirname, 'fixtures', 'output1.json')
      ]
    };
    tps.execute(argv, function(delta, res) {
      results = res;
      done();
    });
  });

  test('App has data', function() {
    var expected = [
      {
        settings: 'moz-chrome-dom-loaded',
        Median: 831.4085675000006,
        Mean: 833.536562366667,
        Stdev: 49.081443903395964
      },
      {
        settings: 'moz-chrome-interactive',
        Median: 831.9054425000004,
        Mean: 834.1399790333336,
        Stdev: 49.20451948142454
      },
      {
        settings: 'moz-app-visually-complete',
        Median: 3619.2469790000014,
        Mean: 3878.4005721666667,
        Stdev: 1724.629788401915
      },
      {
        settings: 'moz-content-interactive',
        Median: 3619.8280460000015,
        Mean: 3878.9074489333334,
        Stdev: 1724.5999488712844
      },
      {
        settings: 'moz-app-loaded',
        Median: 5141.777265000001,
        Mean: 5742.317133666667,
        Stdev: 1761.3994475254142 
      }
    ];
    var t = table.summary('settings', results[0].settings);
    expected.forEach(function(ref, i) {
      assert.deepEqual(t.rows[i], ref);
    });
  });

  test('App does not have data', function() {
    var expected = [
      {
        clock: 'moz-chrome-dom-loaded',
        Median: '—',
        Mean: '—',
        Stdev: '—'
      },
      {
        clock: 'moz-chrome-interactive',
        Median: '—',
        Mean: '—',
        Stdev: '—'
      },
      {
        clock: 'moz-app-visually-complete',
        Median: '—',
        Mean: '—',
        Stdev: '—'
      },
      {
        clock: 'moz-content-interactive',
        Median: '—',
        Mean: '—',
        Stdev: '—'
      },
      {
        clock: 'moz-app-loaded',
        Median: '—',
        Mean: '—',
        Stdev: '—'
      }
    ];
    var t = table.summary('clock', results[0].clock);
    expected.forEach(function(ref, i) {
      assert.deepEqual(t.rows[i], ref);
    });
  });

});
