const express = require('express');
const router = express.Router();
const passport = require('../passport');
const dotenv = require("dotenv");
dotenv.config();

// Route για την ανακατεύθυνση στη Google
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));


// Route για την επεξεργασία της απάντησης της Google
router.get('/google/callback', 
  passport.authenticate('google', { session: true }),
  (req, res) => {
    // Αν η αυθεντικοποίηση είναι επιτυχής, ανακατευθύνετε τον χρήστη στο frontend της εφαρμογής σας
    res.redirect(process.env.FRONTEND_URI || '/');
  }
);

module.exports = router;
