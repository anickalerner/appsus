import { AppsMenuIcon } from './AppsMenuIcon.jsx';
import { NoteSearch } from '../apps/keep/cmps/NoteSearch.jsx';
import eventBus from '../service/event-bus-service.js';
const { Link } = ReactRouterDOM
export class AppHeader extends React.Component {

    state={
        isInKeep: false
    }

    componentDidMount(){
        eventBus.on('change-app', (isInKeep)=>{
            console.log('Is in keep:', isInKeep);
            this.setState({isInKeep});
        })
    }

    render() {
        return (
            <header>
                <div className="logo">
                    <Link to="/">Appsus</Link>
                </div>
                {this.state.isInKeep && <NoteSearch /> }
                <AppsMenuIcon />
            </header>
        )
    }

}