import userService from '../services/userService.js';
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

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        {!user ? (
          <p>Loading...</p>
        ) : (
          <div className='container'>
            <div className='grid-1 card-form'>
              <h3>
                User Details: {user.username}{' '}
                <span className='badge badge-dark'>
                  {user.isAdmin ? 'administrator' : 'user'}
                </span>
              </h3>
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
