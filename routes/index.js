var express = require('express');
var fs = require('fs');
var csv = require('csv-parser');
var csvWriter = require('csv-write-stream');
var querystring = require('querystring');
var router = express.Router();
var rank_data = [];
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'index' });
});

router.get('/game', function(req, res, next) {

  console.log();
  res.render('game', { title: 'game' });
});

router.get('/ranking', function(req, res, next) {
  rank_data = [];
  fs.createReadStream('ranking.csv')
    .pipe(csv())
    .on('data', (data) => rank_data.push(data))
    .on('end', () => {
      console.log(rank_data);
      res.render('ranking', {title: 'ranking', rankarray: rank_data});
    });
});

router.post('/ranking', function(req, res, next) {
  let body = req.body;
  console.log(req);
  let today = new Date();
  var writer = csvWriter({sendHeaders: false});
  writer.pipe(fs.createWriteStream('ranking.csv', {flags : 'a'}));

  writer.write({Name: body.name , Profit: body.profit , Rate: (((body.profit)/10000)*100).toFixed(2), Date: today.toLocaleString()});
  writer.end();

  rank_data = [];

  fs.createReadStream('ranking.csv')
    .pipe(csv())
    .on('data', (data) => rank_data.push(data))
    .on('end', () => {
      
      res.render('ranking', {title: 'ranking', rankarray: rank_data});
  });
});

router.get('/score', function(req, res, next) {
  var parsedUrl = url.parse(req.url);
  var qObj = querystring.parse(parsedUrl.query);

  res.render('score', { earnedmoney1: qObj['earnedmoney1'],
                        earnedmoney2: qObj['earnedmoney2'],
                        earnedmoney3: qObj['earnedmoney3'],
  });
});



router.get('/selection', function(req, res, next) {
  res.render('selection', { title: 'selection' });
});

module.exports = router;
