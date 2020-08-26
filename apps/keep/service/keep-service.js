import { storageService } from '../../../service/storage-service.js';
import { utilService } from '../../../service/util-service.js';

export const keepService = {
    getNotes,
    addNote,
    removeNote
}

var notes;
loadNotes();

function loadNotes() {
    notes = storageService.loadFromStorage('-KEEP');
    console.log(notes);
    if (!notes || notes === []) initNotes();
}

function saveNotes() {
    storageService.saveToStorage('-KEEP', notes);
}

function initNotes() {
    notes = [{
            id: utilService.makeId(),
            type: "NoteText",
            isPinned: true,
            info: {
                txt: "Fullstack Me Baby!"
            }
        },
        {
            id: utilService.makeId(),
            type: "NoteImg",
            isPinned: false,
            info: {
                url: "https://i.kym-cdn.com/entries/icons/facebook/000/015/559/It_Was_Me__Dio!.jpg",
                title: "Me playing Mi"
            },
            style: {
                backgroundColor: "#00d"
            }
        },
        {
            id: utilService.makeId(),
            type: "NoteTodos",
            isPinned: false,
            info: {
                label: "How was it:",
                todos: [
                    { txt: "Do that", doneAt: null },
                    { txt: "Do this", doneAt: 187111111 }
                ]
            }
        }
    ];
}

function getNotes() {
    const pinned = [];
    const notPinned = [];
    notes.forEach(note => note.isPinned ? pinned.push(note) : notPinned.push(note));
    console.log(pinned);
    return Promise.resolve({ pinned, notPinned });
}

function addNote(NoteVal, noteType) {
    console.log(noteType);
    const typeMap = {
        txt: createTxtNote,
        img: createImgNote,
        todo: createTodoNote
    }

    notes.push(typeMap[noteType](NoteVal));
    saveNotes();
    return Promise.resolve('added');
}

function createTxtNote(noteVal) {
    return {
        id: utilService.makeId(),
        type: 'NoteText',
        isPinned: true,
        info: {
            txt: noteVal
        }
    }
}

function createImgNote(noteVal) {
    return {
        id: utilService.makeId(),
        type: "NoteImg",
        isPinned: false,
        info: {
            url: noteVal,
            title: null
        },
        style: {
            backgroundColor: "#00d"
        }
    }
}

function createTodoNote(noteVal) {
    return {
        id: utilService.makeId(),
        type: "NoteTodos",
        isPinned: false,
        info: {
            label: "How was it:",
            todos: [
                { txt: noteVal, doneAt: null },

            ]
        }
    }
}

function removeNote(noteId) {
    notes = notes.filter(note => note.id !== noteId);
    saveNotes();
    return Promise.resolve();
}