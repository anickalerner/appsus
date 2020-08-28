export function MailDetails({mail}){
    return(
        <div>
            <p>{mail.subject}</p>
            <p>{mail.body}</p>
        </div>
    )
}