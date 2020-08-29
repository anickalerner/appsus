import { TrashBinIcon, EditIcon, PinIcon, MailIcon } from '../../../cmps/Icons.jsx';
import eventBus from '../../../service/event-bus-service.js';
import { NoteIcons } from './NoteIcons.jsx';
import { InNoteEdit } from './InNoteEdit.jsx';
const {withRouter} = ReactRouterDOM;

class _NoteAudio extends React.Component {

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

    onSendToMail = ()=>{
        const {title, content} = this.state.info;
        const mail = {subject: title, content: 'url' + content};
        this.props.history.push(`/keep?subject=${title}&body=${content}`);
        console.log(mail);
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
        const { id, info } = this.state;
        eventBus.emit('update-note', { id, info })
    }


    render() {
        const { info, isEditing, id, type, iconSize } = this.state;
        if (!info) return <h1>Loading...</h1>
        return isEditing ? <div style={{ backgroundColor: info.backgroundColor }} className="note note-audio rounded">
            <input name="title" placeholder="Audio clip's title" value={info.title || ''} onChange={this.onChange} type="text" />
            <input name="content" value={info.content} placeholder="Audio's url" onChange={this.onChange} type="text" />
            <InNoteEdit onColorChange={this.onColorChange} onChangeLabel={this.onChangeLabel} onUpdate={this.onUpdate} />
            <NoteIcons type={type} label={info.label} />
        </div>
            : <div style={{ backgroundColor: info.backgroundColor }} className="note rounded">
                {info.title && <h2>{info.title}</h2>}
                <audio controls>
                    <source src={info.content} type="audio/mpeg"></source>
                    <source src={info.content} type="audio/ogg"></source>
                </audio>
                <div className="edit-note">
                    <MailIcon size={iconSize} onClick={this.onSendToMail} />
                    <EditIcon size={iconSize} onClick={this.onEdit} />
                    <TrashBinIcon size={iconSize} onClick={() => eventBus.emit('remove-note', id)} />
                    <PinIcon size={iconSize} onClick={() => eventBus.emit('pin-note', id)} />
                </div>
                <NoteIcons type={type} label={info.label} />
            </div>
    }
}

export const NoteAudio = withRouter(_NoteAudio);