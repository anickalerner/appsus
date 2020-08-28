import { PaletteIcon, TrashBinIcon, EditIcon, CheckIcon, ImageIcon, PinIcon } from '../../../cmps/Icons.jsx';
import eventBus from '../../../service/event-bus-service.js';

export class NoteImg extends React.Component {
    state = {
        isEditing: false
    }

    elColorPicker = React.createRef();

    componentDidMount() {
        this.setState({ ...this.props })
    }

    onColorPick = () => {
        this.elColorPicker.current.focus();
        this.elColorPicker.current.click();
    }

    onColorChange = (ev) => {
        const info = { ...this.state.info };
        info.backgroundColor = ev.target.value;
        this.setState({ info })
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            console.log('changing props');
            this.setState({ ...this.props, isEditing: false })
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
        return isEditing ?
            <div style={{ backgroundColor: info.backgroundColor }} className="note rounded">
                <input name="title" placeholder="Image's title" value={info.title || ''} onChange={this.onChange} type="text" />
                <input name="url" value={info.url} placeholder="Image's url" onChange={this.onChange} type="text" />
                <div className="edit-note">
                    <CheckIcon size='1.5em' onClick={() => eventBus.emit('update-note', { id, info })} />
                    <div className="color-picker-wrapper">
                        <input onChange={this.onColorChange} ref={this.elColorPicker} type="color" />
                        <PaletteIcon size='1.5em' onClick={this.onColorPick} />
                    </div>
                </div>
                <div className="note-icon"><ImageIcon /></div>
            </div>
            : <div style={{ backgroundColor: info.backgroundColor }} className="note rounded ">
                {info.title && <h2>{info.title}</h2>}
                <img src={info.url} alt="" />
                <div className="edit-note">
                    <EditIcon size='1.5em' onClick={this.onEdit} />
                    <TrashBinIcon size='1.5em' onClick={() => eventBus.emit('remove-note', id)} />
                    <PinIcon size='1.5em' onClick={() => eventBus.emit('pin-note', id)} />
                </div>
                <div className="note-icon"><ImageIcon /></div>
            </div>
    }
}