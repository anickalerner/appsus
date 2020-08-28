import { MailRow } from './MailPreview/MailRow.jsx';

export function MailList({ mails, mailStarToggle, onDeleteMail }) {
    return (
        <table className="mail-table">
            <tbody>
                {mails.map(mail => {
                    return <MailRow mail={mail} key={mail.id} mailStarToggle={mailStarToggle} onDeleteMail={onDeleteMail}/>
                })}
            </tbody>
        </table>
    )
}


