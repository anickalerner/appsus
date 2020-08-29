import { StarEmptyIcon, StarFullIcon } from '../../../../cmps/Icons.jsx';

export function MailControls({ mail, starClicked }) {
    return (
        <td>
            <StarIconControl mail={mail} starClicked={starClicked} />
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