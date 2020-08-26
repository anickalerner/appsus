import { keepService } from './service/keep-service.js';
import { NoteList } from './cmps/NoteList.jsx';
import { LeftBar } from './cmps/LeftBar.jsx';
import { AddNote } from './cmps/AddNote.jsx';



export default class Keep extends React.Component {

    state = {
        NotPinned: null,
        pinned: null
    }

    componentDidMount() {
        this.getNotes();
    }

    getNotes(){
        keepService.getNotes()
            .then(res => this.setState(res));
    }

    renderNotes() {
        const notes = this.state.notes;
        return notes.map(note => DynamicCmp(note));
    }

    addNote = (noteVal, noteType, ev) => {
        ev.preventDefault();
        keepService.addNote(noteVal, noteType)
            .then(() =>{
                this.getNotes();
            }
                );
    }

    removeNote = (id)=>{
        keepService.removeNote(id)
            .then(this.getNotes());
    }

    render() {
        const { notPinned, pinned } = this.state;
        if (!notPinned) return <h1>Loading...</h1>
        return <div className="keep-container">
            <LeftBar />
            <section className="keep-content">
                <AddNote addNote={this.addNote} />
                <h1>Pinned</h1>
                    <NoteList notes={pinned} removeNote={this.removeNote}/>
                <h1>Others</h1>
                    <NoteList notes={notPinned} removeNote={this.removeNote}/>
            </section>
        </div>
    }
}