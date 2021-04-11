const express = require('express');
var cors = require('cors');

const app = express();
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cors());

const users = [];

app.get('/user', (req, res) => {
  console.log(req);
  const user = users.find((user) => user.username === req.body.username);
  res.status(201).send(user);
});

app.post('/users', async (req, res) => {
  const user = users.find((user) => user.username === req.body.username);

  if (user) {
    res.status(500).send();
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = { username: req.body.username, plainPassword: req.body.password, hashedPassword: hashedPassword };
    users.push(user);
    res.status(201).send(users);
  } catch (error) {
    res.status(500).send();
  }
});

app.post('/users/login', async (req, res) => {
  const user = users.find((user) => user.username === req.body.username);

  if (!user) {
    return res.status(400).send('User does not exist!');
  }
  try {
    if (await bcrypt.compare(req.body.password, user.hashedPassword)) {
      res.send(user);
    } else {
      res.status(401).send(JSON.stringify('Username and passwords are not match'));
    }
  } catch (error) {
    res.status(500).send();
  }
});

app.listen(3000);
