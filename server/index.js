const axios = require('axios').default;
var express = require('express');
var http = require('http');

const app = express()

var compression = require('compression');
app.use(compression());

// store session state in browser cookie
// var cookieSession = require('cookie-session');
// app.use(cookieSession({
//     keys: ['secret1', 'secret2']
// }));

// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser');
// create application/json parser
var jsonParser = bodyParser.json()

app.use(jsonParser);

// respond to all requests
// app.use(function(req, res){
//   res.end('Hello from Connect!\n');
// });

app.use('/restaurants/api/login', function login(req, res, next) {
    let responeData;
    axios.post('http://localhost:7000/login', req.body)
      .then(function (response) {
          responeData = response.data
          res.json(responeData);
      })
      .catch(function (error) {
          res.status(error.response.status || '500')
          res.json(error.response.data)
      });
  });

app.use('/restarunts/api/signup', function signup(req, res, next) {
    // let buff = new Buffer(req.body.password, 'base64');
    // let text = buff.toString('ascii');
    axios.post('http://localhost:7000/signup/', req.body)
        .then(function (resposne) {
            res.json(resposne.data)
        })
        .catch(function (error) {
            res.status(error.response.status || '500')
            res.json(error.response.data)
        })
})

app.use('/restaurants/api/restaurants', function getListOfRestaurants(req, res, next) {
    axios.get('http://localhost:7000/restaurants/', {headers: {
        'x-access-token': req.headers.xaccesstoken
    }})
      .then(function (response) {
          res.json(response.data);
      })
      .catch(function (error) {
          res.status(error.response.status || '500')
          res.json(error.response.data)
      });
})

app.use('/restarunts/api/restaurants/:restautantId', function getListOfRestaurants(req, res, next) {
    const { restautantId } = req.params
    axios.get(`http://localhost:7000/restaurant/${restautantId}`)
      .then(function (response) {
          responeData = response.data
          res.json(responeData);
      })
      .catch(function (error) {
          res.status(error.response.status || '500')
          res.json(error.response.data)
      });
})

//create node.js http server and listen on port
http.createServer(app).listen(3333);