const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const passport = require("passport");
const passportJWT = require("passport-jwt");
const Sequelize = require('sequelize-values')();

const index = require('./routes/index');
const users = require('./routes/users');
//Models
const models = require("./models");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'SecureSpaceMaker';
var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  // usually this would be a database call:
  var user = models.User.findById(jwt_payload.id).then(function(user){
    if (user) {
      next(null, user.get());
    } else {
      next(null, false);
    }
  })
});
passport.use(strategy);
app.use(passport.initialize());
app.use('/', index);
app.use('/users', users);

app.post("/login",function(req,res) {
  if(req.body.username && req.body.password) {
    var username = req.body.username;
    var password = req.body.password;
  }
  var user = models.User.findOne({where:{username: username}}).
  then(function(user) {
    if(!user){
      res.status(401).json({message:'User does not exist'});
    }
    else {
      if(user.password === password) {
        var payload ={id: user.id};
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({message:"ok", token: token})
      }
      else {
        res.status(401).json({errors: {form: 'Password doesn"t match'} })
      }
    }
  })
  
})

app.get('/products', function(req,res){
  models.Product.findAll({include: [{model: models.Stock, attributes: ['inventory'], nested: true}],}).then(function(products) {
    var product = Sequelize.getValues(products);
    console.log(product);
    product = product.map(p => {
      p['inventory'] = p['Stock']['inventory'] || 0;
      delete p['Stock'];
      return p;
    })
    res.json(product);
  })
})

app.post('/product', function(req,res) {
  console.log("Records are",req.body);
  models.Product.create(req.body).then(product => {
    console.log("New Product is", Sequelize.getValues(product))
    res.json(Sequelize.getValues(product))
  }, error => {
    res.json({error:error});
  })
})

app.put('/product/:id', function(req,res) {
    console.log(req.body,req.params.id);
    models.Product.update(req.body,{where: {id:req.params.id}}).then(product => {
      console.log("updated Product is", Sequelize.getValues(product))
      res.json(Sequelize.getValues(product));
    }).catch(error => {
      res.json({error:error});
    });
})

app.post('/file-upload', function(req, res) {
  console.log(req.body,"please help me god" )
})

app.use(passport.authenticate('jwt', { session: false }));

app.get("/secret", function(req, res){
  res.json({message: "Success! You can not see this without a token"});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

 
//Sync Database
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});

module.exports = app;
