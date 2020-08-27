import { MailRow } from './MailPreview/MailRow.jsx';

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


