'use strict';

/* global suite, suiteSetup, test */

var path = require('path');
var assert = require('assert');
var tps = require('../src/tps.js');
var table = require('../src/table.js');

suite('Delta builder', function() {
  var results;

  suiteSetup(function(done) {
    var argv = {
      _: [
        path.join(__dirname, 'fixtures', 'output1.json'),
        path.join(__dirname, 'fixtures', 'output2.json')
      ]
    };
    tps.execute(argv, function(delta, res) {
      results = res;
      done();
    });
  });

  test('Both apps have data', function() {
    var t = table.delta('settings', results[0].settings, results[1].settings);
    assert.deepEqual(t.rows, [
      { 
        'settings (means in ms)': 'moz-chrome-dom-loaded',
        Base: 833.536562366667,
        Patch: 803.0440761333332,
        'Δ': -30.492486233333807,
        'Sig?': false 
      },
      { 
        'settings (means in ms)': 'moz-chrome-interactive',
        Base: 834.1399790333334,
        Patch: 803.7857168000003,
        'Δ': -30.35426223333309,
        'Sig?': false 
      },
      { 
        'settings (means in ms)': 'moz-app-visually-complete',
        Base: 3878.400572166667,
        Patch: 3745.1576740333335,
        'Δ': -133.2428981333337,
        'Sig?': true 
      },
      { 
        'settings (means in ms)': 'moz-content-interactive',
        Base: 3878.9074489333343,
        Patch: 3746.1781270333345,
        'Δ': -132.72932189999983,
        'Sig?': true 
      },
      { 
        'settings (means in ms)': 'moz-app-loaded',
        Base: 5742.317133666667,
        Patch: 5714.8511505666675,
        'Δ': -27.465983099999903,
        'Sig?': true 
      }
    ]);
  });

  test('1st app has data, 2nd does not', function() {
    var t = table.delta('email', results[0].email, results[1].email);
    assert.deepEqual(t.rows, [
      {
        'email (means in ms)': 'moz-chrome-dom-loaded',
        Base: 337.4005519666667,
        Patch: '—',
        'Δ': '—',
        'Sig?': '—'
      },
      {
        'email (means in ms)': 'moz-chrome-interactive',
        Base: 2002.9526091666667,
        Patch: '—',
        'Δ': '—',
        'Sig?': '—' 
      },
      {
        'email (means in ms)': 'moz-app-visually-complete',
        Base: 338.53880379999987,
        Patch: '—',
        'Δ': '—',
        'Sig?': '—' 
      },
      {
        'email (means in ms)': 'moz-content-interactive',
        Base: 2002.3504892999997,
        Patch: '—',
        'Δ': '—',
        'Sig?': '—' 
      },
      {
        'email (means in ms)': 'moz-app-loaded',
        Base: 2778.1574161666667,
        Patch: '—',
        'Δ': '—',
        'Sig?': '—'
      }
    ]);
  });

  test('1st app does not have data, 2nd does', function() {
    var t = table.delta('calendar', results[0].calendar, results[1].calendar);
    assert.deepEqual(t.rows, [
      {
        'calendar (means in ms)': 'moz-chrome-dom-loaded',
        Base: '—',
        Patch: 793.4649166333335,
        'Δ': '—',
        'Sig?': '—'
      },
      {
        'calendar (means in ms)': 'moz-chrome-interactive',
        Base: '—',
        Patch: 793.9191769,
        'Δ': '—',
        'Sig?': '—'
      },
      {
        'calendar (means in ms)': 'moz-app-visually-complete',
        Base: '—',
        Patch: 855.7066578666665,
        'Δ': '—',
        'Sig?': '—'
      },
      {
        'calendar (means in ms)': 'moz-content-interactive',
        Base: '—',
        Patch: 856.2182966000003,
        'Δ': '—',
        'Sig?': '—'
      },
      {
        'calendar (means in ms)': 'moz-app-loaded',
        Base: '—',
        Patch: 1342.2273035,
        'Δ': '—',
        'Sig?': '—'
      }
    ]);
  });

  test('Neither app has data', function() {
    var t = table.delta('clock', results[0].clock, results[1].clock);
    assert.deepEqual(t.rows, [
      { 
        'clock (means in ms)': 'moz-chrome-dom-loaded',
        Base: '—',
        Patch: '—',
        'Δ': '—',
        'Sig?': '—' 
      },
      { 
        'clock (means in ms)': 'moz-chrome-interactive',
        Base: '—',
        Patch: '—',
        'Δ': '—',
        'Sig?': '—' 
      },
      { 
        'clock (means in ms)': 'moz-app-visually-complete',
        Base: '—',
        Patch: '—',
        'Δ': '—',
        'Sig?': '—' 
      },
      { 
        'clock (means in ms)': 'moz-content-interactive',
        Base: '—',
        Patch: '—',
        'Δ': '—',
        'Sig?': '—' 
      },
      { 
        'clock (means in ms)': 'moz-app-loaded',
        Base: '—',
        Patch: '—',
        'Δ': '—',
        'Sig?': '—'
      }
    ]);
  });
});
