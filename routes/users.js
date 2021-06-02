var express = require('express');
var router = express.Router();
let UserModel = require('../models/users.js');

/* Sign Up */
router.post('/sign-up', async function (req, res) {
  let user = await UserModel.findOne({ email: req.body.email });

  if (user === null) {
    let newUser = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();
    req.session.user = { _id: newUser._id, username: newUser.username };
    res.redirect('/weather');
  } else {
    let msgErr = false;
    if (user.email === req.body.email) {
      msgErr = true;
      res.render('login', { msgErr });
    }
  }
});

/* Sign In */
router.post('/sign-in', async (req, res) => {
  let user = await UserModel.findOne(
    { email: req.body.email, password: req.body.password },
    function (err) {
      console.log(err);
    }
  );

  if (user === null) {
    res.redirect('/');
  } else {
    req.session.user = { _id: user._id, username: user.username };
    res.redirect('/weather');
  }
});

/* Logout */
router.get('/logout', async (req, res) => {
  req.session.user = null; // Deletes the cookie.
  // req.session.destroy(); // Deletes the session in the database.
  res.redirect('/');
});

module.exports = router;
