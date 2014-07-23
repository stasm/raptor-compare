test-perf-summary [![Build Status][travisimage]][travislink]
============================================================

[travisimage]: https://travis-ci.org/stasm/test-perf-summary.png?branch=master
[travislink]: https://travis-ci.org/stasm/test-perf-summary

Pretty-print the results of Gaia's make test-perf.


Summary mode
------------

The summary mode prints basic descriptive statistics like media, mean and 
standard deviation in a table.

    $ test-perf-summary file1.json

    settings                   Median  Mean  Stdev
    -------------------------  ------  ----  -----
    moz-chrome-dom-loaded         831   834     49
    moz-chrome-interactive        832   834     49
    moz-app-visually-complete    3619  3878   1725
    moz-content-interactive      3620  3879   1725
    moz-app-loaded               5142  5742   1761



Delta mode
----------

The delta mode computes the differences between two runs of Gaia's `test-perf` 
and tests them for statistical significance ([t-test][] with 0.05 alpha).

[t-test]: https://en.wikipedia.org/wiki/Student%27s_t-test

    $ test-perf-summary file1.json file2.json

    settings (means in ms)     Base  Patch  Δ     Sig?
    -------------------------  ----  -----  ----  ----
    moz-chrome-dom-loaded       834    803   -30  *   
    moz-chrome-interactive      834    804   -30  *   
    moz-app-visually-complete  3878   3745  -133      
    moz-content-interactive    3879   3746  -133      
    moz-app-loaded             5742   5715   -27      

In the example above, the `test-perf` measurements for the Settings app were 
only stable enough for the `moz-chrome-dom-loaded` and `moz-chrome-interactive` 
events.  For these measurements it is valid to assume that the patch improved 
the performance by 30 milliseconds.

The remaining results, including the apparent 133 ms speed-up, are not 
significant and might be due to a random instability of the data.


Installation
------------

    npm install -g test-perf-summary


Running Gaia perf tests
-----------------------

For best results, follow the [Gaia performance tests][] guide on MDN.  Connect 
your device to the computer and make sure you export the following variable (I 
use a `local.mk` file):

    MARIONETTE_RUNNER_HOST=marionette-device-host

Then, run `test-perf`:

    $ APPS="settings sms" MOZPERFOUT=file1.json make test-perf

[Gaia performance tests]: https://developer.mozilla.org/en-US/Firefox_OS/Platform/Automated_testing/Gaia_performance_tests


Running tests
-------------

Install [gulp][] with `npm install -g gulp` and run:

    gulp test

[gulp]: http://gulpjs.com/
