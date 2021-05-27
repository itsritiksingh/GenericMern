const session = require("express-session");
const passport = require("passport"),
  FacebookStrategy = require("passport-facebook").Strategy,
  TwitterStrategy = require("passport-twitter").Strategy,
  GoogleStrategy = require("passport-google-oauth").OAuth2Strategy,
  GitHubStrategy = require("passport-github").Strategy,
  LocalStrategy = require("passport-local").Strategy;
const User = require("../Model/UserModel");

passport.use(
  new LocalStrategy((username, password, done) => {
    const errorMsg = "Invalid username or password";

    User.findOne({ username })
      .then((user) => {
        // if no matching user was found...
        if (!user) {
          return done(null, false, { message: errorMsg });
        }

        // call our validate method, which will call done with the user if the
        // passwords match, or false if they don't
        return user
          .validatePassword(password)
          .then((isMatch) =>
            done(
              null,
              isMatch ? user : false,
              isMatch ? null : { message: errorMsg }
            )
          );
      })
      .catch(done);
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        await new User({ ...req.body, email, password }).save;
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: "278563427332165",
      clientSecret: "990b54475220f6001315708f81b586c6",
      callbackURL: "http://localhost:7000/facebook/callback",
      profileFields: ["id", "email", "name"],
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      // profile._json contains following
      // _json: {
      //     id: '2970505943197187',
      //     email: 'mr.ritik99@gmail.com',
      //     last_name: 'Singh',
      //     first_name: 'Ritik'
      //   }

      //  if error return done(error,null);
      // else if user exist then done(null,user)
      // else create new user done(null,newUser)
    }
  )
);

passport.use(
  new TwitterStrategy(
    {
      consumerKey: "EAiYEGwJXYR4Rpa5ejtnQCjOp",
      consumerSecret: "Oxti9SulDbP0SyKTcFiJClJEjDGbBMBfSx7AVrbEifAK9ECuPj",
      callbackURL: "http://localhost:7000/twitter/callback",
      includeEmail: true,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      // profile._json contains following
      //   _json: {
      //     id: 3018600498,
      //     id_str: '3018600498',
      //     name: 'Ritik ',
      //     screen_name: 'mrritiksingh',
      //     location: '',
      //     description: '',
      //     url: null,
      //     entities: { description: [Object] },
      //     protected: false,
      //     followers_count: 0,
      //     friends_count: 1,
      //     listed_count: 0,
      //     created_at: 'Fri Feb 13 15:57:31 +0000 2015',
      //     favourites_count: 0,
      //     utc_offset: null,
      //     time_zone: null,
      //     geo_enabled: false,
      //     verified: false,
      //     statuses_count: 0,
      //     lang: null,
      //     contributors_enabled: false,
      //     is_translator: false,
      //     is_translation_enabled: false,
      //     profile_background_color: 'C0DEED',
      //     profile_background_image_url: 'http://abs.twimg.com/images/themes/theme1/bg.png',
      //     profile_background_image_url_https: 'https://abs.twimg.com/images/themes/theme1/bg.png',
      //     profile_background_tile: false,
      //     profile_image_url: 'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
      //     profile_image_url_https: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
      //     profile_link_color: '1DA1F2',
      //     profile_sidebar_border_color: 'C0DEED',
      //     profile_sidebar_fill_color: 'DDEEF6',
      //     profile_text_color: '333333',
      //     profile_use_background_image: true,
      //     has_extended_profile: false,
      //     default_profile: true,
      //     default_profile_image: true,
      //     following: false,
      //     follow_request_sent: false,
      //     notifications: false,
      //     translator_type: 'none',
      //     withheld_in_countries: [],
      //     suspended: false,
      //     needs_phone_verification: false
      //   }

      //  if error return done(error,null);
      // else if user exist then done(null,user)
      // else create new user done(null,newUser)
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "351304734537-qiae1rcsspfvcs44l96nh8fathsjji0k.apps.googleusercontent.com",
      clientSecret: "eAQdnxqLAqHMs2iMLxVduBzy",
      callbackURL: "http://localhost:7000/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      // profile._json contains following
      // _json: {
      //     sub: '110342607874380135141',
      //     name: 'ritik singh',
      //     given_name: 'ritik',
      //     family_name: 'singh',
      //     picture: 'https://lh3.googleusercontent.com/a-/AOh14GjU-Q6T-ljRqAYuVuCsmOpG_nE7xKS-o451od8uhg=s96-c',
      //     email: 'mr.ritik99@gmail.com',
      //     email_verified: true,
      //     locale: 'en'
      //   }

      //  if error return done(error,null);
      // else if user exist then done(null,user)
      // else create new user done(null,newUser)
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: "d4eb345e5a73d7c36c27",
      clientSecret: "34b5167e6a9a6c47e98549bd8882e88ed16e59a3",
      callbackURL: "http://localhost:7000/github/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      // profile._json contains following
      // _json: {
      //     _json: {
      //     login: 'chotubhai',
      //     id: 44609236,
      //     node_id: 'MDQ6VXNlcjQ0NjA5MjM2',
      //     avatar_url: 'https://avatars.githubusercontent.com/u/44609236?v=4',
      //     gravatar_id: '',
      //     url: 'https://api.github.com/users/chotubhai',
      //     html_url: 'https://github.com/chotubhai',
      //     type: 'User',
      //     site_admin: false,
      //     name: 'Ritik singh',
      //     company: null,
      //     blog: '',
      //     location: null,
      //     email: null,
      //     hireable: null,
      //     bio: null,
      //     twitter_username: null,
      //     public_repos: 18,
      //     public_gists: 0,
      //     followers: 4,
      //     following: 3,
      //     created_at: '2018-10-30T12:52:58Z',
      //     updated_at: '2021-05-27T02:44:52Z'
      //   }

      //  if error return done(error,null);
      // else if user exist then done(null,user)
      // else create new user done(null,newUser)
    }
  )
);

const passportInitailize = (app) => {
  app.use(
    session({
      //run this command in repl mode to get cryptographically secure secret for production
      //require("crypto").randomBytes(30).toString("hex")
      secret: "775a388e789aa26a7b83b6a2466ed0a015e7ef553302d451a0a46c2c613d",
      resave: false,
      saveUninitialized: false,
      // automatically extends the session age on each request. useful if you want
      // the user's activity to extend their session. If you want an absolute session
      // expiration, set to false
      rolling: true,
      name: "sid", // don't use the default session cookie name
      // set your options for the session cookie
      cookie: {
        httpOnly: true,
        // the duration in milliseconds that the cookie is valid
        maxAge: 20 * 60 * 1000, // 20 minutes
        // recommended you use this setting in production if you have a well-known domain you want to restrict the cookies to.
        // domain: 'your.domain.com',
        // recommended you use this setting in production if your site is published using HTTPS
        // secure: true,
      },
    })
  );

  app.use(passport.initialize());

  /* local ROUTER */
  app.post("/local", passport.authenticate("local"));

  app.post("/signup", passport.authenticate("signup"));

  app.get(
    "/local/callback",
    passport.authenticate("local", { failureRedirect: "/login" }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );

  /* FACEBOOK ROUTER */
  app.get("/facebook", passport.authenticate("facebook"));

  app.get(
    "/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );

  /* TWITTER app */
  app.get("/twitter", passport.authenticate("twitter"));

  app.get(
    "/twitter/callback",
    passport.authenticate("twitter", { failureRedirect: "/login" }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );

  /* GOOGLE app */
  app.get(
    "/google",
    passport.authenticate("google", {
      scope: ["email", "profile"],
    })
  );

  app.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function (req, res) {
      res.redirect("/");
    }
  );

  /* GITHUB app */
  app.get(
    "/github",
    passport.authenticate("github", { scope: ["user:email"] })
  );

  app.get(
    "/github/callback",
    passport.authenticate("github", { failureRedirect: "/login" }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );

  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });
};

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

module.exports = { passportInitailize, ensureAuthenticated };
