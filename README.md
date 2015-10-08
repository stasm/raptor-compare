raptor-compare [![Build Status][travisimage]][travislink]
============================================================

[travisimage]: https://travis-ci.org/stasm/raptor-compare.png?branch=master
[travislink]: https://travis-ci.org/stasm/raptor-compare

Test two sets of Raptor results for statistical significance ([t-test][] with 
0.05 alpha).

[t-test]: https://en.wikipedia.org/wiki/Student%27s_t-test

    $ raptor-compare file1.json file2.json

    settings (means in ms)     Base  Patch  Δ     Sig?
    -------------------------  ----  -----  ----  ----
    moz-chrome-dom-loaded       834    803   -30  *   
    moz-chrome-interactive      834    804   -30  *   
    moz-app-visually-complete  3878   3745  -133      
    moz-content-interactive    3879   3746  -133      
    moz-app-loaded             5742   5715   -27      

In the example above, Raptor measurements for the Settings app were 
only stable enough for the `moz-chrome-dom-loaded` and `moz-chrome-interactive` 
events.  For these measurements it is valid to assume that the patch improved 
the performance by 30 milliseconds.

The remaining results, including the apparent 133 ms speed-up, are not 
significant and might be caused by a random instability of the data.  Try 
increasing the sample size (via Raptor's `--runs` option; see below) and run 
Raptor again.


Installation
------------

    npm install -g raptor-compare


Running Raptor tests
--------------------

(For best results, follow the [Raptor][] guide on MDN.)

Install Raptor with:

    $ sudo npm install -g @mozilla/raptor

Connect your device to the computer, go into you Gaia directory and build Gaia:

    $ make raptor

Then, run the desired perf test and save the output to a JSON file:

    $ raptor test coldlaunch --runs 30 --output json --app music > file1.json

[Raptor]: https://developer.mozilla.org/en-US/Firefox_OS/Automated_testing/Raptor


Running tests
-------------

Install [gulp][] with `npm install -g gulp` and run:

    gulp test

[gulp]: http://gulpjs.com/
