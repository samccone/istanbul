var path = require('path');
var fs = require('fs');
var MemoryStore = require('./lib/store/memory');
var HtmlReporter = require('./lib/report/html');

var dump = JSON.parse(fs.readFileSync(path.resolve(__dirname, process.argv[2]), 'utf8'));
var originals = JSON.parse(dump.originals)
var srcStore = new MemoryStore();

Object.keys(originals).forEach(function(key) {
  srcStore.set(key, new Buffer(originals[key], 'base64').toString());
});

// TODO https://github.com/gotwarlost/istanbul/blob/master/lib/collector.js

HtmlReporter({
  sourceStore: srcStore
})

//sourceStore = Store.create('memory');




/*reporter_instances = HtmlReporter({
  sourceStore:
})
*/


