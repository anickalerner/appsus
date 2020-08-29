import {SearchIcon} from '../../../cmps/Icons.jsx';
import eventBus from '../../../service/event-bus-service.js';

export function NoteSearch(props){
    return <div className="note-search rounded aps-box-shadow-big">
        <SearchIcon />
        <input onChange={(event)=> eventBus.emit('search-note', event.target.value)} placeholder="search for a note" type="text"/>
    </div>
}