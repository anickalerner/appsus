const { NavLink, withRouter } = ReactRouterDOM
import { InboxIcon } from '../../../cmps/Icons.jsx';

function _MailMenu(props) {
    return (
        <div className="mail-menu-wrapper">
            <button type="button" onClick={props.onCompose}>Compose</button>
            <ul>
                <li>
                    <InboxIcon size="1em" />
                    <NavLink exact activeClassName='active-nav' to="/mail/filter/inbox">Inbox</NavLink>
                </li>
                <li><NavLink exact activeClassName='active-nav' to="/mail/filter/starred">Starred</NavLink></li>
                <li><NavLink exact activeClassName='active-nav' to="/mail/filter/sent">Sent</NavLink></li>
                <li><NavLink exact activeClassName='active-nav' to="/mail/filter/drafts">Drafts</NavLink></li>
            </ul>
        </div>
    )
}
export const MailMenu = withRouter(_MailMenu)