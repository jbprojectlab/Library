const express = require('express');
const volleyball = require('volleyball');
const expressSession = require('express-session');
const Sequelize = require('sequelize');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const db = new Sequelize('postgres://localhost/passport-lecture-demo-1807');
const User = db.define('user', {
  googleId: Sequelize.STRING,
  email: Sequelize.STRING,
  favoriteNumber: {
    type: Sequelize.INTEGER,
    defaultValue: () => {
      return Math.floor(Math.random() * 100);
    }
  }
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(expressSession({
  secret: 'I like passsport'
}));
app.use(volleyball);
app.use(express.static(__dirname));

// *** OAUTH STUFF ***

// set up various necessary passport things
app.use(passport.initialize());
// integrate passport with our express session middleware
app.use(passport.session());

// tell passport what to store about a user on the express session
passport.serializeUser((user, done) => {
  // put the user id on the session (somewhere)
  done(null, user.id);
});
// tell passport how to figure out the FULL user data based on what's stored for the currently logged in user on the express session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    // establish `req.user` (as equal to the user we found)
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// construct our google strategy with application specific info
const consumerInfo = {
  clientID: '912013101092-odf3ojk5vadtg0h1616n88p7mrpmctlb.apps.googleusercontent.com',
  clientSecret: 'LQUQ-sgi3ly3t_JEFQ5mOqRu',
  callbackURL: '/oauth/google/callback'
};
const afterGoogleLogin = async (accessToken, refreshToken, profile, done) => {
  try {
    // find or create a user in OUR system that corresponds the this newly logged in google user
    const result = await User.findOrCreate({
      where: {
        googleId: profile.id
      },
      defaults: {
        email: profile.emails[0].value
      }
    });
    const user = result[0];
    // somehow store them as the logged in user (for the requesting client)
    done(null, user);
  } catch (error) {
    // if there was an error, tell passport about it
    done(error);
  }
};
const strategy = new GoogleStrategy(
  consumerInfo,
  afterGoogleLogin
);

// register our google strategy with passport (so we can properly utilize it)
passport.use(strategy);

// when the user first requests that they WANT to login with google
app.get('/oauth/google', passport.authenticate('google', {
  // permission scope
  scope: 'email'
}));
// when the user has FINISHED logging in with google
app.get('/oauth/google/callback', passport.authenticate('google', {
  successRedirect: '/success.html'
}));

// *** END OF OAUTH STUFF ***

app.get('/api/me', (req, res) => {
  // MAGIC!
  res.json(req.user);
});

db.sync()
.then(() => {
  const port = 3000;
  app.listen(port, err => {
    if (err) console.error(err);
    else console.log('Server trying to help on port', port);
  });
})
.catch(err => {
  console.error(err);
});
