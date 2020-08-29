import { MailRow } from './MailPreview/MailRow.jsx';
import { ViewFilter } from './ViewFilter.jsx';

export function MailList({ mails, mailStarToggle, onDeleteMail, openMail, markRead, openDraft, filterView }) {
    return (
        <div>
            <ViewFilter onChange={filterView}/>
            <table className="mail-table">
                <tbody>
                    {mails.length > 0 && mails.map(mail => {
                        return <MailRow mail={mail} key={mail.id} mailStarToggle={mailStarToggle}
                            onDeleteMail={onDeleteMail}
                            openMail={openMail}
                            markRead={markRead}
                            openDraft={openDraft}
                        />
                    })}
                    {
                        mails.length === 0 && <tr><td>No mails in this category</td></tr>
                    }
                </tbody>
            </table>
        </div>
    )
}


