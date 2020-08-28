import { MailRow } from './MailPreview/MailRow.jsx';

export function MailList({ mails, mailStarToggle, onDeleteMail, openMail }) {
    return (
        <table className="mail-table">
            <tbody>
                {mails.length > 0 && mails.map(mail => {
                    return <MailRow mail={mail} key={mail.id} mailStarToggle={mailStarToggle} 
                        onDeleteMail={onDeleteMail}
                        openMail={openMail}/>
                })}
                {
                    mails.length === 0 && <tr><td>No mails in this category</td></tr>
                }
            </tbody>
        </table>
    )
}


