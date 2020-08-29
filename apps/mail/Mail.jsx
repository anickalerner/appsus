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
        mailOpened: null
    };

    componentDidMount() {
        this.loadMails();
        //    document.getElementsByTagName('body')[0].classList.add('mail-app-body');
        // this.unsubscribeDelete = eventBus.on('delete-mail', (id) => {
        //     console.log('Deleting mail id', id);
        //     this.removeNote(id);
        // })

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.match.params.filter !== this.props.match.params.filter) {
            this.loadMails();
        }
    }

    getFilter = () => {
        const prms = this.props.match.params;
        //var filter = (prms.id) ? ('id:'+prms.id) : this.props.match.params.filter;
        var filter = {
            name: prms.filterName,
            value: prms.filter ? prms.filter : 'all'
        };
        return filter;
    }

    loadMails = () => {
        this.setState({ mailOpened: null });
        var filter = this.getFilter();
        mailService.query(filter).then(mails => this.setState({ mails }));
        if (filter.name === 'id'){
            this.setState({ mailOpened: true});
        }
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

    saveDraft = (formData) => {
        this.setState({ composing: false });
    }

    sendMail = (formData) => {
        formData.isDraft = false;
        mailService.addMail(formData).then((mail) => {
            this.loadMails();
            this.setState({ mailInDraft: null });
        });
    }

    saveMail = (formData) => {
        mailService.addMail(formData).then((mail) => {
            this.setState({ mailInDraft: mail });
            this.loadMails();
        });
    }

    onDeleteMail = (id) => {
        mailService.deleteMail(id).then(() => {
            this.loadMails();
            eventBus.emit('notify', { msg: 'A mail was deleted', type: 'delete-mail' });
        });
    }

    openMail = (mail) => {
        this.setState({ mailOpened: mail }, () => {
            mailService.getMailIndexById(mail.id).then(mailInd => {
                var mailToUpdate = this.state.mails[mailInd];
                mailToUpdate.isRead = true;
                mailService.updateMail(mailInd, mailToUpdate);
            });
        });
    }

    render() {
        return (
            <section className="mail-container">
                <div className="mail-wrapper main-wrapper">
                    <MailMenu onCompose={this.onCompose} onKeyDown={this.saveDraft} />
                    {this.state.mailOpened && <MailDetails mail={this.state.mails[0]} />}
                    {!this.state.mailOpened &&
                        <MailList mails={this.state.mails}
                            mailStarToggle={this.mailStarToggle}
                            onDeleteMail={this.onDeleteMail}
                            openMail={this.openMail} />}
                    {this.state.composing && <NewMail onClose={this.saveDraft} onSend={this.sendMail} onSave={this.saveMail} draft={this.state.mailInDraft} />}
                </div>
            </section>
        )
    }
}