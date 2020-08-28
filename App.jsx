const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import Home from './Home.jsx'
import Books from './apps/books/Books.jsx';
import Mail from './apps/mail/Mail.jsx';
import Keep from './apps/keep/Keep.jsx';
import { AppHeader } from './cmps/AppHeader.jsx'

export class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <AppHeader/>
                    <main>
                        <Switch>
                            <Route component={Mail} path="/mail/(filter)?/:filter?" />
                            <Route component={Books} path="/books" />
                            <Route component={Keep} path="/keep/:filter?" />
                            <Route component={Home} path="/" />

                        </Switch>
                    </main>

                </div>
            </Router>
        )
    }
}

