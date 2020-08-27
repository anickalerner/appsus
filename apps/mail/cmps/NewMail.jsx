export class NewMail extends React.Component {
    
    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        this.mailToInput = React.createRef();
        
    }
    
    getFormData= () =>{
        console.log(this.mailToInput.value);
    }

    render(){

    return (
        <div className="new-mail-container">
            <div className="top-band">New Message
            <button type="button" className="close" aria-label="Close" onClick={this.props.onClose}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor="mail-to">Email address</label>
                    <input type="mail" className="form-control" id="mail-to" ref={this.mailToInput}/>
                    
                </div>
                <div className="form-group">
                    <label htmlFor="mail-subject">Subject</label>
                    <input type="text" className="form-control" id="mail-subject" />

                </div>
                <div className="form-group">
                    <textarea className="form-control" id="mail-body" rows="10"/>
                </div>
                <button type="button" className="btn btn-primary" onClick={this.getFormData}>Send</button>
            </form>
        </div>
    )}
}