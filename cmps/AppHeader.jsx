import { AppsMenuIcon } from './AppsMenuIcon.jsx';
import {NoteSearch} from '../apps/keep/cmps/NoteSearch.jsx'
const { Link, withRouter } = ReactRouterDOM
function _AppHeader(props){
    console.log(props.match.params);
    return (
        <header>
            <div className="logo">
            <Link to="/">Appsus</Link>
            </div>
            <AppsMenuIcon/>
        </header>
    )
}

export const AppHeader = withRouter(_AppHeader);