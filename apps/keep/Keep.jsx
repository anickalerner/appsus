import { keepService } from './service/keep-service.js';
import eventBus from '../../service/event-bus-service.js';
import { NoteList } from './cmps/NoteList.jsx';
import { KeepSideBar } from './cmps/KeepSideBar.jsx';
import { AddNote } from './cmps/AddNote.jsx';



export default class Keep extends React.Component {

    state = {
        NotPinned: null,
        pinned: null
    }

    unsubscribeRemove;
    unsubscribeUpdate;
    unsubscribePin;

    componentDidMount() {
        keepService.loadNotes()
            .then(this.getNotes());

        this.unsubscribeRemove = eventBus.on('remove-note', (id) => {
            this.removeNote(id);
        })

        this.unsubscribeUpdate = eventBus.on('update-note', ({ id, info }) => {
            this.updateNote(id, info);
        })
        this.unsubscribePin = eventBus.on('pin-note', (id) => {
            this.pinNote(id)
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            this.getNotes();
        }
    }

    componentWillUnmount() {
        this.unsubscribeRemove();
        this.unsubscribeUpdate();
    }

    getNotes = () => {
        keepService.getNotes(this.props.match.params.filter)
            .then(res => this.setState(res));
    }

    addNote = (noteVal, noteType, ev) => {
        ev.preventDefault();
        keepService.addNote(noteVal, noteType)
            .then(() => this.getNotes());
    }

    pinNote = (id) => {
        keepService.pinNote(id)
            .then(this.getNotes);
    }

    removeNote = (id) => {
        keepService.removeNote(id)
            .then(this.getNotes());
    }

    updateNote = (id, info) => {
        keepService.updateNote(id, info)
            .then(this.getNotes());
    }

    render() {
        const { notPinned, pinned } = this.state;
        if (!notPinned) return <h1>Loading...</h1>
        return <div className="keep-container main-wrapper">
                <KeepSideBar tab={this.props.match.params.filter} />
            <section className="keep-content">
                <AddNote addNote={this.addNote} />
                <h1 className="keep-heading">Pinned</h1>
                <NoteList notes={pinned} />
                <h1 className="keep-heading">Others</h1>
                <NoteList notes={notPinned} />
            </section>
        </div>
    }
}