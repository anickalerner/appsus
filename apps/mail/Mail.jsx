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
        document.getElementsByTagName('body')[0].classList.add('mail-app-body');
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

    saveDraft = (formData) => {
        this.setState({ composing: false });
    }

    onSendMail = (formData) => {
        mailService.addMail(formData).then(()=>this.loadMails());
    }

    onDeleteMail = (mail) => {
        //mailService.deleteMail(mail).then();
    }

    render() {
        return (
            <section className="mail-container">
                <div className="mail-wrapper main-wrapper">
                    <MailMenu onCompose={this.onCompose}/>
                    <MailList mails={this.state.mails} mailStarToggle={this.mailStarToggle} onDeleteMail={this.onDeleteMail}/>
                    {this.state.composing && <NewMail onClose={this.saveDraft} onSend={this.onSendMail}/>}
                </div>                
            </section>
        )
    }
}