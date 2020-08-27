import { MailSubject } from './MailSubject.jsx';
import { MailControls } from './MailControls.jsx';
//import { MailFrom } from './MailControls.jsx';
//import { MailControls } from './MailControls.jsx';

export class MailRow extends React.Component {
    state = {
        isHovering: false
    };
    
    starClicked = () => {
        this.props.mailStarToggle(this.props.mail.id);
    }

    handleMouseHover = () => {
        this.setState({isHovering: !this.state.isHovering});
    }

    getHoverComponent = (mail) => {
        if (this.state.isHovering){
            return <td>is hovering</td>
        }
        else{
           return <MailDate date={mail.sentAt} />
        }
    }

    render() {
        const mail = this.props.mail;
        return (
            <tr onMouseEnter={this.handleMouseHover}
                onMouseLeave={this.handleMouseHover}>
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