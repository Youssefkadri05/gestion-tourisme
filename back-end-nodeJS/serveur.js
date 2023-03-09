const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();
const sequelize = new Sequelize('mysql://user:password@localhost:3306/mydatabase');

const User = sequelize.define('User', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  mot_de_passe: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.validPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(8080, () => {
  console.log('Server started on port 8080');
});
