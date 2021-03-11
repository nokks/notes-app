const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

yargs.version('1.1.0')

//create a command add, remove, read, list
yargs.command({
    command: 'add',
    describe: 'Add a note',
    builder: {                                     //command options
        title: {
            describe: 'Note title',
            demandOption: true, 
            type: 'string'                         // required or not 
        },
        body: {
            describe: 'Note body', 
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {                     // pass in argv to define the builder options
       return notes.addNote(argv.title, argv.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {                                     //command options
        title: {
            describe: 'Note title',
            demandOption: true, 
            type: 'string'                     // required or not 
        }
    },
    handler(argv) {
       return notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {                                     //command options
        title: {
            describe: 'Note title',
            demandOption: true, 
            type: 'string'                     // required or not 
        }
    },
    handler(argv) {
       return notes.readNotes(argv.title)
    }
})

yargs.command({
    command: 'list',
    describe: 'List notes',
    handler() {
        return notes.listNotes()
    }
})

yargs.parse()    //same as console.log(yargs.argv)
