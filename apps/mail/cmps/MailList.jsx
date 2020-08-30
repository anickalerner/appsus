import { MailRow } from './MailPreview/MailRow.jsx';
import { ViewFilter } from './ViewFilter.jsx';
import { SortControl } from './SortControl.jsx';

export function MailList({ mails, mailStarToggle, onDeleteMail, openMail, markRead, openDraft, filterView, reply, sortMails }) {
    return (
        <div>
            <form className="filter-sort-form">
                <ViewFilter onChange={filterView} />
                <SortControl sortMails={sortMails} />
            </form>
            <table className="mail-table">
                <tbody>
                    {mails.length > 0 && mails.map(mail => {
                        return <MailRow mail={mail} key={mail.id} mailStarToggle={mailStarToggle}
                            onDeleteMail={onDeleteMail}
                            openMail={openMail}
                            markRead={markRead}
                            openDraft={openDraft}
                            reply={reply}
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


