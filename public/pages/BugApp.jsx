import bugService from '../services/bugService.js';
import userService from '../services/userService.js';

import Alert from '../components/Shared/Alert.jsx';
import Navbar from '../components/Layout/Navbar.jsx';
import Login from '../components/Auth/Login.jsx';
import BugEdit from '../components/BugEdit.jsx';
import BugAdd from '../components/BugAdd.jsx';
import BugList from '../components/BugList.jsx';

export default class BugApp extends React.Component {
  state = {
    bugs: null,
    current: null,
    isEdit: false,
    user: userService.getLoggedinUser(),
    alert: false,
  };

  componentDidMount() {
    this.loadBugs();
  }

  onLogin = (credentials) => {
    userService.login(credentials).then((user) => this.setState({ user }));
    if (this.state.user === null) {
      this.setState({ alert: true });
      setTimeout(() => this.setState({ alert: false }), 3000);
    }
  };

  onLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  loadBugs = () => {
    bugService.query().then((bugs) => {
      this.setState({ bugs });
    });
  };

  onDelete = (bugId) => {
    bugService.remove(bugId);
    this.loadBugs();
  };

  onSave = (bug) => {
    bugService
      .save(bug)
      .then((savedBug) => {
        console.log('Bug Successfuly Saved:', savedBug);
      })
      .catch((err) => console.log('Cannot Add Bug', err));
    this.loadBugs();
    this.setState({ isEdit: false });
  };

  onEdit = (bug) => {
    this.setState(({ isEdit }) => ({ isEdit: !isEdit, current: bug }));
  };

  render() {
    const { user, bugs, current, isEdit, alert } = this.state;
    return (
      <React.Fragment>
        <Navbar user={user} onLogout={this.onLogout} />
        <div className='container'>
          {user === null ? (
            <div className='grid-1'>
              {alert ? (
                <div className='form-container'>
                  <Alert alertMsg={'Invalid Credentials'} />
                </div>
              ) : (
                ''
              )}
              <Login onLogin={this.onLogin} />
            </div>
          ) : (
            <div className='grid-2'>
              <div className='card-form'>
                {isEdit ? (
                  <BugEdit current={current} onSave={this.onSave} />
                ) : (
                  <BugAdd onSave={this.onSave} user={user.username} />
                )}
              </div>
              <div>
                {bugs && (
                  <BugList
                    bugs={bugs}
                    onDelete={this.onDelete}
                    onEdit={this.onEdit}
                    user={user}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
