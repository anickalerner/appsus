export class NewMail extends React.Component {
    state = {
        savedFirstDraft: false
    }
    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        this.mailToRef = React.createRef();
        this.mailSubjectRef = React.createRef();
        this.mailBodyRef = React.createRef();
        this.idRef = React.createRef();
    }

    getFormData = () => {
        return {
            id: this.idRef.current.value,
            to: this.mailToRef.current.value,
            subject: this.mailSubjectRef.current.value,
            body: this.mailBodyRef.current.value
        }
    }

    onKeyDown = () => {
        if (!this.state.savedFirstDraft) {
            this.setState({ savedFirstDraft: true }, () => { 
                this.saveDraft();
                console.log('key down');
            });
            //this.isDraft.current.value = true;
            
            // setInterval(() => {
            //     console.log('saving draft');
            //     this.saveDraft();
            // }, 3000);
        }

    }
    saveDraft = () => {
        var data = this.getFormData();
        data = { ...data, isDraft: true };
        this.props.onSave(data);
    }

    sendForm = () => {
        var data = this.getFormData();
        this.props.onSend(data);
        this.props.onClose();

    }
   
    getMailId = () => {
        return (this.props.draft) ? this.props.draft.id : '';
    }

    render() {

        return (
            <div className="new-mail-container aps-box-shadow-big rounded-small">
                <div className="top-band dark-msg inner">New Message
                    <button type="button" className="close" aria-label="Close" onClick={this.props.onClose}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form onKeyDown={this.onKeyDown}>
                    <input type="hidden" id="mail-id" ref={this.idRef} value={this.getMailId()} />

                    <div className="form-group">
                        {/* <label htmlFor="mail-to">Email address</label> */}
                        <input type="mail" className="form-control" id="mail-to" ref={this.mailToRef} placeholder="Recipients" />

                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="mail-subject">Subject</label> */}
                        <input type="text" className="form-control" id="mail-subject" ref={this.mailSubjectRef} placeholder="Subject" />

                    </div>
                    <div className="form-group">
                        <textarea className="form-control" id="mail-body" rows="10" ref={this.mailBodyRef} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.sendForm}>Send</button>
                </form>
            </div>
        )
    }
}