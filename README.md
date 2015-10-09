raptor-compare [![Build Status][travisimage]][travislink]
============================================================

[travisimage]: https://travis-ci.org/stasm/raptor-compare.png?branch=master
[travislink]: https://travis-ci.org/stasm/raptor-compare

Compare sets of Raptor results and test for their statistical significance 
([t-test][] with 0.05 alpha).

[t-test]: https://en.wikipedia.org/wiki/Student%27s_t-test

    $ raptor-compare my_test.ldjson

    music.gaiamobile.org   base: 370b  1: 55f6  1: delta  1: p-value
    ---------------------  ----------  -------  --------  ----------
    navigationLoaded              711      726        14        0.06
    navigationInteractive         737      748        12        0.10
    visuallyLoaded               1322     1217      -105      * 0.00
    contentInteractive           1323     1217      -105      * 0.00
    fullyLoaded                  1462     1442       -20        0.14
    uss                        19.881   20.370     0.489      * 0.00
    pss                        23.468   23.981     0.513      * 0.00
    rss                        39.640   40.152     0.512      * 0.00

In the example above, Raptor measurements for the Music app were stable for the 
`visuallyLoaded` and `contentInteractive` events, as indicated by the asterisks 
next to the p-values.  At the same time, we can see that the memory footprint 
has regressed: the mean `uss` usage is higher than the base measurement and the 
difference is statistically significant as well.

For all measurements marked with the asterisk (`*`) it is valid to assume that 
the means are indeed significantly different between the base and the try runs.

The remaining results, e.g. the 20 ms `fullyLoaded` speed-up, are not 
significant and might be caused by a random instability of the data.  Try 
increasing the sample size (via Raptor's `--runs` option; see below) and run 
Raptor again.


What is p-value?
----------------

The p-value is a concept used in statistical testing which represents our 
willingness to make mistakes about the data.  A low p-value means that there's 
only a small risk of making a mistake by concluding that the test data 
indicates that the means are truly different and that the observed differences 
are not due to poor sampling and randomness.

For the data above, a p-value of 0.14 for `fullyLoaded` means that the risk of 
being wrong is 14% when we conclude that the 20 ms difference between the means 
is due to an actual code change and not to randomness.

Good p-values are below 0.05.


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

Then, run the desired perf test:

    $ raptor test coldlaunch --runs 30 --app music --metrics my_test.ldjson

Raptor will print the output to `stdout`.  The raw data will be saved in the 
`ldjson` file specified in the `--metrics` option.  The data is appended so you 
can runmultiple tests for different revisions and apps and `raptor-compare` 
will figure out how to handle it.  All testing is conducted relative to the 
first result set for the given app.

[Raptor]: https://developer.mozilla.org/en-US/Firefox_OS/Automated_testing/Raptor


Running tests
-------------

Install [gulp][] with `npm install -g gulp` and run:

    gulp test

[gulp]: http://gulpjs.com/
