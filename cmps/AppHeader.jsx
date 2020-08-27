import { AppsMenuIcon } from './AppsMenuIcon.jsx';
const { Link } = ReactRouterDOM
export function AppHeader(){
    return (
        <header>
            <div className="logo">
            <Link to="/">Appsus</Link>
            </div>
            <AppsMenuIcon/>
        </header>
    )
}