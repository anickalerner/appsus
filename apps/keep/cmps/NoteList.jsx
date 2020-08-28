import { NoteText } from './NoteText.jsx';
import { NoteImg } from './NoteImg.jsx';
import { NoteVideo } from './NoteVideo.jsx';
import { NoteTodos } from './NoteTodos.jsx';

function DynamicCmp(note){
    const { id } = note;
    switch (note.type) {
        case 'NoteText':
            return <NoteText key={id} {...note}  />
        case 'NoteImg':
            return <NoteImg key={id} {...note}  />
        case 'NoteTodos':
            return <NoteTodos key={id} {...note}  />
        case 'NoteVideo':
            return <NoteVideo key={id} {...note}  />
        default:
            return <h1 key={id}>Something went wrong with note {id}</h1>
    }
}

export class NoteList extends React.Component {
    state = {
        notes: null
    }



    componentDidMount() {
        this.setState({ notes: this.props.notes })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.notes !== this.props.notes) {
            this.setState({ notes: this.props.notes })
        }
    }

    render() {
        const { notes } = this.state
        if (!notes) return <h1>Loading...</h1>
        return <div className="note-list">
            {notes.map(note => DynamicCmp(note, this.props.removeNote, this.props.updateNote))}
        </div>
    }

}