import { AppsMenuIcon } from './AppsMenuIcon.jsx';
import { NoteSearch } from '../apps/keep/cmps/NoteSearch.jsx';
import { MailSearch } from '../apps/mail/cmps/MailSearch.jsx';
import eventBus from '../service/event-bus-service.js';
const { Link } = ReactRouterDOM
export class AppHeader extends React.Component {

    state={
        isInKeep: false,
        isInMail: false
    }

    componentDidMount(){
        eventBus.on('change-app', (app)=>{
            console.log('Is in app:', app);
            this.setState({isInKeep: (app === 'keep'), isInMail: (app === 'mail')});
        })
    }

    render() {
        return (
            <header>
                <div className="logo">
                    <Link to="/">Appsus</Link>
                </div>
                {this.state.isInKeep && <NoteSearch /> }
                {this.state.isInMail && <MailSearch />}
                <AppsMenuIcon />
            </header>
        )
    }

}