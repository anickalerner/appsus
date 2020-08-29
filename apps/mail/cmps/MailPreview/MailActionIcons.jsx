import { TrashBinIcon, MailIcon, MailOpenIcon, NoteIcon } from '../../../../cmps/Icons.jsx';
const { withRouter } = ReactRouterDOM;

function _MailActionIcons(props) {

    const { mail, onDelete, onMarkRead } = props;

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

    function sendToKeep(ev){
        ev.stopPropagation();
        props.history.push(`/keep?subject=${mail.subject}&body=${mail.body}`);
    }

    return (
        <td>
            <TrashBinIcon onClick={_onDelete} title="Delete"/>
            {ReadIcon()}
            <NoteIcon onClick={sendToKeep} title="Send to Keep" />
        </td>
    )
}
export const MailActionIcons = withRouter(_MailActionIcons);


