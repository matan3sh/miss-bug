const { Link } = ReactRouterDOM;

export default class Login extends React.Component {
  state = {
    username: '',
    password: '',
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
    const credentials = {
      username: this.state.username,
      password: this.state.password,
    };
    this.props.onLogin(credentials);
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className='form-container'>
        <h1>
          Account <span className='text-primary'>Login</span>
        </h1>
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
          <input
            type='submit'
            value='Login'
            className='btn btn-primary btn-block'
          />
        </form>
        <h3>
          You dont have an account? Please{' '}
          <Link to='/signup'>
            <span className='text-primary'>Sign Up</span>
          </Link>
        </h3>
      </div>
    );
  }
}
