import { MailList } from './cmps/MailList.jsx';
import { mailService } from './service/mail-service.js';

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
                <MailList mails={this.state.mails} />
            </section>
        )
    }
}