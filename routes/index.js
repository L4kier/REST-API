var express = require('express');
var router = express.Router();
var db = require('../db')
var logger = require('../logs/config')
var bcrypt = require('bcrypt')
var jsonwebtoken = require('jsonwebtoken')

const config = require('../config')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Biblioteka filmowa' });
});

router.get('/login', (req, res, next) => {
  res.render('login', {
    title: 'Logowanie',
    message: ''
  })
})

router.post('/login', (req, res, next) => {
  const {login, haslo} = req.body;

  const sql = `SELECT * FROM users WHERE login=$1 LIMIT 1`

  db.all(sql, [login], async (err, rows) => {
    if (err) return logger.error("Błąd odczytu z bazy")

    if(rows.length === 0) {
      return res.render('login', {
        title: 'Admin - logowanie',
        message: 'Użytkownik nie istnieje'
      })
    }

    const comparedPassword = await bcrypt.compare(haslo, rows[0].haslo)

    if(comparedPassword === false) {
      return res.render('login', {
        title: 'Admin - logowanie',
        message: 'Hasło jest nieprawidłowe'
      })
    } else {
      
      if(rows[0].czyAdmin === 0){
        req.session.admin = 0
      } else {
        req.session.admin = 1
      }
      req.session.username = rows[0].login;

      logger.info(`User: ${rows[0].login} logged in`);

      const token = jsonwebtoken.sign(
        {
          login: rows[0].login,
          czyAdmin: rows[0].czyAdmin
        },
        config.SECRET,
        {
          expiresIn: 60 * 60  //godzina
        }
      )

      req.session.token = token

      res.redirect('/admin')
    }
  })
})

module.exports = router;
