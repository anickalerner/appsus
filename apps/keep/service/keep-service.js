import { storageService } from '../../../service/storage-service.js';
import { youtubeService } from './youtube-service.js';
import { utilService } from '../../../service/util-service.js';

export const keepService = {
    loadNotes,
    getNotes,
    addNote,
    removeNote,
    updateNote
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
                title: 'first comment',
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
                title: "How was it:",
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
    notes.forEach(note => note.info.isPinned ? pinned.push(note) : notPinned.push(note));
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
        info: {
            isPinned: true,
            txt: noteVal
        }
    }
}

function createImgNote(noteVal) {
    return {
        id: utilService.makeId(),
        type: "NoteImg",
        info: {
            isPinned: false,
            url: noteVal,
            title: null
        },
        style: {
            backgroundColor: "#00d"
        }
    }
}

function createVideoNote(noteVal) {
    youtubeService.getSearchResult(noteVal)
        .then(res => console.log(res))

    return {
        id: utilService.makeId(),
        type: "NoteVideo",
        info: {
            isPinned: false,
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
        info: {
            isPinned: false,
            label: "How was it:",
            todos: [
                { txt: noteVal, doneAt: null },

            ]
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