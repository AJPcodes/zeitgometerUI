'use strict';


const
  express = require('express'),
  path = require('path'),
  cors = require('cors'),
  app = express(),
  request = require('superagent'),
  bodyParser = require('body-parser'),
  PORT = process.env.PORT || 8080;


//middleware to allows CORS
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(cors())
app.use(express.static(path.join(__dirname, 'dist')))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get("/", (req, res) => {

  res.render('index')

})

app.post('/api', (req, res) => {

  console.log('request for ', req.body)

  request
    .get(req.body.apiEndpoint)
    .end(function (err, response) {
      if (err) {return res.header(204); res.send({})}

      console.log(typeof response.body.data)
      res.status(200).json({data: response.body.data})
    })


});

app.listen(PORT, () => {
  console.log(`ZeitgometerUI API listening on port ${PORT}`)
})

