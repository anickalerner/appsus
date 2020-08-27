export class NewMail extends React.Component {
    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        this.mailToRef = React.createRef();
        this.mailSubjectRef = React.createRef();
        this.mailBodyRef = React.createRef();
    }
    
    getFormData= () =>{
        const data = {
            to: this.mailToRef.current.value,
            subject: this.mailSubjectRef.current.value,
            body: this.mailBodyRef.current.value
        }
        this.props.onSend(data);
        this.props.onClose();
    }

    render(){

    return (
        <div className="new-mail-container aps-box-shadow-big">
            <div className="top-band">New Message
            <button type="button" className="close" aria-label="Close" onClick={this.props.onClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor="mail-to">Email address</label>
                    <input type="mail" className="form-control" id="mail-to" ref={this.mailToRef}/>
                    
                </div>
                <div className="form-group">
                    <label htmlFor="mail-subject">Subject</label>
                    <input type="text" className="form-control" id="mail-subject" ref={this.mailSubjectRef}/>

                </div>
                <div className="form-group">
                    <textarea className="form-control" id="mail-body" rows="10" ref={this.mailBodyRef}/>
                </div>
                <button type="button" className="btn btn-primary" onClick={this.getFormData}>Send</button>
            </form>
        </div>
    )}
}