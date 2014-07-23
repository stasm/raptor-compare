'use strict';

exports.parse = function(json) {
  var apps = {};
  for (var i = 0, app; app = json[i]; i++) {
    var name = app.stats.application.trim();
    apps[name] = {};

    for (var j = 0, pass; pass = app.passes[j]; j++) {
      apps[name][pass.title.trim()] = pass.mozPerfDurations;
    }

  }
  return apps;
};
