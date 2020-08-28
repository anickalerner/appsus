import { storageService } from '../../../service/storage-service.js';
import { utilService } from '../../../service/util-service.js';

export const keepService = {
    loadNotes,
    getNotes,
    addNote,
    removeNote,
    updateNote,
    pinNote
}

var notes;

function loadNotes() {
    notes = storageService.loadFromStorage('KEEP');
    if (!notes || !notes.length) initNotes();
    return Promise.resolve();
}

function saveNotes() {
    storageService.saveToStorage('KEEP', notes);
    return Promise.resolve('saved');
}

function initNotes() {
    notes = [{
            id: utilService.makeId(),
            type: "NoteText",
            isPinned: true,
            info: {
                label: 'Reminder',
                title: 'first comment',
                txt: "Fullstack Me Baby!",
                backgroundColor: "#fefefe"
            }
        },
        {
            id: utilService.makeId(),
            type: "NoteImg",
            isPinned: false,
            info: {
                label: 'Archive',
                url: "https://i.kym-cdn.com/entries/icons/facebook/000/015/559/It_Was_Me__Dio!.jpg",
                title: "Me playing Mi",
                backgroundColor: "#fefefe"
            }
        },
        {
            id: utilService.makeId(),
            type: "NoteTodos",
            isPinned: false,
            info: {
                label: 'Archive',
                title: "How was it:",
                todos: [
                    { txt: "Do that", doneAt: null },
                    { txt: "Do this", doneAt: 187111111 }
                ],
                backgroundColor: "#fefefe"
            }
        }
    ];
}

function getNotes() {
    const pinned = [];
    const notPinned = [];
    notes.forEach(note => note.isPinned ? pinned.push(note) : notPinned.push(note));
    console.log('getting...');
    return Promise.resolve({ pinned, notPinned });
}

function addNote(NoteVal, noteType) {
    const typeMap = {
        txt: createTxtNote,
        img: createImgNote,
        todo: createTodoNote,
        video: createVideoNote
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
            label: '',
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
            label: '',
            url: noteVal,
            title: null,
            backgroundColor: "#fefefe"
        }
    }
}

function createVideoNote(noteVal) {
    noteVal = noteVal.replace('watch?v=', 'embed/');
    noteVal = noteVal.replace('&t', '?start');
    return {
        id: utilService.makeId(),
        isPinned: false,
        type: "NoteVideo",
        info: {
            label: '',
            url: noteVal,
            title: null,
            backgroundColor: "#fefefe"
        }
    }
}

function createTodoNote(noteVal) {
    return {
        id: utilService.makeId(),
        isPinned: false,
        type: "NoteTodos",
        info: {
            label: '',
            title: "How was it:",
            todos: [
                { txt: noteVal, doneAt: null },

            ],
            backgroundColor: "#fefefe"
        }
    }
}

function removeNote(noteId) {
    notes = notes.filter(note => note.id !== noteId);
    return saveNotes();
}

function updateNote(noteId, noteInfo) {
    const noteIdx = notes.findIndex(note => note.id === noteId);
    notes[noteIdx].info = noteInfo;
    return saveNotes();
}

function pinNote(noteId) {
    const noteIdx = notes.findIndex(note => note.id === noteId);
    notes[noteIdx].isPinned = !notes[noteIdx].isPinned;
    return saveNotes();
}