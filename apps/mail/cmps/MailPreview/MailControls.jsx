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
    return (<span className={isStarred ? 'starred' : ''} onClick={starClicked}>
        {isStarred ? <StarFullIcon /> : <StarEmptyIcon />}
    </span>)
}