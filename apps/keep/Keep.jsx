import { keepService } from './service/keep-service.js';
import { NoteList } from './cmps/NoteList.jsx';
import { LeftBar } from './cmps/LeftBar.jsx';
import { AddNote } from './cmps/AddNote.jsx';



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
        return notes.map(note => DynamicCmp(note));
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
                    <NoteList notes={notes} />
                </div>
            </section>
        </div>
    }
}