import { PaletteIcon, TrashBinIcon, EditIcon, TextIcon, CheckIcon, PinIcon, LabelIcon } from '../../../cmps/Icons.jsx';
import eventBus from '../../../service/event-bus-service.js';

export class NoteText extends React.Component {
    state = {
        isEditing: false
    }

    elText = React.createRef();
    elColorPicker = React.createRef();

    componentDidMount() {
        this.setState({ ...this.props })
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            console.log('changing props');
            this.setState({ ...this.props, isEditing: false })
        }
    }

    onEdit = () => {
        setTimeout(() => {
            this.setState({ isEditing: true });
            this.elText.current.focus();
        }, 0)
    }

    onLabel = () => {
        console.log('labeling...');
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


    onUpdate = () => {
        const { id, info } = this.state;
        info.txt = this.elText.current.innerText;
        eventBus.emit('update-note', { id, info })
    }

    render() {
        const { info, id, isEditing } = this.state;
        if (!info) return <h1>Loading...</h1>;
        console.log(`backgroundColor: ${info.backgroundColor}`);
        return <div style={{ backgroundColor: info.backgroundColor }} className="note rounded">
            <p ref={this.elText} suppressContentEditableWarning={true} contentEditable={isEditing}>{info.txt}</p>
            {isEditing ?
                <div className="edit-note">
                    <CheckIcon size='1.5em' onClick={this.onUpdate} />
                    <div className="color-picker-wrapper">
                        <input onChange={this.onColorChange} ref={this.elColorPicker} type="color" />
                        <PaletteIcon size='1.5em' onClick={this.onColorPick} />
                    </div>
                    <div className="label-wrapper">
                        <LabelIcon size='1.5em' onClick={this.onLabel} />
                        <ul className="label-list rounded">
                            <li>Reminder</li>
                            <li>Archive</li>
                            <li>None</li>
                        </ul>
                    </div>
                </div>
                :
                <div className="edit-note">
                    <EditIcon size='1.5em' onClick={this.onEdit} />
                    <TrashBinIcon size='1.5em' onClick={() => eventBus.emit('remove-note', id)} />
                    <PinIcon size='1.5em' onClick={() => eventBus.emit('pin-note', id)} />
                </div>
            }
            <div className="note-icon"><TextIcon /></div>
        </div>
    }

}