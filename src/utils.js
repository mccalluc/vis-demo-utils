/*
 See notes in index.html: Production
 deployment will need to do the same things,
 but will probably do them differently.
 */

(function () {
  window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    alert(errorMsg
        + '\n\n' + url
        + ' (' + lineNumber + ':' + column + ')');
  };

  requirejs.config({
    "baseUrl": "src"
  });

  requirejs.default_paths = function (defaults) {
    /*
     In production environments, better to have dependencies checked in,
     but in development easier to rely on defaults from free CDNs.
     */
    var configured = requirejs.s.contexts._.config.paths; // No public API. :(
    for (key in defaults) {
      if (!configured[key]) {
        var paths = {};
        paths[key] = defaults[key];
        requirejs.config({
          paths: paths
        });
      }
    }
  };

  function parse_query() {
    // From http://stackoverflow.com/a/8486188
    var query = location.search.substr(1).replace('%5B', '[').replace('%5D', ']');
    var result = {};
    query.split("&").forEach(function (part) {
      if (!part) return;
      part = part.split("+").join(" ");
      var eq = part.indexOf("=");
      var key = eq > -1 ? part.substr(0, eq) : part;
      var val = eq > -1 ? decodeURIComponent(part.substr(eq + 1)) : "";
      var from = key.indexOf("[");
      if (from == -1) result[decodeURIComponent(key)] = val;
      else {
        var to = key.indexOf("]");
        var index = decodeURIComponent(key.substring(from + 1, to));
        key = decodeURIComponent(key.substring(0, from));
        if (!result[key]) result[key] = [];
        if (!index) result[key].push(val);
        else result[key][index] = val;
      }
    });
    return result;
  }

  require([], function () {
    var query = parse_query(window.location.search);
    var vis = query.vis;
    if (!vis) {
      throw new Error('"vis" parameter is missing');
    } else if (vis.match(/\W/)) {
      throw new Error('"vis" parameter contains weird characters');
    } else {
      require([vis], function (vis) {
        vis(query);
      });
    }
  });
})();
