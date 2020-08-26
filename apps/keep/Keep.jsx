import { keepService } from './service/keep-service.js';
import { NoteText } from './cmps/NoteText.jsx'
import { NoteImg } from './cmps/NoteImg.jsx'
import { NoteTodos } from './cmps/NoteTodos.jsx'

function DynamicCmp(props) {
    const { id } = props;
    switch (props.type) {
        case 'NoteText':
            return <NoteText key={id} {...props} />
        case 'NoteImg':
            return <NoteImg key={id} {...props} />
        case 'NoteTodos':
            return <NoteTodos key={id} {...props} />
        default:
            return <h1 key={id}>Something went wrong with note {id}</h1>
    }
}

export default class Keep extends React.Component {

    state = {
        notes: null,
        noteAddVal: ''
    }

    componentDidMount() {
        keepService.getNotes()
            .then(res => this.setState({notes: res}))
    }

    renderNotes() {
        const notes = this.state.notes;
        return notes.map(note => DynamicCmp(note))
    }

    addNote = (ev)=>{
        ev.preventDefault();
        keepService.addNote(this.state.noteAddVal)
            .then(this.setState({noteAddVal: ''}))

    }

    onChange = (ev)=>{
        this.setState({noteAddVal: ev.target.value});
    }

    render() {
        const { notes, noteAddVal } = this.state;
        if (!notes) return <h1>Loading...</h1>
        return <div>
            <form onSubmit={this.addNote}>
                <input value={noteAddVal} onChange={this.onChange} placeholder="Take a note" type="text" />
            </form>
            <h1>Pinned notes</h1>
            <h1>Notes</h1>
            {this.renderNotes()}
        </div>
    }
}