const { NavLink, withRouter } = ReactRouterDOM;
import { NoteIcon, ReminderIcon, ArchiveIcon } from '../../../cmps/Icons.jsx';

function _KeepMenu(props) {
    const { tab } = props
    return <div className="side-bar-menu">
        <h2>Keep</h2>
        <div>
            <NavLink exact activeClassName='active-nav' to="/keep"><NoteIcon size="1em" /><span>Notes</span></NavLink>
            <NavLink exact activeClassName='active-nav' to="/keep/reminder"><ReminderIcon size="1em" /><span>Reminders</span></NavLink>
            <NavLink exact activeClassName='active-nav' to="/keep/archive"><ArchiveIcon size="1em" /><span>Archvie</span></NavLink>
        </div>
    </div>
}

export const KeepMenu = withRouter(_KeepMenu);