import { MailSubject } from './MailSubject.jsx';
import { MailControls } from './MailControls.jsx';
import { MailActionIcons } from './MailActionIcons.jsx';
const { Redirect } = ReactRouterDOM

export class MailRow extends React.Component {
    state = {
        isHovering: false,
        openMail: false
    };

    starClicked = () => {
        this.props.mailStarToggle(this.props.mail.id);
    }

    handleMouseEnter = () => {
        this.setState({ isHovering: true });
    }

    handleMouseLeave = () => {
        this.setState({ isHovering: false });
    }

    onDeleteMail = () => {
        this.props.onDeleteMail(this.props.mail.id);
    }

    getHoverComponent = (mail) => {
        if (this.state.isHovering) {
            return <MailActionIcons mail={mail} onDelete={this.onDeleteMail} onMarkRead={this.props.markRead} />
        }
        else {
            return <MailDate date={mail.sentAt} />
        }
    }

    onMailRowClicked = () => {
        if (this.props.mail.isDraft) {
            this.props.openDraft();
        }
        else {
            this.setState({ openMail: true }, () => {
                this.props.openMail(this.props.mail);
            });
        }
    }

    get trClassName() {
        var clName = this.state.isHovering ? 'tr-hover' : 'tr';
        clName += ' ';
        clName += this.props.mail.isRead ? 'read' : '';
        return clName;
    }

    render() {
        const mail = this.props.mail;
        if (this.state.openMail) {
            return <Redirect push to={'/mail/id/' + this.props.mail.id} />
        }
        else return (
            <tr onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onClick={this.onMailRowClicked}
                className={this.trClassName}>
                <MailControls mail={mail} starClicked={this.starClicked} />
                <MailFrom from={mail.from} isRead={mail.isRead} />
                <MailSubject subject={mail.subject} body={mail.body} isRead={mail.isRead} />
                {this.getHoverComponent(mail)}
            </tr>
        )
    }
}

function MailFrom({ from, isRead }) {
    return (
        <td>
            {isRead ? from : <strong>{from}</strong>}
        </td>
    )
}

function MailDate({ date }) {
    return (
        <td>
            {new Date(date).toLocaleString()}
        </td>
    )
}