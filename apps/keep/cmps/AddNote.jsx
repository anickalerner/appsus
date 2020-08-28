import { TextIcon, ImageIcon, YoutubeIcon, PlusIcon, TodoListIcon, AudioIcon } from '../../../cmps/Icons.jsx';

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

    onPickFile =(ev)=>{
        this.setState({noteAddVal: ev.target.value})
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
        return <form encType="multipart/form-data" className="add-note rounded aps-box-shadow-big" onSubmit={this.onSubmit}>
            <PlusIcon size='1.5em'  onClick={this.onSubmit} />
            <input value={noteAddVal} onChange={this.onChange} placeholder={`Add a note (${noteType})`} type="text" />
            <TextIcon size='1.5em' onClick={() => this.onChangeNoteType('txt')} />
            <ImageIcon size='1.5em' onClick={() => this.onChangeNoteType('img')} />
            <YoutubeIcon size='1.5em' onClick={() => this.onChangeNoteType('video')} />
            <AudioIcon size='1.5em' onClick={() => this.onChangeNoteType('audio')} />
            <TodoListIcon size='1.5em' onClick={() => this.onChangeNoteType('todo')} />
        </form>
    }
}