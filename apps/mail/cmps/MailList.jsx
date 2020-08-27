//import { MailRow } from './MailRow.jsx';
import { StarEmptyIcon, StarFullIcon } from '../../../cmps/Icons.jsx';
import { MailSubject } from './MailSubject.jsx';
export class MailRow extends React.Component {
    starClicked = () =>{
        this.props.mailStarToggle(this.props.mail.id);
    }

    render() {
        const mail = this.props.mail;
        return (
            <tr>
                <MailControls mail={mail} starClicked={this.starClicked}/>
                <MailFrom from={mail.from} />
                <MailSubject subject={mail.subject} body={mail.body}/>
                <MailDate date={mail.sentAt} />
            </tr>
        )
    }
}

function MailControls({ mail, starClicked}) {
    return (
        <td>
            <StarIconControl mail={mail} starClicked={starClicked}/>
        </td>
    )
}

function StarIconControl({ mail, starClicked }) {

    const isStarred = mail.isStarred;
    return (<span className={isStarred ? 'starred' : ''} onClick={starClicked}>
        {isStarred ? <StarFullIcon /> : <StarEmptyIcon />}
    </span>)
}

function MailFrom({ from }) {
    return (
        <td>
            {from}
        </td>
    )
}

function MailDate({ date }) {
    return (
        <td>
            {new Date(date).toLocaleString()}
        </td>
    )
}
export function MailList({ mails, mailStarToggle }) {
    return (
        <table>
            <tbody>
                {mails.map(mail => {
                    return <MailRow mail={mail} key={mail.id} mailStarToggle={mailStarToggle}/>
                })}
            </tbody>
        </table>
    )
}


