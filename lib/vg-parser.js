'use strict';

var chalk = require('chalk'),
    argv = require('minimist')(process.argv.slice(2));

module.exports = function(err, res, body) {
    if (err && res.statusCode !== 200) {
        console.log(err);

        return;
    }

    JSON.parse(body).some(function(item, key) {
        if (key !== 0) {
            console.log('\n');
        }

        if (argv.l && +argv.l === key) {
            return true;
        }

        console.log(chalk.bold(item.title));
        console.log(chalk.dim(item.published.niceformat + ' - ' + item.persistentUrl));
        console.log(item.preamble);
    });
};
