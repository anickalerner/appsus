const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM
import Home from './Home.jsx'
import Books from './apps/books/Books.jsx';
import Mail from './apps/mail/Mail.jsx';
import Keep from './apps/keep/Keep.jsx';
import { NavBar } from './cmps/Navbar.jsx'

export class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <header>
                        <NavBar />
                    </header>
                    <main>
                        <Switch>
                            <Route component={Mail} path="/mail" />
                            <Route component={Books} path="/books" />
                            <Route component={Keep} path="/keep" />
                            <Route component={Home} path="/" />

                        </Switch>
                    </main>

                </div>
            </Router>
        )
    }
}

