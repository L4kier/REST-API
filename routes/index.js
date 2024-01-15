var express = require('express');
var router = express.Router();
var db = require('../db')
var logger = require('../logs/config')

/* GET home page. */
router.get('/', function(req, res, next) {
  const sql = `SELECT * FROM users WHERE imie=$1 LIMIT 1`
  db.all(sql, ['Dawid'], async (err, rows) => {
    logger.info(rows)
  })
  res.render('index', { title: 'Express app' });
});

module.exports = router;
