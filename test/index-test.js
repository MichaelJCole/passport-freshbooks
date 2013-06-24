var vows = require('vows');
var assert = require('assert');
var util = require('util');
var linkedin = require('passport-freshbooks');


vows.describe('passport-freshbooks').addBatch({
  
  'module': {
    'should report a version': function (x) {
      assert.isString(linkedin.version);
    },
  },
  
}).export(module);
