import {SearchIcon} from '../../../cmps/Icons.jsx'

export function NoteSearch(props){
    const {onSearch, searchValue} = props
    return <div className="note-search rounded aps-box-shadow-big">
        <SearchIcon />
        <input onChange={onSearch} value={searchValue} placeholder="search for a note" type="text"/>
    </div>
}