import { MailSubject } from './MailSubject.jsx';
import { MailControls } from './MailControls.jsx';
import { MailActionIcons } from './MailActionIcons.jsx';

export class MailRow extends React.Component {
    state = {
        isHovering: false
    };
    
    starClicked = () => {
        this.props.mailStarToggle(this.props.mail.id);
    }

    handleMouseEnter = () => {
        this.setState({isHovering: true});
    }

    handleMouseLeave = () => {
        this.setState({ isHovering: false });
    }

    onDeleteMail = () => {
        this.props.onDeleteMail(this.props.mail.id);
    }

    getHoverComponent = (mail) => {
        if (this.state.isHovering){
            return <MailActionIcons mail={mail} onDelete={this.onDeleteMail} />
        }
        else{
           return <MailDate date={mail.sentAt} />
        }
    }

    render() {
        const mail = this.props.mail;
        return (
            <tr onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave} className={this.state.isHovering? 'tr-hover' : 'tr'}>
                <MailControls mail={mail} starClicked={this.starClicked} />
                <MailFrom from={mail.from} />
                <MailSubject subject={mail.subject} body={mail.body} />
                {this.getHoverComponent(mail)}
            </tr>
        )
    }
}

function MailFrom({ from }) {
    return (
        <td>
            {from}
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