const { NavLink, withRouter } = ReactRouterDOM

function _NavBar(props) {
    return (
        <div className="apps-menu aps-box-shadow-big">
            <nav>
                <NavLink exact activeClassName='active-nav' to="/">Home</NavLink>
                <NavLink to="/books" activeClassName='active-nav'>Books</NavLink>
                <NavLink to="/mail" activeClassName='active-nav'>Mail</NavLink>
                <NavLink to="/keep" activeClassName='active-nav'>Keep</NavLink>
            </nav>
        </div>
    )
}
export const NavBar = withRouter(_NavBar)