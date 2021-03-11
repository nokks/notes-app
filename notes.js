const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your notes'
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
        notes.push ({
            title: title, 
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('Notes added'))
    } else {
        console.log(chalk.red.inverse('Cannot add duplicate'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter(function (note) {
        return note.title !== title
    })

    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse("Notes removed"))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse("No note found"))
    }      
}

const listNotes =  () => {
    console.log(chalk.yellow.inverse("Your notes"))
    const notes = loadNotes()
    const logTitles = (note) => notes.forEach(note => console.log(note.title))
    logTitles()
}

const readNotes = (title) => {
    const notes = loadNotes()
    const findNote =  notes.find((note) => note.title === title)
    
    if (findNote) {
        console.log(findNote)
    } else {
        console.log(chalk.blue.inverse("Note not found"))
    }
}


const saveNotes = (notes) => {
    const notesJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJson)
}

const loadNotes = () => {
    try {
        const notesBuffer = fs.readFileSync('notes.json')
        const notesJSON =  notesBuffer.toString()
        return JSON.parse(notesJSON)

    } catch (e) {
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}