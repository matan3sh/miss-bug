import userService from '../../services/userService.js';
import Navbar from '../../components/Layout/Navbar.jsx';
import UserPreview from './UserPreview.jsx';

export default class UsersList extends React.Component {
  state = { users: null, user: userService.getLoggedinUser() };

  componentDidMount() {
    this.loadUsers();
  }

  loadUsers = () => {
    userService
      .query()
      .then((users) =>
        this.setState({ users: users.filter((user) => !user.isAdmin) })
      );
  };

  onLogout = () => {
    userService.logout();
    this.setState({ user: null });
    this.props.history.push('/');
  };

  render() {
    const { user, users } = this.state;
    return (
      <React.Fragment>
        <Navbar user={user} onLogout={this.onLogout} />
        <div className='container'>
          {users && (
            <div className='grid-4'>
              {users.map((user) => (
                <UserPreview key={user.id} user={user} />
              ))}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
