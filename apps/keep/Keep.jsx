//import BookApp from 'BookApp.jsx'
import {keepService} from './service/keep-service.js';
import {NoteText} from './cmps/NoteText.jsx'
import {NoteImg} from './cmps/NoteImg.jsx'
import {NoteTodos} from './cmps/NoteTodos.jsx'

function DynamicCmp(props) {
    switch (props.type) {
        case 'NoteText':
            return <NoteText key={props.id} { ...props } />
        case 'NoteImg':
            return <NoteImg key={props.id} { ...props } />
        case 'NoteTodos':
            return <NoteTodos key={props.id} { ...props } />
        default:
            return <h1>Something went wrong</h1>
    }
}

export default class Keep extends React.Component {

    state = {
        noteType: 'NoteImg',

    }


    componentDidMount() {
        const notes = keepService.getNotes();
        this.setState({notes})
    }

    renderNotes(){
        const notes = this.state.notes;
        return notes.map(note => DynamicCmp(note))
    }

    render() {
        const {noteType, notes} = this.state;
        console.log(notes);
        if(!notes) return <h1>Loading...</h1>
    return <div>
        {this.renderNotes()}
        </div>
    }
}