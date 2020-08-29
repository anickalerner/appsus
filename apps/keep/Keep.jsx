import { keepService } from './service/keep-service.js';
import eventBus from '../../service/event-bus-service.js';
import { NoteList } from './cmps/NoteList.jsx';
import { KeepMenu } from './cmps/KeepMenu.jsx';
import { AddNote } from './cmps/AddNote.jsx';
import { NoteSearch } from './cmps/NoteSearch.jsx';



export default class Keep extends React.Component {

    state = {
        NotPinned: null,
        pinned: null,
        searchValue: ''
    }

    unsubscribeRemove;
    unsubscribeUpdate;
    unsubscribeSearch;
    unsubscribePin;

    componentDidMount() {
        eventBus.emit('change-app', true);
        const subject = new URLSearchParams(this.props.location.search).get('subject');
        const body = new URLSearchParams(this.props.location.search).get('body');
        if(subject && body) keepService.mailToNote(body, subject);
        this.unsubscribeRemove = eventBus.on('remove-note', (id) => {
            this.removeNote(id);
        })

        this.unsubscribeUpdate = eventBus.on('update-note', ({ id, info }) => {
            this.updateNote(id, info);
        })
        this.unsubscribeSearch = eventBus.on('search-note', (searchValue)=>{
            this.setState({searchValue}, this.getNotes)
        })
        this.unsubscribePin = eventBus.on('pin-note', (id) => {
            this.pinNote(id)
        })
        this.getNotes();
    }

    componentDidUpdate(prevProps){
        if(prevProps !== this.props){
            this.getNotes();
        }
    }

    componentWillUnmount() {
        this.unsubscribeRemove();
        this.unsubscribeUpdate();
        this.unsubscribeSearch();
        this.unsubscribePin();
    }

    getNotes = () => {
        keepService.getNotes({label: this.props.match.params.label, search: this.state.searchValue})
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
        const { notPinned, pinned, searchValue } = this.state;
        if (!notPinned) return <h1>Loading...</h1>
        return <div className="keep-container main-wrapper">
                <KeepMenu tab={this.props.match.params.filter} />
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