const express = require('express');
const router = express.Router();
const passport = require('../passport');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken')
const authUser = require('../middlewares/authUser')
dotenv.config();

// Route to redirect in Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

router.get('/google/callback', 
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const payload = {
      user: {
        id: req.user.id,
        role: "user"
      }
    };
    console.log("callback payload is ", payload);
    jwt.sign(payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.redirect(`${process.env.FRONTEND_URI}/oauth-callback?token=${token}`);
      }
    )
  }
);

router.get('/protected', authUser, (req,res) => {
  res.send('Hello, ' + req.user.username);
})

router.get('/logout', (req, res) => {
  req.logout(() => {
      req.flash('success_msg', 'You are logged out');
      res.redirect('/');
  });
});

module.exports = router;
