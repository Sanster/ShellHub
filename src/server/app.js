var express = require('express')
var app = express()
var passport = require('passport')
var Strategy = require('passport-local').Strategy
var server = require('http').Server(app)
var io = require('socket.io')(server)
var path = require('path')

var connectDatabase = require('./db')
var User = require('./models/user')

var webpack = require('webpack')
var webpackConfig = require('../../webpack.config')
var compiler = webpack(webpackConfig)

app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}))

app.use(require("webpack-hot-middleware")(compiler))

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy((username, password, cb) => {
    User.findOne({ 'name': username }, (err, user) => {
      if (err) { return cb(err) }
      if (!user) { return cb(null, false) }
      if (user.password != password) { return cb(null, false) }
      return cb(null, user)
    })
  }))

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser((user, cb) => {
  cb(null, user._id)
})

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) { return cb(err) }
    cb(null, user)
  })
})

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../..', 'build')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'))
})

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/')
  })

connectDatabase('mongodb://localhost/test');
server.listen(3000)

// (async () => {
//   try {
//     const db = await connectDatabase('mongodb://localhost/test');
//     console.log(`Connected to mongodb ${db.host}:${db.port}/${db.name}`);

//     await server.listen(3000)
//     console.log("Listen at port 3000")
//   } catch (error) {
//     console.error('Unable to connect to mongodb');
//   }
// })();

io.on('connection', socket => {
  // socket.on('get user sessions', userId => {
  //   let sessionsGrouped = await Session.aggregate({
  //     $group: { _id: "$sessionGroupId", children: { $push: "$$ROOT" }}
  //   })
  // })
})

