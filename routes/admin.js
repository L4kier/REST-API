var express = require("express")
var router = express.Router();
var bcrypt = require("bcrypt")
var db = require("../db")
const config = require('../config')
var jsonwebtoken = require('jsonwebtoken')

const loggedIn = (req, res, next) => {
    try {
        const sessionToken = req.session.token;
        const tokenVerify = jsonwebtoken.verify(sessionToken, config.SECRET);
        return next()
    } catch (e) {
        return res.redirect("/login")
    }
}


router.all('*', loggedIn, (req, res, next) => {
    console.log(req.session.admin);
    if (req.session.admin !== 1) {
        return res.redirect("/")
    }

    next()
})

router.get('/', function (req, res, next) {
    res.render("admin/adminPanel", {
        title: "Panel administratora",
        username: req.session.username
    })
})

router.get('/adduser', function (req, res, next) {
    try {
        res.render("admin/addUser", {
            title: "Admin - dodawanie użytkownika",
            message: "",
            username: req.session.username
        })
    } catch (e) {
        return next(e)
    }
})

router.post("/adduser", function (req, res, next) {
    const { imie, nazwisko, login, haslo, email, telefon, czyAdmin } = req.body

    const sql = `SELECT * FROM users WHERE login=$1 LIMIT 1`;

    db.all(sql, [login], async (err, rows) => {
        if (err) return console.error("Błąd przy próbie odczytu z bazy", err.message);

        if (rows.length === 1) {
            return res.render("admin/addUser", {
                title: "Admin - dodawanie użytkownika",
                message: "Użytkownik już istnieje",
                username: req.session.username
            })
        }

        const hashedPassword = await bcrypt.hash(haslo, 10);

        const sqlInsert = `INSERT INTO users(imie, nazwisko, login, haslo, email, telefon, czyAdmin) VALUES($1, $2, $3, $4, $5, $6, $7)`;

        db.all(sqlInsert, [imie, nazwisko, login, hashedPassword, email, telefon, czyAdmin ], (err, rows) => {
            if (err) {
                console.error("Błąd przy próbie zapisu do bazy", err.message);
                res.render("admin/addUser", {
                    title: "Admin - dodawanie użytkownika",
                    message: `Błąd przy próbie zapisu do bazy ${err.message}`,
                    username: req.session.username
                })
            }

            res.render("admin/addUser", {
                title: "Admin - dodawanie użytkownika",
                message: "Użytkownik został dodany",
                username: req.session.username
            })

        })

    })

})

router.get('/logout', (req, res, next)=> {
    res.clearCookie('session');
    res.redirect('/login')
})

module.exports = router;