import {MailIcon, EditIcon, TrashBinIcon, PinIcon} from '../../../cmps/Icons.jsx';
import eventBus from '../../../service/event-bus-service.js';

export function NoteButtons(props) {
    return <div className="edit-note">
        <MailIcon size={props.iconSize} onClick={props.onSendToMail} />
        <EditIcon size={props.iconSize} onClick={props.onEdit} />
        <TrashBinIcon size={props.iconSize} onClick={() => eventBus.emit('remove-note', props.id)} />
        <PinIcon size={props.iconSize} onClick={() => eventBus.emit('pin-note', props.id)} />
    </div>
}