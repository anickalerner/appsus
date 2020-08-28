import { TrashBinIcon, EditIcon, PinIcon, } from '../../../cmps/Icons.jsx';
import eventBus from '../../../service/event-bus-service.js';
import { NoteIcons } from './NoteIcons.jsx';
import { InNoteEdit } from './InNoteEdit.jsx';

export class NoteText extends React.Component {
    state = {
        isEditing: false
    }

    elText = React.createRef();

    componentDidMount() {
        this.setState({ ...this.props })
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({ ...this.props, isEditing: false })
        }
    }

    onEdit = () => {
        setTimeout(() => {
            this.setState({ isEditing: true });
            this.elText.current.focus();
        }, 0)
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

    onUpdate = () => {
        const { id, info } = this.state;
        info.txt = this.elText.current.innerText;
        eventBus.emit('update-note', { id, info })
    }

    render() {
        const { info, id, isEditing, type } = this.state;
        if (!info) return <h1>Loading...</h1>;
        return <div style={{ backgroundColor: info.backgroundColor }} className="note rounded">
            <p ref={this.elText} suppressContentEditableWarning={true} contentEditable={isEditing}>{info.txt}</p>
            {isEditing ?
                <InNoteEdit onColorChange={this.onColorChange} onChangeLabel={this.onChangeLabel} onUpdate={this.onUpdate} />
                : <div className="edit-note">
                    <EditIcon size='1.5em' onClick={this.onEdit} />
                    <TrashBinIcon size='1.5em' onClick={() => eventBus.emit('remove-note', id)} />
                    <PinIcon size='1.5em' onClick={() => eventBus.emit('pin-note', id)} />
                </div>
            }
            <NoteIcons type={type} label={info.label} />
        </div>
    }

}