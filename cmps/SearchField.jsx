import { SearchIcon } from './Icons.jsx';
import eventBus from '../service/event-bus-service.js';

export function SearchField(props) {
    return <div className="aps-search rounded aps-box-shadow-big">
        <SearchIcon />
        <input onChange={(event) => eventBus.emit(props.event, event.target.value)} placeholder={props.placeholder} type="text" />
    </div>
}