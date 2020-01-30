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
  res.render('game', { title: 'game' });
});

router.get('/ranking', function(req, res, next) {
  console.log(req);
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
  function compareBySecond(a, b) {
    var aArr = a.split(',');
    var bArr = b.split(',');
    return aArr[1] - bArr[1];
  }

  let body = req.body;
  console.log(body);
  let today = new Date();
  var writer = csvWriter({sendHeaders: false});
  writer.pipe(fs.createWriteStream('ranking.csv', {flags : 'a'}));

  writer.write({Name: body.name , Profit: body.profit , Rate: (((body.profit)/10000)*100).toFixed(2), Date: today.toLocaleString()});
  writer.end();

  rank_data = [];

  fs.createReadStream('ranking.csv')
    .pipe(csv())
    .on('data', (data) => {
      rank_data.push(data);
      rank_data.sort(function(a, b) {
        return parseFloat(b.Profit) - parseFloat(a.Profit);
      });
    })
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
