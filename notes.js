const fs = require('fs');
const chalk = require('chalk');

// Loads the notes from the JSON file and parses it into an array of objects.
const loadNotes = () => {

    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return []
    }
}

//Converts the array of objects into JSON and saves it to the JSON file.
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

//Adds a note to the JSON file.
const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        console.log(chalk.green.inverse('New Note Added!'));
        saveNotes(notes);
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

//Removes a note from the JSON file.
const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title);

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note Removed!'));
        saveNotes(notesToKeep);
    } else {
        console.log(chalk.red.inverse('No Note Found!'));
    }
}

//Lists all the notes.
const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse('Your notes'))

    notes.forEach((note) => {
        console.log(note.title);
    })
}

//Prints out the title and body of a note.
const readNote = (title) => {

    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);

    if (note) {
        console.log(chalk.inverse(note.title));
        console.log(note.body);
    } else {
        console.log(chalk.red.inverse('Note Not Found!'));
    }
}

// Exports the functions into the app.js file.
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}