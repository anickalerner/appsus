const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import Home from './Home.jsx'
import {Books} from './apps/books/Books.jsx';
import {BookDetails} from './apps/books/cmps/BookDetails.jsx';
import Mail from './apps/mail/Mail.jsx';
import Keep from './apps/keep/Keep.jsx';
import { AppHeader } from './cmps/AppHeader.jsx';
import { Notification } from './cmps/Notification.jsx';
import {eventBus} from './service/event-bus-service.js';

export class App extends React.Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <AppHeader />
                    <main>
                        <Switch>
                            {/* <Route component={Mail} path="/mail/id/:id?" />
                            <Route component={Mail} path="/mail/(filter)?/:filter?" /> */}
                            <Route component={Mail} path="/mail/:filterName?/:filter?" />
                            <Route component={BookDetails} path="/book/:id" />
                            <Route component={Books} path="/books" />
                            <Route component={Keep} path="/keep/:label?" />
                            <Route component={Home} path="/" />
                        </Switch>
                    </main>
                    <Notification />
                </React.Fragment>
            </Router>
        )
    }
}

