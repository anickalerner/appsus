import { TrashBinIcon, MailIcon, MailOpenIcon } from '../../../../cmps/Icons.jsx';


export function MailActionIcons({ mail, onDelete, onMarkRead }) {

    function ReadIcon(){
        return (mail.isRead) ? <MailIcon onClick={toggleIsReadIcon} title="Mark as unread" /> : <MailOpenIcon onClick={toggleIsReadIcon} title="Mark as read"/>;
    }

    function toggleIsReadIcon(ev){
        ev.stopPropagation();
        onMarkRead(mail);
    }
    function _onDelete(ev){
        ev.stopPropagation();
        onDelete();
    }
    return (
        <td>
            <TrashBinIcon onClick={_onDelete} title="Delete"/>
            {ReadIcon()}
        </td>
    )
}


