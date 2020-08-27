import { TextIcon, ImageIcon, YoutubeIcon, PlusIcon, TodoListIcon } from '../../../cmps/Icons.jsx';

export class AddNote extends React.Component {

    state = {
        noteAddVal: '',
        noteType: 'txt'
    }

    onChange = (ev) => {
        this.setState({ noteAddVal: ev.target.value });
    }

    onChangeNoteType(noteType) {
        this.setState({ noteType });
    }

    onSubmit = (ev) => {
        ev.preventDefault();
        const { noteAddVal, noteType } = this.state;
        if (!noteAddVal) return;
        this.props.addNote(noteAddVal, noteType, event);
        this.setState({ noteAddVal: '' });
    }

    render() {
        const { noteAddVal, noteType } = this.state;
        return <form className="add-note rounded aps-box-shadow-big" onSubmit={this.onSubmit}>
            <button><PlusIcon /></button>
            <input value={noteAddVal} onChange={this.onChange} placeholder={`Add a note (${noteType})`} type="text" />
            <button type="button" onClick={() => this.onChangeNoteType('txt')}><TextIcon onClick={() => console.log('working')} /></button>
            <button type="button" onClick={() => this.onChangeNoteType('img')}><ImageIcon /></button>
            <button type="button" onClick={() => this.onChangeNoteType('video')}><YoutubeIcon /></button>
            <button type="button" onClick={() => this.onChangeNoteType('todo')}><TodoListIcon /></button>
        </form>
    }
}