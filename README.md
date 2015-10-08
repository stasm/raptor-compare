raptor-compare [![Build Status][travisimage]][travislink]
============================================================

[travisimage]: https://travis-ci.org/stasm/raptor-compare.png?branch=master
[travislink]: https://travis-ci.org/stasm/raptor-compare

Test two sets of Raptor results for statistical significance ([t-test][] with 
0.05 alpha).

[t-test]: https://en.wikipedia.org/wiki/Student%27s_t-test

    $ raptor-compare file1.json file2.json

    music.gaiamobile.org   Try 1     Try 2     Δ        Δ %  Sig?
    ---------------------  --------  --------  -------  ---  ----
    navigationLoaded        696.200   734.200   38.000  +5%      
    navigationInteractive   719.700   757.200   37.500  +5%      
    visuallyLoaded         1318.500  1228.400  -90.100  -7%  *   
    contentInteractive     1318.500  1228.600  -89.900  -7%  *   
    fullyLoaded            1458.900  1448.500  -10.400  -1%      
    pss                      23.637    23.105   -0.532  -3%      
    uss                      20.015    19.432   -0.583  -3%      
    rss                      39.804    39.247   -0.557  -2%      

In the example above, Raptor measurements for the Music app were only stable 
enough for the `visuallyLoaded` and `contentInteractive` events.  For these 
measurements it is valid to assume that the patch improved the performance by 
90 milliseconds.

The remaining results, including the apparent smaller memory footprint, are not 
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
