const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;
const history = History.createBrowserHistory();

import BugApp from './pages/BugApp.jsx';
import Signup from './components/Auth/Signup.jsx';
import Login from './components/Auth/Login.jsx';
import UsersList from './pages/Admin/UsersList.jsx';
import UserDetails from './pages/UserDetails.jsx';

export class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact component={BugApp} path='/' />
          <Route exact component={UsersList} path='/users' />
          <Route
            exact
            component={UserDetails}
            path='/users/:userId'
            history={history}
          />
          <Route exact component={Login} path='/login' />
          <Route exact component={Signup} path='/signup' />
        </Switch>
      </Router>
    );
  }
}
