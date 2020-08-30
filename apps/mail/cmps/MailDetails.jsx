import { MailControls } from './MailPreview/MailControls.jsx';

export function MailDetails({ mail, starClicked, reply }) {
    return (
        <div className="mail-details">            
            <table>
                <tbody>
                    <tr>
                        <MailControls mail={mail} starClicked={starClicked} reply={reply} />
                        <td>{new Date(mail.sentAt).toLocaleDateString()}</td>
                    </tr>
                </tbody>
            </table>
            <div>
                <p>{mail.subject}</p>
                <p>{mail.body}</p>
            </div>
        </div>
    )
}