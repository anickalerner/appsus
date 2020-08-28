import { TrashBinIcon, EditIcon, PinIcon } from '../../../cmps/Icons.jsx';
import eventBus from '../../../service/event-bus-service.js';
import { NoteIcons } from './NoteIcons.jsx';
import { InNoteEdit } from './InNoteEdit.jsx';

export class NoteImg extends React.Component {
    state = {
        isEditing: false
    }

    elColorPicker = React.createRef();

    componentDidMount() {
        this.setState({ ...this.props })
    }

    onColorChange = (ev) => {
        const info = { ...this.state.info };
        info.backgroundColor = ev.target.value;
        this.setState({ info })
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({ ...this.props, isEditing: false })
        }
    }

    onEdit = () => {
        this.setState({ isEditing: true })
    }
    
    onChangeLabel = (ev) => {
        const info = { ...this.state.info };
        info.label = ev.target.innerText;
        this.setState({ info });
    }

    onChange = (ev) => {
        const newInfo = this.state.info;
        newInfo[ev.target.name] = ev.target.value;
        this.setState({ info: newInfo });
    }

    onUpdate = () => {
        const {id, info} = this.state;
        eventBus.emit('update-note', { id, info })
    }

    render() {
        const { info, isEditing, id, type } = this.state;
        if (!info) return <h1>Loading...</h1>
        return isEditing ?
            <div style={{ backgroundColor: info.backgroundColor }} className="note rounded">
                <input name="title" placeholder="Image's title" value={info.title || ''} onChange={this.onChange} type="text" />
                <input name="url" value={info.url} placeholder="Image's url" onChange={this.onChange} type="text" />
                <InNoteEdit onColorChange={this.onColorChange} onChangeLabel={this.onChangeLabel} onUpdate={this.onUpdate} />
                <NoteIcons type={type} label={info.label} />
            </div>
            : <div style={{ backgroundColor: info.backgroundColor }} className="note rounded ">
                {info.title && <h2>{info.title}</h2>}
                <img src={info.url} alt="" />
                <div className="edit-note">
                    <EditIcon size='1.5em' onClick={this.onEdit} />
                    <TrashBinIcon size='1.5em' onClick={() => eventBus.emit('remove-note', id)} />
                    <PinIcon size='1.5em' onClick={() => eventBus.emit('pin-note', id)} />
                </div>
                <NoteIcons type={type} label={info.label} />
            </div>
    }
}