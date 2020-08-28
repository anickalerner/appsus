import {TextIcon,ImageIcon, TodoListIcon, YoutubeIcon,ReminderIcon, ArchiveIcon } from '../../../cmps/Icons.jsx';

export function NoteIcons(props){
    const {type, label} = props
    return <div className="note-icon">
        {type === 'NoteText' && <TextIcon />}
        {type === 'NoteImg' && <ImageIcon />}
        {type === 'NoteTodos' && <TodoListIcon />}
        {type === 'NoteVideo' && <YoutubeIcon />}
        {label === 'Archive' && <ArchiveIcon />}
        {label === 'Reminder' && <ReminderIcon />}
    </div>
}


{/* <div className="note-icon">
<TextIcon />
{info.label === 'Archive' && <ArchiveIcon />}
</div> */}