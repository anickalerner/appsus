import { AppsMenuIcon } from './AppsMenuIcon.jsx';
const { Link } = ReactRouterDOM
export function AppHeader(){
    return (
        <header>
            <h1>
            <Link to="/">AppsusHome</Link>
            </h1>
            <AppsMenuIcon/>
        </header>
    )
}