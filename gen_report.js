var path = require('path');
var fs = require('fs');
var MemoryStore = require('./lib/store/memory');
var HtmlReporter = require('./lib/report/html');
var Collector = require('./lib/collector');

var dump = JSON.parse(fs.readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8'));
var originals = JSON.parse(dump.originals)
var srcStore = new MemoryStore();
var collector = new Collector();

collector.add(JSON.parse(dump.coverage));

function atob(str) {
  return new Buffer(str, 'base64').toString('binary');
}

Object.keys(originals).forEach(function(key) {
  srcStore.set(key,
      decodeURIComponent(
        escape(atob(originals[key]))));
});


var reporter = new HtmlReporter({
  sourceStore: srcStore,
  collector: collector,
  verbose: true
});

reporter.writeReport(collector, true);
