const KEY = 'loggedinUser';

var gUser = _loadUser();

export default {
  query,
  login,
  logout,
  signup,
  remove,
  getById,
  getLoggedinUser,
};

function query() {
  return axios.get('/api/users').then((res) => res.data);
}

function remove(userId) {
  return axios.delete(`/api/users/${userId}`).then((res) => res.data);
}

function getById(userId) {
  return axios.get(`/api/users/${userId}`).then((res) => res.data);
}

function login(credentials) {
  return axios
    .post('/api/login', credentials)
    .then((res) => res.data)
    .then((user) => {
      _handleLoggedinUser(user);
      return user;
    });
}

function signup(credentials) {
  return axios
    .post('/api/signup', credentials)
    .then((res) => res.data)
    .then((user) => {
      _handleLoggedinUser(user);
      return user;
    });
}

function _handleLoggedinUser(user) {
  gUser = user;
  sessionStorage.setItem(KEY, JSON.stringify(user));
}

function getLoggedinUser() {
  return gUser;
}

function logout() {
  return axios.post('/api/logout').then(() => {
    _handleLoggedinUser(null);
  });
}

function _loadUser() {
  return JSON.parse(sessionStorage.getItem(KEY));
}
