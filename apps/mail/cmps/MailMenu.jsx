const { NavLink, withRouter } = ReactRouterDOM
import { InboxIcon, StarFullIcon, PaperPlaneIcon, DraftIcon } from '../../../cmps/Icons.jsx';

function _MailMenu(props) {
    return (
        <div className="side-bar mail-menu-wrapper">
            <h2>Mail</h2>

            <div className="compose-btn-container">
                <div onClick={props.onCompose} className="compose-btn btn"></div>
            </div>
            <ul>
                <li>
                    <InboxIcon size="1em" />
                    <NavLink exact activeClassName='active-nav' to="/mail/filter/inbox">Inbox</NavLink>
                </li>
                <li>
                    <StarFullIcon size="1em"/>
                    <NavLink exact activeClassName='active-nav' to="/mail/filter/starred">Starred</NavLink></li>
                <li>
                    <PaperPlaneIcon/>
                    <NavLink exact activeClassName='active-nav' to="/mail/filter/sent">Sent</NavLink></li>
                <li>
                    <DraftIcon/>
                    <NavLink exact activeClassName='active-nav' to="/mail/filter/drafts">Drafts</NavLink></li>
            </ul>
        </div>
    )
}
export const MailMenu = withRouter(_MailMenu)