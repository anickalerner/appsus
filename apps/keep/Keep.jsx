import { keepService } from './service/keep-service.js';
import { NoteText } from './cmps/NoteText.jsx';
import { NoteImg } from './cmps/NoteImg.jsx';
import { NoteTodos } from './cmps/NoteTodos.jsx';
import { LeftBar } from './cmps/LeftBar.jsx';
import { AddNote } from './cmps/AddNote.jsx';

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
        notes: null
    }

    componentDidMount() {
        keepService.getNotes()
            .then(res => this.setState({ notes: res }))
    }

    renderNotes() {
        const notes = this.state.notes;
        return notes.map(note => DynamicCmp(note))
    }

    addNote = (noteVal, noteType, ev) => {
        ev.preventDefault();
        keepService.addNote(noteVal, noteType)
            .then(this.setState({ noteAddVal: '' }))
    }

    render() {
        const { notes } = this.state;
        if (!notes) return <h1>Loading...</h1>
        return <div className="keep-container">
            <LeftBar />
            <section className="keep-content">
                <AddNote addNote={this.addNote} />
                    <h1>Pinned notes</h1>
                    <h1>Notes</h1>
                <div className="note-list">
                    {this.renderNotes()}
                </div>
            </section>
        </div>
    }
}