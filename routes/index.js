var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'index' });
});

router.get('/game', function(req, res, next) {
  res.render('game', { title: 'game' });
});

router.get('/ranking', function(req, res, next) {
  res.render('ranking', { title: 'ranking' });
});

router.get('/score', function(req, res, next) {
  res.render('score', { title: 'score' });
});

router.get('/selection', function(req, res, next) {
  res.render('selection', { title: 'selection' });
});

module.exports = router;
