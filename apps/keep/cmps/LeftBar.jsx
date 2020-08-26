export class LeftBar extends React.Component{
    state = {
        tab: 'notes'
    }

    render(){
        return <ul className="left-bar">
            <li>Notes</li>
            <li>Reminders</li>
            <li>Archive</li>
            <li>Bin</li>
        </ul>
    }
}