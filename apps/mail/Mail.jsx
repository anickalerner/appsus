import { mailService } from './service/mail-service.js';
import { MailList } from './cmps/MailList.jsx';
import { MailMenu } from './cmps/MailMenu.jsx';
import { NewMail } from './cmps/NewMail.jsx';
import { MailDetails } from './cmps/MailDetails.jsx';
import eventBus from '../../service/event-bus-service.js';

export default class Mail extends React.Component {

    state = {
        mails: [],
        composing: false,
        mailInDraft: null,
        mailOpened: null,
        filteredByRead: {name: 'isRead', value: 'all'}
    };

    componentDidMount() {
        eventBus.emit('change-app', 'mail');
        this.loadMails();
        const subject = new URLSearchParams(this.props.location.search).get('subject');
        const body = new URLSearchParams(this.props.location.search).get('body');
        if (subject && body) mailService.noteToMail(body, subject).then((mail)=>{
            this.setState({composing: true, mailInDraft: mail});
        });

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.filter !== this.props.match.params.filter) {
            this.loadMails();
        }
    }

    getFilter = () => {
        const prms = this.props.match.params;
        var filter = {
            name: prms.filterName,
            value: prms.filter ? prms.filter : 'all'
        };
        return filter;
    }

    loadMails = () => {
        this.setState({ mailOpened: null });
        var filter = this.getFilter();
        mailService.query(filter, this.state.filteredByRead).then(mails => {
            mails.sort((mail1, mail2) => { return mail2.sentAt - mail1.sentAt});
            var newState = { mails, unreadCount: this.unreadCount };
            if (filter.name === 'id') {
                Object.assign(newState, { mailOpened: true })
            }
            this.setState(newState);
        });
    }

    filterView = (value) => {
        this.setState({filteredByRead: {name: 'isRead', value: value}}, ()=>{
            this.loadMails();
        });
    }

    mailStarToggle = (mailToUpdateId) => {

        mailService.getMailIndexById(mailToUpdateId).then(mailInd => {
            var mailToUpdate = this.state.mails[mailInd];
            mailToUpdate.isStarred = !mailToUpdate.isStarred;
            mailService.updateMail(mailInd, mailToUpdate).then(() => this.loadMails());
        });
    }

    onCompose = () => {
        this.setState({ composing: true });
    }

    closeComposing = () => {
        this.setState({ composing: false, mailInDraft: null });
    }

    sendMail = (formData) => {
        formData.isDraft = false;
        formData.isSent = true;
        formData.sentAt = Date.now();
        if (!formData.id) {
            mailService.addMail(formData).then((mail) => {
                this.loadMails();
                this.setState({ mailInDraft: null });
            });
        }
        else {
            mailService.updateMailProperty(formData.id, formData).then(()=>{
                this.loadMails();                
            })
        }
    }

    saveMail = (formData) => {
        if (!formData.id) {
            mailService.addMail(formData).then((mail) => {
                this.loadMails();
                this.setState({ mailInDraft: mail });
            });
        }
        else {
            mailService.updateMailProperty(formData.id, formData);
        }
    }

    deleteMail = (id) => {
        if (this.state.mailInDraft.id === id) {
            this.setState({ mailInDraft: null });
        }
        mailService.deleteMail(id).then(() => {
            this.loadMails();
            eventBus.emit('notify', { msg: 'A mail was deleted', type: 'delete-mail' });
        });
    }

    openMail = (mail) => {
        this.setState({ mailOpened: mail }, () => {
            this.setIsReadState(mail, true);
        });
    }

    get unreadCount() {
        var count = mailService.getUnreadMailsCount();
        return count;
    }

    markRead = (mail) => {
        this.setIsReadState(mail, !mail.isRead);
    }

    setIsReadState = (mail, _isRead) => {
        mailService.updateMailProperty(mail.id, { isRead: _isRead })
            .then(() => {
                this.setState({ unreadCount: this.unreadCount });
            });
    }

    openDraft = () => {
        this.setState({ composing: true })
    }

    MailMode = () => {
        return (this.state.mailOpened) ?
            <MailDetails mail={this.state.mails[0]} />
            :
            <MailList mails={this.state.mails}
                mailStarToggle={this.mailStarToggle}
                onDeleteMail={this.deleteMail}
                openMail={this.openMail}
                markRead={this.markRead}
                openDraft={this.openDraft}
                filterView={this.filterView}
            />
    }

    render() {
        return (
            <section className="mail-container">
                <div className="mail-wrapper main-wrapper">
                    <MailMenu onCompose={this.onCompose} count={this.state.unreadCount} />
                    {this.MailMode()}
                    {this.state.composing && <NewMail onClose={this.closeComposing} onSend={this.sendMail} onSave={this.saveMail} draft={this.state.mailInDraft} />}
                </div>
            </section>
        )
    }
}