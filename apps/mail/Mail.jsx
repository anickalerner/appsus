import { mailService } from './service/mail-service.js';
import { MailList } from './cmps/MailList.jsx';
import { MailMenu } from './cmps/MailMenu.jsx';

export default class Mail extends React.Component {

    state = {
        mails: []
    };

    componentDidMount() {
        this.loadMails();
    }

    loadMails() {
        mailService.query().then(mails => this.setState({ mails }));
    }

    render() {
        return (
            <section className="mail-container">
                <h2>Mail</h2>
                <div className="mail-wrapper">
                <MailMenu/>
                <MailList mails={this.state.mails} />
                </div>
            </section>
        )
    }
}