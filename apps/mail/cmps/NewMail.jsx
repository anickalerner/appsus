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
    
    componentWillUnmount() {
        clearInterval(this.state.interval);
    }

    getFormData = () => {
        return {
            id: this.idRef.current.value,
            to: this.mailToRef.current.value,
            subject: this.mailSubjectRef.current.value,
            body: this.mailBodyRef.current.value
        }
    }

    onKeyUp = () => {
        if (!this.state.savedFirstDraft) {
            this.setState({ savedFirstDraft: true }, () => {
                this.saveDraft();
                console.log('key down');
            });
            this.setState({
                interval: () => {
                    setInterval(() => {
                        console.log('saving draft');
                        this.saveDraft();
                    }, 3000);
                }
            });
        }
    }

    saveDraft = () => {
        var data = this.getFormData();
        data = { ...data, isDraft: true, isRead: true };
        this.props.onSave(data);
    }

    sendForm = () => {
        var data = this.getFormData();
        this.props.onSend(data);
        this.props.onClose();
    }

    close = () => {
        if (this.state.savedFirstDraft){
            this.saveDraft();
        }
        this.props.onClose();
    }

    get mailId() {
        return (this.props.draft) ? this.props.draft.id : '';
    }

    get mailTo() {
        return (this.props.draft) ? this.props.draft.to : '';
    }

    get mailSubject() {
        return (this.props.draft) ? this.props.draft.subject : '';
    }

    get mailBody() {
        return (this.props.draft) ? this.props.draft.body : '';
    }
    
    render() {
        return (
            <div className="new-mail-container aps-box-shadow-big rounded-small">
                <div className="top-band dark-msg inner">New Message
                    <button type="button" className="close" aria-label="Close" onClick={this.close}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form onKeyUp={this.onKeyUp}>
                    <input type="hidden" id="mail-id" ref={this.idRef} value={this.mailId} />

                    <div className="form-group">
                        {/* <label htmlFor="mail-to">Email address</label> */}
                        <input type="mail" className="form-control" id="mail-to" ref={this.mailToRef} defaultValue={this.mailTo} placeholder="Recipients" />

                    </div>
                    <div className="form-group">
                        {/* <label htmlFor="mail-subject">Subject</label> */}
                        <input type="text" className="form-control" id="mail-subject" ref={this.mailSubjectRef} defaultValue={this.mailSubject} placeholder="Subject" />

                    </div>
                    <div className="form-group">
                        <textarea className="form-control" id="mail-body" rows="10" ref={this.mailBodyRef} defaultValue={this.mailBody} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.sendForm}>Send</button>
                </form>
            </div>
        )
    }
}