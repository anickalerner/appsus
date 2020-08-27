import { mailService } from './service/mail-service.js';
import { MailList } from './cmps/MailList.jsx';
import { MailMenu } from './cmps/MailMenu.jsx';
import { NewMail } from './cmps/NewMail.jsx';

export default class Mail extends React.Component {

    state = {
        mails: []
    };

    componentDidMount() {
        this.loadMails();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.filter !== this.props.match.params.filter) {
            this.loadMails();
        }
    }

    getFilter = () =>{
        var filter = this.props.match.params.filter;
        return (!filter) ? 'all' : filter;
    }

    loadMails = (_filter) => {
        var filter = (_filter) ? _filter : this.getFilter();
        mailService.query(filter).then(mails => this.setState({ mails }));
    }

    mailStarToggle = (mailToUpdateId) =>{
        mailService.getMailIndexById(mailToUpdateId).then(mailInd=>{
            var mailToUpdate = this.state.mails[mailInd];
            mailToUpdate.isStarred = !mailToUpdate.isStarred;
            mailService.updateMail(mailInd, mailToUpdate).then(()=>this.loadMails());
        });
    }

    onCompose = () => {
        this.setState({composing: true});
    }

    saveDraft = () => {
        this.setState({ composing: false });
    }

    onSendMail = (formData) => {
        mailService.addMail(formData).then(()=>this.loadMails());
    }

    render() {
        return (
            <section className="mail-container">
                <h2>Mail</h2>
                <div className="mail-wrapper main-wrapper">
                    <MailMenu onCompose={this.onCompose}/>
                    <MailList mails={this.state.mails} mailStarToggle={this.mailStarToggle}/>
                    {this.state.composing && <NewMail onClose={this.saveDraft} onSend={this.onSendMail}/>}
                </div>                
            </section>
        )
    }
}