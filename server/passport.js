const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserModel = require("./models/userModel");
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      const {id, displayName, emails} = profile;
      try {
        let user = await UserModel.findOne({ googleId: id });
        if (user) {
          return done(null, user);
        } else {
          user = new UserModel({
            googleId: id,
            username: displayName,
            email: emails[0].value,
          });
          await user.save();
          return done(null, user);
        }
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  console.log("serialize user:", user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id);
    console.log("deserialize user:", userFound);
    done(null, user);
});

module.exports = passport;
