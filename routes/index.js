var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'index' });
});

router.get('/game', function(req, res, next) {

  console.log();
  res.render('game', { title: 'game' });
});

router.get('/ranking', function(req, res, next) {
  fs.readFile('ranking.txt', 'utf8', (err, ranking) => {
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    console.log(ranking);
    res.render('ranking', {title: 'ranking', description: ranking});
  });
});

router.get('/score', function(req, res, next) {
  res.render('score', { title: 'score' });
});

router.get('/selection', function(req, res, next) {
  res.render('selection', { title: 'selection' });
});

module.exports = router;
