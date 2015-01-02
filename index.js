'use strict';

var request = require('request'),
    vgParser = require('./lib/vg-parser');

request({
    uri: 'http://www.vg.no/rss/feed/?format=json',
    method: 'GET',
    timeout: 2500
}, vgParser);
