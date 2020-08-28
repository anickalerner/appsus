const { NavLink, withRouter } = ReactRouterDOM;
import { NoteIcon, ReminderIcon, ArchiveIcon } from '../../../cmps/Icons.jsx';

function _KeepSideBar(props) {
    const {tab} = props
    return <div  className="left-bar side-bar">
        <h2>Keep</h2>
        <ul>
            <li className={`tab ${!tab ? 'highlighted' : ''}`}>
                <NoteIcon size="1em" />
                <NavLink exact activeClassName='active-nav' to="/keep">Notes</NavLink>
            </li>
            <li className={`tab ${(tab === 'reminder') ? 'highlighted' : ''}`}>
                <ReminderIcon size="1em" />
                <NavLink exact activeClassName='active-nav' to="/keep/reminder">Reminders</NavLink>
            </li>
            <li className={`tab ${(tab === 'archive') ? 'highlighted' : ''}`}>
                <ArchiveIcon size="1em" />
                <NavLink exact activeClassName='active-nav' to="/keep/archive">Archive</NavLink>
            </li>
        </ul>
    </div>
}

export const KeepSideBar = withRouter(_KeepSideBar);