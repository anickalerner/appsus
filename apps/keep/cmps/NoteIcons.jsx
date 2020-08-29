import {TextIcon,ImageIcon, TodoListIcon, YoutubeIcon,ReminderIcon, ArchiveIcon, AudioIcon } from '../../../cmps/Icons.jsx';

export function NoteIcons(props){
    const {type, label} = props
    return <div className="note-icon">
        {type === 'NoteText' && <TextIcon />}
        {type === 'NoteImg' && <ImageIcon />}
        {type === 'NoteTodos' && <TodoListIcon />}
        {type === 'NoteVideo' && <YoutubeIcon />}
        {type === 'NoteAudio' && <AudioIcon />}
        {label === 'Archive' && <ArchiveIcon />}
        {label === 'Reminder' && <ReminderIcon />}
    </div>
}

