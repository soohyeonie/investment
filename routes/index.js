var express = require('express');
var fs = require('fs');
var csv = require('csv-parser');
var router = express.Router();
var rank_data = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'index' });
});

router.get('/game', function(req, res, next) {
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
  // fs.readFile('ranking.txt', 'utf8', (err, ranking) => {
  //   if(err) {
  //     console.log(err);
  //     res.status(500).send('Internal Server Error');
  //   }
  //   console.log(ranking);
  // });
});

router.get('/score', function(req, res, next) {
  res.render('score', { title: 'score' });
});

router.get('/selection', function(req, res, next) {
  res.render('selection', { title: 'selection' });
});

module.exports = router;
