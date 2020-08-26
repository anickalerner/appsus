import { NoteText } from './NoteText.jsx';
import { NoteImg } from './NoteImg.jsx';
import { NoteTodos } from './NoteTodos.jsx';

function DynamicCmp(note) {
    const { id } = note;
    switch (note.type) {
        case 'NoteText':
            return <NoteText key={id} {...note} />
        case 'NoteImg':
            return <NoteImg key={id} {...note} />
        case 'NoteTodos':
            return <NoteTodos key={id} {...note} />
        default:
            return <h1 key={id}>Something went wrong with note {id}</h1>
    }
}

export function NoteList(props){
    return <div>
        {props.notes.map(note => DynamicCmp(note))}
    </div>
    
}