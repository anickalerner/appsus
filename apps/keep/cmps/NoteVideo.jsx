import eventBus from '../../../service/event-bus-service.js';
import { NoteIcons } from './NoteIcons.jsx';
import { InNoteEdit } from './InNoteEdit.jsx';
import { NoteButtons } from './NoteButtons.jsx';
const {withRouter} = ReactRouterDOM;

class _NoteVideo extends React.Component {
    state = {
        isEditing: false
    }

    elColorPicker = React.createRef();

    componentDidMount() {
        this.setState({ ...this.props })
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({ ...this.props, isEditing: false })
        }
    }

    onEdit = () => {
        this.setState({ isEditing: true })
    }

    onSendToMail = () => {
        const { title, content } = this.state.info;
        this.props.history.push(`/mail?subject=${title}&body=url:${content}`);
    }

    onColorChange = (ev) => {
        const info = { ...this.state.info };
        info.backgroundColor = ev.target.value;
        this.setState({ info })
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
        info.content = info.content.replace('watch?v=', 'embed/');
        info.content = info.content.replace('&t', '?start');
        eventBus.emit('update-note', { id, info })
    }

    render() {
        const { info, isEditing, id, type, iconSize } = this.state;
        if (!info) return <h1>Loading...</h1>
        return <div style={{ backgroundColor: info.backgroundColor }} className="note note-video rounded">
            {isEditing ?
                <React.Fragment>
                    <input name="title" placeholder="Video's title" value={info.title || ''} onChange={this.onChange} type="text" />
                    <input name="content" value={info.content} placeholder="Video's url" onChange={this.onChange} type="text" />
                    <InNoteEdit onColorChange={this.onColorChange} onChangeLabel={this.onChangeLabel} onUpdate={this.onUpdate} />
                </React.Fragment>
                : <React.Fragment>
                    {info.title && <h2>{info.title}</h2>}
                    <iframe src={info.content} alt="" />
                    <NoteButtons id={id} iconSize={iconSize} onSendToMail={this.onSendToMail} onEdit={this.onEdit} />
                    <NoteIcons type={type} label={info.label} />
                </React.Fragment>
            }
            <NoteIcons type={type} label={info.label} />
        </div>
    }
}

export const NoteVideo = withRouter(_NoteVideo);