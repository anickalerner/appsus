//import { MailRow } from './MailRow.jsx';

function MailRow({mail}){
    return (
        <tr>
            {/* <MailControls/> */}
            <MailFrom from={mail.from}/>
            <MailSubject subject={mail.subject}/>
            <MailDate date={mail.sentAt}/>
        </tr>
    )
}
function MailFrom({from}){
    return (
        <td>
            {from}
        </td>
    )
}
function MailSubject({subject}){
    return (
        <td>
            {subject}
        </td>
    )
}
function MailDate({ date }) {
    console.log(date);
    return (
        <td>
            {new Date(date).toLocaleString()}
        </td>
    )
}
export function MailList({mails}){
    return (
        <table>
            <tbody>
            {mails.map(mail=>{
                console.log(mail, ' ', mail.sentAt);
                return <MailRow mail={mail} key={mail.sentAt}/>
            })}
            </tbody>        
        </table>
    )
}
