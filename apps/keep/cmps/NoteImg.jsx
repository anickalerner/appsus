import { TrashBinIcon, EditIcon, CheckIcon } from '../../../cmps/Icons.jsx';
import eventBus from '../../../service/event-bus-service.js';

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
        return isEditing ? <div className="note rounded aps-box-shadow-small">
            <input name="title" placeholder="Image's title" value={info.title || ''} onChange={this.onChange} type="text" />
            <input name="url" value={info.url} placeholder="Image's url" onChange={this.onChange} type="text" />
            <div className="edit-note">
                <button onClick={() => eventBus.emit('update-note', {id, info})}><CheckIcon /></button>
            </div>
        </div>
            : <div className="note rounded aps-box-shadow-small">
                {info.title && <h2>{info.title}</h2>}
                <img src={info.url} alt="" />
                <div className="edit-note">
                    <button onClick={this.onEdit}><EditIcon /></button>
                    <button onClick={() => eventBus.emit('remove-note', id)}><TrashBinIcon /></button>
                </div>
            </div>
    }
}