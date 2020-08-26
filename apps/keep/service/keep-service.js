import { storageService } from '../../../service/storage-service.js';
import { utilService } from '../../../service/util-service.js';

export const keepService = {
    getNotes,
    addNote
}

var notes;
loadNotes();

function loadNotes() {
    notes = storageService.loadFromStorage('-KEEP');
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
    return Promise.resolve(notes);
}

function addNote(NoteVal) {
    const newNote = {
        id: utilService.makeId(),
        type: 'NoteText',
        isPinned: false,
        info: {
            txt: NoteVal
        }
    }
    notes.push(newNote);
    saveNotes();
    return Promise.resolve('added');
}