/*
 * biojs-vis-blast
 * https://github.com/xwatkins/biojs-vis-blast
 *
 * Copyright (c) 2014 Xavier Watkins
 * Licensed under the Apache 2 license.
 */

// chai is an assertion library
var chai = require('chai');

// @see http://chaijs.com/api/assert/
var assert = chai.assert;

// register alternative styles
// @see http://chaijs.com/api/bdd/
chai.expect();
chai.should();

// requires your main app (specified in index.js)
var biojsvisblast = require('../..');

describe('biojs-vis-blast module', function(){
  describe('#readBlast()', function(){
    it('should return a json object', function(){

      assert.equal(biojsvisblast.readBlast('../blast_results.xml'), ("hello biojs"));
      
      // alternative styles
      // biojsvisblast.hello('biojs').should.equal("hello biojs");
    });
  });
});
