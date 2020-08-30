import { StarEmptyIcon, StarFullIcon, ReplyIcon } from '../../../../cmps/Icons.jsx';

export function MailControls({ mail, starClicked, reply }) {
    function onReply(){
        reply(mail);
    }
    
    return (
        <td>
            <StarIconControl mail={mail} starClicked={starClicked} />
            <ReplyIcon onClick={onReply}/>
        </td>
    )
}

function StarIconControl({ mail, starClicked }) {

    const isStarred = mail.isStarred;

    function onStarClicked(ev){
        ev.stopPropagation();
        starClicked();

    }
    return (<span className={isStarred ? 'starred' : ''} onClick={onStarClicked}>
        {isStarred ? <StarFullIcon /> : <StarEmptyIcon />}
    </span>)
}