const { NavLink, withRouter } = ReactRouterDOM;
import { NoteIcon, ReminderIcon, ArchiveIcon, TrashBinIcon } from '../../../cmps/Icons.jsx';

function _LeftBar() {
    return <ul className="left-bar side-bar">
        <li>
            <NoteIcon size="1em" />
            <NavLink exact activeClassName='active-nav' to="/keep/notes">Notes</NavLink>
        </li>
        <li>
            <ReminderIcon size="1em" />
            <NavLink exact activeClassName='active-nav' to="/keep/reminders">Reminders</NavLink>
        </li>
        <li>
            <ArchiveIcon size="1em" />
            <NavLink exact activeClassName='active-nav' to="/keep/archive">Archive</NavLink>
        </li>
        <li>
            <TrashBinIcon size="1em" />
            <NavLink exact activeClassName='active-nav' to="/keep/bin">Bin</NavLink>
        </li>
    </ul>
}

export const LeftBar = withRouter(_LeftBar);