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
  var writer = csvWriter({sendHeaders: false});
  writer.pipe(fs.createWriteStream('ranking.csv', {flags : 'a'}))
  writer.write({Name: 'name', Stock: 'stock', Profit: 'profit', Rate: 'rate', Date: 'date'})
  writer.end();

  rank_data = [];

  fs.createReadStream('ranking.csv')
    .pipe(csv())
    .on('data', (data) => rank_data.push(data))
    .on('end', () => {
      
      res.render('ranking', {title: 'ranking', rankarray: rank_data});
  });
});

router.post('/score', function(req, res, next) {
  var parsedUrl = url.parse(req.url);
  var qObj = querystring.parse(parsedUrl.query);

  res.render('score', { earnedmoney1: qObj['earnedmoney1'],
                        earnedmoney2: qObj[qObj['earnedmoney2']],
                        earnedmoney3: qObj[qObj['earnedmoney3']],
                      });
});



router.get('/selection', function(req, res, next) {
  res.render('selection', { title: 'selection' });
});

module.exports = router;
