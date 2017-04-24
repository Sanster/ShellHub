var express = require('express')
var app = express()
var passport = require('passport')
var Strategy = require('passport-local').Strategy
var server = require('http').Server(app)
var io = require('socket.io')(server)
var path = require('path')
var ssh = require('ssh2').Client
var config = require('./config/config.json')

var connectDatabase = require('./db')
var User = require('./models/user')

var webpack = require('webpack')
var webpackConfig = require('../../webpack.config')
var compiler = webpack(webpackConfig);

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
app.use(require('morgan')('combined'))
app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({ extended: true }))
app.use(require('body-parser').json())
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '../..', 'build')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../..', 'build/index.html'))
})

app.use('/api', require('./routes'))

app.post('/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/')
  });

(async() => {
  try {
    const db = await connectDatabase('mongodb://localhost/test');
    console.log(`Connected to mongodb ${db.host}:${db.port}/${db.name}`);

    await server.listen(3000)
    console.log("Listen at port 3000")
  } catch (error) {
    console.error('Unable to connect to mongodb');
  }
})();

var termCols
var termRows

io.on('connection', socket => {
  var sshConnection = new ssh()
  socket.on('terminal resize', (cols, rows) => {
    termCols = cols
    termRows = rows
  })

  sshConnection.on('ready', () => {
    sshConnection.shell({
      term: 'xterm',
      cols: termCols,
      rows: termRows
    }, (err, stream) => {
      if (err) {
        console.log('connect ssh shell error')
        console.log(err.message)
        return
      }

      socket.on('data', data => {
        stream.write(data)
      })

      stream.on('data', data => {
        socket.emit('data', data.toString())
      })

      stream.on('close', (code, signal) => {
        console.log(`Stream close, code: ${code}, signal: ${signal}`)
        sshConnection.end()
        socket.disconnect()
      })

      stream.stderr.on('data', err => {
        console.log(`STDERR: ${err}`)
      })
    })
  })

  sshConnection.on('end', () => {
    socket.disconnect()
  })

  sshConnection.on('close', () => {
    socket.disconnect()
  })

  sshConnection.on('error', (err) => {
    console.log(`ssh connection on error: ${err}`)
  })

  sshConnection.on('keyboard-interactive', (name, instructions, instructionsLang, prompts, finish) => {
    console.log('Connection: keyboard-interactive')
    finish(config.user.password)
  })

  sshConnection.connect({
    host: '127.0.0.1',
    port: 22,
    username: config.user.name,
    password: config.user.password,
    tryKeyboard: true
  })

})

