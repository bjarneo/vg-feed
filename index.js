'use strict';

var chalk = require('chalk'),
    argv = require('minimist')(process.argv.slice(2)),
    request = require('request');

if (argv.h) {
    console.log('-l limit. Example: vgfeed -l 5.');

    return;
}

request({
    uri: 'http://www.vg.no/rss/feed/?format=json',
    method: 'GET',
    timeout: 2500
}, function(err, res, body) {
    if (err && res.statusCode !== 200) {
        console.log(err);

        return;
    }

    var VGfeed = JSON.parse(body);

    VGfeed.reverse().some(function(item, key) {
        if (key !== 0) {
            console.log('\n');
        }

        if (argv.l && +argv.l === key) {
            return true;
        }

        console.log(chalk.bold(item.title));
        console.log(chalk.dim(item.published.niceformat));
        console.log(item.preamble);
    });
});
