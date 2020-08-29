const { NavLink, withRouter } = ReactRouterDOM
import { BookIcon, LightBulbIcon, MailIcon } from './Icons.jsx';
function _NavBar(props) {
    return (
        <div className="apps-menu aps-box-shadow-big rounded-small">
            <nav>
                <NavLink to="/books" activeClassName='active-nav' onClick={props.onClick}>
                    <BookIcon size="2.5em" />
                    <span className="apps-menu-label">Books</span>
                </NavLink>
                <NavLink to="/mail" activeClassName='active-nav' onClick={props.onClick}>
                    <MailIcon size="2.5em" />
                    <span className="apps-menu-label">Mail</span>
                </NavLink>
                <NavLink to="/keep" activeClassName='active-nav' onClick={props.onClick}>
                    <LightBulbIcon size="2.5em" />
                    <span className="apps-menu-label">Keep</span>
                </NavLink>
            </nav>
        </div>
    )
}
export const NavBar = withRouter(_NavBar)