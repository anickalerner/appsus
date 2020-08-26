const { NavLink, withRouter } = ReactRouterDOM;
import {InboxIcon} from '../../../cmps/Icons.jsx';
export function LeftBar (props){
        return <ul className="left-bar">
            <li>Notes</li>
            <li>Reminders</li>
            <li>Archive</li>
            <li>Bin</li>
        </ul>
}
