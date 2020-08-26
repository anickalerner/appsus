const { NavLink, withRouter } = ReactRouterDOM

function _NavBar(props) {
    // function goBack() {
    //     props.history.goBack()
    // }
    return (
        <nav>
            <NavLink exact activeClassName='active-nav' to="/">Home</NavLink>
            <NavLink to="/books" activeClassName='active-nav'>Books</NavLink>
            <NavLink to="/mail" activeClassName='active-nav'>Mail</NavLink>
            <NavLink to="/keep" activeClassName='active-nav'>Keep</NavLink>
        </nav>
    )
}
export const NavBar = withRouter(_NavBar)