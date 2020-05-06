const { NavLink, Link } = ReactRouterDOM;

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className='navbar bg-primary'>
      <h1>
        <i className='fas fa-bug' /> Miss-Bug{' '}
      </h1>
      <ul>
        <li>
          <NavLink activeClassName='nav-active' exact to='/'>
            Bugs
          </NavLink>
        </li>
        {user && (
          <React.Fragment>
            {user.isAdmin && (
              <li>
                <NavLink activeClassName='nav-active' exact to='/users'>
                  Users
                </NavLink>
              </li>
            )}
            <li>
              <NavLink activeClassName='nav-active' onClick={() => onLogout()}>
                Logout
              </NavLink>
            </li>
            <li>
              <img
                src='https://www.krocmemphis.org/wp-content/uploads/2016/10/generic-avatar.png'
                alt='user-avatar'
                className='user-avatar'
              />
              <NavLink activeClassName='nav-active'>{user.username}</NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
