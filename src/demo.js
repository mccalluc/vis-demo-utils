/*
 requirejs.default_paths({
   "d3": "https://cdnjs.cloudflare.com/ajax/libs/d3/4.4.0/d3.min"
 });
 */
define([/* List dependencies here as strings. */],
    function (/* Dependencies are instantiated here. */) {
      return function (query) {
        /* Generate your visualization here */
        var body = document.getElementsByTagName('body')[0];
        var child = document.createTextNode(JSON.stringify(query));
        body.appendChild(child);
      };
    });
