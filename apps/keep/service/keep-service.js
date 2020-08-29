import { storageService } from '../../../service/storage-service.js';
import { utilService } from '../../../service/util-service.js';

export const keepService = {
    getNotes,
    addNote,
    removeNote,
    updateNote,
    pinNote,
    mailToNote
}

loadNotes();

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
                title: 'Don\'t forget!',
                content: "You need to feed the cat!",
                backgroundColor: "#fefefe"
            }
        },
        {
            id: utilService.makeId(),
            type: "NoteImg",
            isPinned: false,
            info: {
                label: 'Archive',
                content: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI0MX0&w=1000&q=80",
                title: "I should visit this place someday",
                backgroundColor: "#7bb2b2"
            }
        },
        {
            id: utilService.makeId(),
            type: "NoteTodos",
            isPinned: false,
            info: {
                label: 'None',
                title: "How was it:",
                todos: [
                    { content: "Do the laundry", doneAt: null },
                    { content: "Pet the cat.\n A lot.", doneAt: null },
                    { content: "Buy groceries", doneAt: 187111111 }
                ],
                backgroundColor: "#b27bb2"
            }
        }, {
            id: utilService.makeId(),
            isPinned: false,
            type: "NoteVideo",
            info: {
                label: '',
                content: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                title: 'You just got rick rolled',
                backgroundColor: "#b2b27b"
            }
        }

    ];
}

function getNotes({ label = 'None', search }) {
    const pinned = [];
    const notPinned = [];
    notes.forEach(note => {
        if (note.info.label.toLowerCase() !== label && label !== 'None') return;
        if (note.type === 'NoteTodos') {
            if (note.info.todos.every(note => !note.content.includes(search))) return;
        } else if (!note.info.content.includes(search) && !note.info.title.includes(search)) return;
        note.isPinned ? pinned.push(note) : notPinned.push(note);
    });
    console.log('getting notes...');
    return Promise.resolve({ pinned, notPinned });
}

function addNote(NoteVal, noteType) {
    const typeMap = {
        txt: createTextNote,
        img: createImgNote,
        todo: createTodoNote,
        video: createVideoNote,
        audio: createAudioNote
    }

    notes.push(typeMap[noteType](NoteVal));
    saveNotes();
    return Promise.resolve('added');
}

function createTextNote(noteVal) {
    return {
        id: utilService.makeId(),
        type: 'NoteText',
        isPinned: false,
        info: {
            label: 'None',
            content: noteVal,
            title: 'Note:',
            backgroundColor: '#fefefe'
        }
    }
}

function createImgNote(noteVal) {
    return {
        id: utilService.makeId(),
        type: "NoteImg",
        isPinned: false,
        info: {
            label: 'None',
            content: noteVal,
            title: 'Image',
            backgroundColor: "#7bb2b2"
        }
    }
}

function createAudioNote(noteVal) {
    return {
        id: utilService.makeId(),
        type: "NoteAudio",
        isPinned: false,
        info: {
            label: '',
            content: noteVal,
            title: 'Audio',
            backgroundColor: "#77bb7b"
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
            content: noteVal,
            title: 'Video',
            backgroundColor: "#b2b27b"
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
            title: "Todos:",
            todos: [
                { content: noteVal, doneAt: null },

            ],
            backgroundColor: "#b27bb2"
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

function mailToNote(content, title) {
    console.log('converting to note...');
    notes.push({
        id: utilService.makeId(),
        type: 'NoteText',
        isPinned: false,
        info: {
            label: 'None',
            content,
            title,
            backgroundColor: '#fefefe'
        }
    })
    saveNotes();
    return Promise.resolve('added mail as note');
}