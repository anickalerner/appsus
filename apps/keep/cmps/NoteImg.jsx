import { TrashBinIcon, EditIcon, ImageIcon, CheckIcon } from '../../../cmps/Icons.jsx';

export class NoteImg extends React.Component {
    state = {
        isEditing: false
    }

    componentDidMount() {
        this.setState({ ...this.props })
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            console.log('changing props');
            this.setState({...this.props, isEditing: false})
        }
    }

    onEdit = () => {
        this.setState({ isEditing: true })
    }

    onChange = (ev) => {
        const newInfo = this.state.info;
        newInfo[ev.target.name] = ev.target.value;
        this.setState({ info: newInfo });
    }

    render() {
        const { info, isEditing, id } = this.state;
        if (!info) return <h1>Loading...</h1>
        return isEditing ? <div className="note">
            <input name="title" value={info.title} onChange={this.onChange} type="text" />
            <input name="url" value={info.url} onChange={this.onChange} type="text" />
            <div className="edit-note">
                <button onClick={() => this.props.updateNote(id, info)}><CheckIcon /></button>
            </div>
        </div>
            : <div className="note">
                <h2>{info.title}</h2>
                <img src={info.url} alt="" />
                <div className="edit-note">
                    <button onClick={this.onEdit}><EditIcon /></button>
                    <button onClick={() => this.props.removeNote(id)}><TrashBinIcon /></button>
                </div>
            </div>
    }
}