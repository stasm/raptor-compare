'use strict';

/* global suite, suiteSetup, test */

var path = require('path');
var assert = require('assert');
var exec = require('../src/index').exec;

suite('Delta builder', function() {
  var results;

  suiteSetup(function(done) {
    var filenames = [
      path.join(__dirname, 'fixtures', 'output1.json'),
      path.join(__dirname, 'fixtures', 'output2.json')
    ];
    exec(filenames).then(tables => {
      results = tables;
      done();
    });
  });

  test('Both apps have data', function() {
    var expected = [{
      'music.gaiamobile.org': 'navigationLoaded',
      'Try 1': 696.2,
      'Try 2': 734.2,
      'Δ': 38,
      'Δ %': 0.054582016661878764,
      'Sig?': true
    }, {
      'music.gaiamobile.org': 'navigationInteractive',
      'Try 1': 719.7,
      'Try 2': 757.2,
      'Δ': 37.5,
      'Δ %': 0.05210504376823676,
      'Sig?': true 
    }, {
      'music.gaiamobile.org': 'visuallyLoaded',
      'Try 1': 1318.5,
      'Try 2': 1228.4,
      'Δ': -90.09999999999991,
      'Δ %': -0.06833522942737953,
      'Sig?': false
    }, {
      'music.gaiamobile.org': 'contentInteractive',
      'Try 1': 1318.5,
      'Try 2': 1228.6,
      'Δ': -89.90000000000009,
      'Δ %': -0.0681835419036785,
      'Sig?': false
    }, {
      'music.gaiamobile.org': 'fullyLoaded',
      'Try 1': 1458.9,
      'Try 2': 1448.5,
      'Δ': -10.400000000000091,
      'Δ %': -0.0071286585783810336,
      'Sig?': true
    }, {
      'music.gaiamobile.org': 'pss',
      'Try 1': 23.637399999999996,
      'Try 2': 23.104900000000004,
      'Δ': -0.5324999999999918,
      'Δ %': -0.022527858393900847,
      'Sig?': true
    }, {
      'music.gaiamobile.org': 'uss',
      'Try 1': 20.0153,
      'Try 2': 19.432,
      'Δ': -0.5833000000000013,
      'Δ %': -0.029142705830040083,
      'Sig?': true
    }, {
      'music.gaiamobile.org': 'rss',
      'Try 1': 39.8039,
      'Try 2': 39.246900000000004,
      'Δ': -0.556999999999995,
      'Δ %': -0.013993603641854067,
      'Sig?': true
    }];

    expected.forEach(function(ref, i) {
      assert.deepEqual(results[0].rows[i], ref);
    });
  });

});
