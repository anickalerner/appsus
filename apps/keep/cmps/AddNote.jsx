export class AddNote extends React.Component {

    state = {
        noteAddVal: '',
        noteType: 'txt'
    }

    onChange = (ev) => {
        this.setState({ noteAddVal: ev.target.value });
    }

    onChangeNoteType(noteType){
        this.setState({noteType});
    }

    render() {
        const { noteAddVal, noteType } = this.state;
        return <form className="add-note" onSubmit={() => this.props.addNote(noteAddVal, noteType, event)}>
                <input value={noteAddVal} onChange={this.onChange} placeholder="Take a note" type="text" />
                <button type="button" onClick={() => this.onChangeNoteType('txt')}>txt</button>
                <button type="button" onClick={() => this.onChangeNoteType('img')}>img</button>
                <button type="button" onClick={() => this.onChangeNoteType('todo')}>todo</button>
            </form>
    }
}