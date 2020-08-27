export function NewMail(props) {

    return (
        <div className="new-mail-container">
            <div className="top-band">New Message
            <button type="button" class="close" aria-label="Close" onClick={props.onClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor="mail-to">Email address</label>
                    <input type="mail" className="form-control" id="mail-to" />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="mail-subject">Subject</label>
                    <input type="text" className="form-control" id="mail-subject" />

                </div>
                <div className="form-group">
                    <textarea className="form-control" id="mail-body" rows="10"/>
                </div>
                <button type="button" className="btn btn-primary">Send</button>
            </form>
        </div>
    )
}