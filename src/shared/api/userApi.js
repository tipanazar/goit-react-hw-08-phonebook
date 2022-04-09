import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

const addToken = token => {
  axios.defaults.headers.common.Autorization = `Bearer ${token}`;
};

const signup = async userData => {
  const { data: result } = await axios.post('/users/signup', userData);
  console.log('Reg DONE');
  addToken(result.token);
  return result;
};

const login = async userData => {
  console.log('login', userData)
  const { data: result } = await axios.post('users/login', userData);
  addToken(result.token);
  console.log('Login DONE', result.token);
  return result;
};

const logout = async userToken => {
  console.log('logoutAPI', userToken)
  const { data: result } = await axios.post('users/logout');
  // const { data: result } = await axios.post('users/logout', userToken);
  console.log('Logout', result);
  return result;
};

const currentUser = async token => {
  addToken(token);
  const { data: result } = await axios.get('users/current');
  return result;
};

const userApi = {
  signup,
  login,
  logout,
  currentUser,
};

export default userApi;