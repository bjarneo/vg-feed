'use strict';

const fetch = require('node-fetch');
const chalk = require('chalk');
const zeroPad = require('zero-pad');
const argv = require('minimist')(process.argv.slice(2));

const log = console.log;

// Set a default limit to 5.
if (!argv.l) {
    argv.l = 5;
}

function getDate() {
    const d = new Date();

    const date = zeroPad([
        d.getDate(),
        d.getMonth() + 1,
        d.getFullYear()
    ]).join('.');

    const time = zeroPad([
        d.getHours(),
        d.getMinutes(),
        d.getSeconds()
    ]).join(':');

    return date + ' ' + time;
}

function handleResponse(item, key) {
    if (key !== 0) {
        log('\n');
    }

    if (argv.l && +argv.l === key) {
        return true;
    }

    const {
        title,
        published,
        persistentUrl,
        preamble
    } = item;

    log(' ' + chalk.bold(title));
    log(' ' + chalk.dim(published.niceformat + ' - ' + persistentUrl));
    log(' ' + preamble);
}

function header() {
    return '\n ' + chalk.white.bgRed.bold(` VG.no - https://www.vg.no - ${getDate()} `) + ' \n';
}

function footer() {
    return '\n ' + chalk.white.bgBlack.bold(' Ans. redaktør og adm. direktør: Gard Steiro ') + ' \n';
}

async function main() {
    const data = await fetch('https://www.vg.no/rss/feed/?format=json');
    const json = await data.json();

    log(header());

    json.some(handleResponse);

    log(footer());
}

try {
    main();
} catch (e) {
    console.error('Something happened. Please try again.');
    console.error(e);
}
