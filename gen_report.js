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

Object.keys(originals).forEach(function(key) {
  srcStore.set(key, new Buffer(originals[key], 'base64').toString());
});


var reporter = new HtmlReporter({
  sourceStore: srcStore,
  collector: collector,
});

reporter.writeReport(collector, true);
