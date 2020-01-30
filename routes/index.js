var express = require('express');
var fs = require('fs');
var csv = require('csv-parser');
var csvWriter = require('csv-write-stream');
var router = express.Router();
var rank_data = [];

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

  res.render('ranking', { ranking: 'ranking' });
});

router.get('/score', function(req, res, next) {
  console.log(req);
  res.render('score', { title: 'score' });
});



router.get('/selection', function(req, res, next) {
  res.render('selection', { title: 'selection' });
});

module.exports = router;
