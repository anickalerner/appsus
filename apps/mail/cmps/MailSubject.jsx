import {LongText} from '../../../cmps/LongText.jsx';

export function MailSubject({ subject, body }) {
    return (
        <td className="mail-subject">
            <span className="text-bold">{subject}</span>
            <span className="text-muted"><LongText text={body} length={50} showMore={false} /></span>
        </td>
    )
}