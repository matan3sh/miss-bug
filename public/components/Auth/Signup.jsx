const { Link } = ReactRouterDOM;

import userService from '../../services/userService.js';
import Navbar from '../Layout/Navbar.jsx';
import Alert from '../Shared/Alert.jsx';

export default class Signup extends React.Component {
  state = {
    username: '',
    password: '',
    passConfirmation: '',
    alert: false,
  };

  onChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => {
      return {
        ...prevState,
        [field]: value,
      };
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { passConfirmation, password } = this.state;
    if (password !== passConfirmation) {
      this.setState({ alert: true });
      setTimeout(() => this.setState({ alert: false }), 2500);
    } else {
      const credentials = {
        username: this.state.username,
        password: this.state.password,
      };
      userService.signup(credentials);
      this.props.history.push('/');
    }
  };

  render() {
    const { username, password, passConfirmation, alert } = this.state;
    return (
      <React.Fragment>
        <Navbar />
        <div className='form-container'>
          <h1>
            Account <span className='text-primary'>Signup</span>
          </h1>
          {alert ? <Alert alertMsg={'Password Not Match'} /> : ''}
          <form onSubmit={this.onSubmit}>
            <div className='form-group'>
              <label htmlFor='name'>Username</label>
              <input
                type='text'
                name='username'
                value={username}
                onChange={this.onChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='password'>Password</label>
              <input
                type='password'
                name='password'
                value={password}
                onChange={this.onChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='passConfirmation'>Confirm Password</label>
              <input
                type='password'
                name='passConfirmation'
                value={passConfirmation}
                onChange={this.onChange}
              />
            </div>
            <input
              type='submit'
              value='Signup'
              className='btn btn-primary btn-block'
            />
          </form>
          <h3>
            Already have an account? Please{' '}
            <Link to='/'>
              <span className='text-primary'>Login</span>
            </Link>
          </h3>
        </div>
      </React.Fragment>
    );
  }
}
