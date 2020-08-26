import { NoteText } from './NoteText.jsx';
import { NoteImg } from './NoteImg.jsx';
import { NoteTodos } from './NoteTodos.jsx';


export class NoteList extends React.Component {
    state = {
        notes: null
    }

    DynamicCmp = (note, remove)=> {
        const { id } = note;
        switch (note.type) {
            case 'NoteText':
                return <NoteText key={id} {...note} removeNote={remove} />
            case 'NoteImg':
                return <NoteImg key={id} {...note} removeNote={remove} />
            case 'NoteTodos':
                return <NoteTodos key={id} {...note} removeNote={remove} />
            default:
                return <h1 key={id}>Something went wrong with note {id}</h1>
        }
    }

    componentDidMount() {
        this.setState({ notes: this.props.notes })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.notes !== this.props.notes) {
            console.log('changing props');
            this.setState({ notes: this.props.notes })
        }
    }

    render() {
        const { notes } = this.state
        if (!notes) return <h1>Loading...</h1>
        console.log(this.props);
        return <div className="note-list">
            {notes.map(note => this.DynamicCmp(note, this.props.removeNote))}
        </div>
    }

}