#! /usr/bin/env node

import Yargs from 'yargs/yargs'
import chalk from 'chalk'
import figlet from 'figlet'
import query from '../utils/query.js'
import create from '../utils/create.js'
import update from '../utils/update.js'
import remove from '../utils/delete.js'

const yargs = Yargs(process.argv.slice(2))

yargs
    .option('c', { alias: 'create', describe: 'Create a new TODO', type: 'boolean' })
    .option('l', { alias: 'list', describe: 'List all TODOs', type: 'boolean' })
    .option('u', { alias: 'update', describe: 'Update a TODO', type: 'boolean' })
    .option('d', { alias: 'delete', describe: 'Delete a TODO', type: 'boolean' })
    .help()
    .argv;

const argv = yargs.argv;

if (!argv.c && !argv.l && !argv.u && !argv.d) {
    console.log(
        chalk.blue(
            figlet.textSync('TODO!', { horizontalLayout: 'full' })
        )
    );
    yargs.showHelp()
}

if (argv.c) {
    query(create)
}
if (argv.l) {
    query()
}
if (argv.u) {
    query(update)
}
if (argv.d) {
    query(remove)
}