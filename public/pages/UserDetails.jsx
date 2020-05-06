import userService from '../services/userService.js';
import bugService from '../services/bugService.js';
import Navbar from '../components/Layout/Navbar.jsx';

export default class UserDetails extends React.Component {
  state = { user: null };

  componentDidMount() {
    this.loadUser();
  }

  loadUser = () => {
    const id = this.props.match.params.userId;
    userService.getById(id).then((user) => {
      this.setState({ user });
    });
  };

  getUserBugsNo = (user) => {
    return bugService.getUserBugsNo(user);
  };

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        {!user ? (
          <p>Loading...</p>
        ) : (
          <div className='user-container'>
            <div className='grid-2 card-form'>
              <div>
                <i className='fas fa-user-circle fa-5x text-dark'></i>
              </div>
              <div className='text-left'>
                <h3>
                  {user.username}{' '}
                  <p className='badge badge-dark'>
                    permissions: {user.isAdmin ? 'administrator' : 'user'}
                  </p>
                  <p className='badge badge-danger'>
                    bugs: #{this.getUserBugsNo(user)}
                  </p>
                </h3>
              </div>
            </div>
            <button
              className='btn btn-primary'
              onClick={() => this.props.history.goBack()}
            >
              Back
            </button>
          </div>
        )}
      </React.Fragment>
    );
  }
}
