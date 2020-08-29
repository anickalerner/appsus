const { NavLink, withRouter } = ReactRouterDOM
import { InboxIcon, StarFullIcon, PaperPlaneIcon, DraftIcon } from '../../../cmps/Icons.jsx';
import { UnreadCount } from './UnreadCount.jsx';

function _MailMenu(props) {
    return (
        <div className="side-bar mail-menu-wrapper">
            <h2>Mail</h2>

            <div className="compose-btn-container">
                <div onClick={props.onCompose} className="compose-btn btn"></div>
            </div>
            <div className="side-bar-menu">
                <NavLink exact activeClassName='active-nav' to="/mail/filter/inbox">
                    <InboxIcon size="1em" />
                    <span className="side-bar-menu-item">
                        <span>Inbox</span>
                        <UnreadCount count={props.count} />
                    </span>

                </NavLink>
                <NavLink exact activeClassName='active-nav' to="/mail/filter/starred">
                    <StarFullIcon size="1em" />
                    <span className="side-bar-menu-item">
                        <span>Starred</span>
                    </span>
                </NavLink>
                <NavLink exact activeClassName='active-nav' to="/mail/filter/sent"><PaperPlaneIcon /><span className="side-bar-menu-item"><span>Sent</span></span></NavLink>
                <NavLink exact activeClassName='active-nav' to="/mail/filter/drafts"><DraftIcon /><span className="side-bar-menu-item"><span>Drafts</span></span></NavLink>
            </div>
        </div>
    )
}
export const MailMenu = withRouter(_MailMenu)