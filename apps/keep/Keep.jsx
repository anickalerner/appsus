import { keepService } from './service/keep-service.js';
import eventBus from '../../service/event-bus-service.js';
import { NoteList } from './cmps/NoteList.jsx';
import { LeftBar } from './cmps/LeftBar.jsx';
import { AddNote } from './cmps/AddNote.jsx';



export default class Keep extends React.Component {

    state = {
        NotPinned: null,
        pinned: null
    }

    unsubscribeRemove;
    unsubscribeUpdate;

    componentDidMount() {
        keepService.loadNotes()
            .then(this.getNotes());
        

        this.unsubscribeRemove = eventBus.on('remove-note', (id) =>{
            console.log('removing note...');
            console.log(id);
            this.removeNote(id);
        })

        this.unsubscribeUpdate = eventBus.on('update-note', ({id, info}) =>{
            console.log('updating note...');
            console.log(id, info);
            this.updateNote(id, info);
        })
    }

    componentWillUnmount(){
        this.unsubscribeRemove();
        this.unsubscribeUpdate();
    }

    getNotes(){
        keepService.getNotes()
            .then(res => this.setState(res));
    }

    addNote = (noteVal, noteType, ev) => {
        ev.preventDefault();
        keepService.addNote(noteVal, noteType)
            .then(() => this.getNotes());
    }

    removeNote = (id)=>{
        keepService.removeNote(id)
            .then(this.getNotes());
    }

    updateNote = (id, info) =>{
        keepService.updateNote(id, info)
            .then(this.getNotes());
    }

    render() {
        const { notPinned, pinned } = this.state;
        if (!notPinned) return <h1>Loading...</h1>
        return <div className="keep-container main-wrapper">
            <LeftBar />
            <section className="keep-content">
                <AddNote addNote={this.addNote} />
                <h1>Pinned</h1>
                    <NoteList notes={pinned} />
                <h1>Others</h1>
                    <NoteList notes={notPinned} />
            </section>
        </div>
    }
}