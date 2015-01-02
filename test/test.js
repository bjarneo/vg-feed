'use strict';

describe('VGParser', function() {
    var expect = require('chai').expect,
        vgParser = require('../lib/vg-parser'),
        err = 'SyntaxError: Unexpected token <',
        res = { statusCode: 200 },
        logs = [];

    var json = [{
        title: 'title ftw',
        published: {
            niceformat: '02.01.2015, 13:37'
        },
        persistentUrl: 'http://iampersistent.no/123/',
        preamble: 'Imma long text'
    }];

    json = JSON.stringify(json);

    // Should do it like this: http://stackoverflow.com/a/9624028
    global.console.log = function(input) {
        logs.push(input);
    };

    it('Should iterate through json result and print the result', function() {
        vgParser(null, res, json);

        expect(String(logs[0])).to.be.equal('\u001b[1mtitle ftw\u001b[22m');

        expect(logs[1]).to.be.equal('\u001b[2m02.01.2015, 13:37 - http://iampersistent.no/123/\u001b[22m');

        expect(logs[2]).to.be.equal('Imma long text');
    });

    it('Should return error on wrong status code', function() {
        logs = [];

        res.statusCode = 500;

        vgParser(err, res, json);

        expect(logs[0]).to.be.equal('SyntaxError: Unexpected token <');
    });
});
