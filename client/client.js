const userName = document.querySelector('.un');
const password = document.querySelector('.pass');

const info = document.querySelector('.info');
const wrapper = document.querySelector('.wrapper');

const _username = document.querySelector('.username');
const _plain = document.querySelector('.plain-password');
const _hashed = document.querySelector('.hashed-password');

let user = {};
login = () => {
  const error = document.querySelector('.error');
  axios
    .post('http://localhost:3000/users/login', {
      username: userName.value,
      password: password.value,
    })
    .then((res) => {
      info.style.display = 'block';
      error.style.display = 'none';
      wrapper.style.display = 'inline-block';
      _username.innerHTML = `${res.data.username}`;
      _plain.innerHTML = `${res.data.plainPassword}`;
      _hashed.innerHTML = `${res.data.hashedPassword}`;
    })
    .catch((err) => {
      wrapper.style.display = 'none';
      error.style.display = 'inline-block';

      error.innerHTML = 'Username or password is wrong!';
    });
};

createUser = () => {
  const complete = document.querySelector('.complete');
  axios
    .post('http://localhost:3000/users', {
      username: userName.value,
      password: password.value,
    })
    .then((res) => {
      complete.style.display = 'inline-block';
      complete.innerHTML = 'Signup completed!';
    })
    .catch((err) => {
      complete.style.display = 'inline-block';
      complete.innerHTML = 'User already exist!';
    });
};
