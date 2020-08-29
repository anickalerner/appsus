const { NavLink, withRouter } = ReactRouterDOM
import { InboxIcon, StarFullIcon, PaperPlaneIcon, DraftIcon } from '../../../cmps/Icons.jsx';

function _MailMenu(props) {
    return (
        <div className="side-bar mail-menu-wrapper">
            <h2>Mail</h2>

            <div className="compose-btn-container">
                <div onClick={props.onCompose} className="compose-btn btn"></div>
            </div>
            <div className="side-bar-menu">
                <NavLink exact activeClassName='active-nav' to="/mail/filter/inbox"><InboxIcon size="1em" /><span>Inbox</span></NavLink>
                <NavLink exact activeClassName='active-nav' to="/mail/filter/starred"><StarFullIcon size="1em" /><span>Starred</span></NavLink>
                <NavLink exact activeClassName='active-nav' to="/mail/filter/sent"><PaperPlaneIcon /><span>Sent</span></NavLink>
                <NavLink exact activeClassName='active-nav' to="/mail/filter/drafts"><DraftIcon /><span>Drafts</span></NavLink>
            </div>
        </div>
    )
}
export const MailMenu = withRouter(_MailMenu)