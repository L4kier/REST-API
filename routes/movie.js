var express = require("express");
var router = express.Router();
var db = require("../db");
const config = require("../config");
var jsonwebtoken = require("jsonwebtoken");

function getIsAdmin(token, res) {
  try {
    const tokenVerify = jsonwebtoken.verify(token, config.SECRET);
    return tokenVerify.czyAdmin;
  } catch (e) {
    return res.redirect("/login");
  }
}

function getUserName(token, res) {
  try {
    const tokenVerify = jsonwebtoken.verify(token, config.SECRET);
    return tokenVerify.login;
  } catch (e) {
    return res.redirect("/login");
  }
}

/* GET users listing. */
router.get("/", function (req, res, next) {
  const sql = `SELECT * FROM movies`;

  db.all(sql, [], (err, rows) => {
    if (err)
      return console.error("Błąd przy próbie pobrania filmów z bazy", err);;
    const isAdmin = getIsAdmin(req.session.token, res);
    // if (isAdmin === 0) {
    //   res.render("customer/list", {
    //     title: "Customer - klienci",
    //     username: getUserName(req.session.token, res),
    //     data: rows,
    //   });
    // } else if (isAdmin === 1) {
      res.render("movie/adminList", {
        title: "Administrator - filmy",
        username: getUserName(req.session.token, res),
        data: rows,
      });
//     }
  });
});

router.get("/add", (req, res, next) => {
  const isAdmin = getIsAdmin(req.session.token, res);
  if (isAdmin === 1) {
    res.render("movie/add", {
      title: 'Dodawanie nowego filmu',
      username: getUserName(req.session.token, res),
    });
  } else {
    res.redirect("/movies");
  }
})

router.post("/add", (req, res, next) => {
  const { tytul, rezyser, srednia_ocena, gatunek } = req.body;

  const isAdmin = getIsAdmin(req.session.token, res);
  if (isAdmin === 1) {
  const sql = `INSERT INTO movies (tytul, rezyser, srednia_ocena, gatunek) VALUES ($1, $2, $3,$4)`;
    db.all(sql, [tytul, rezyser, srednia_ocena, gatunek], (err, result) => {
      if (err) return console.error("Błąd przy dodawaniu", err);
      res.redirect("/movies");
    });
  } else {
    res.redirect("/movies");
  }

})

router.get("/edit/:id", (req, res, next) => {
  const { id } = req.params;

  const sql = `SELECT * FROM movies WHERE id=$1`;

  db.all(sql, [id], (err, rows) => {
    if (err) return console.error("Błąd przy próbie pobrania filmów", err);
    const isAdmin = getIsAdmin(req.session.token, res);
    if (isAdmin === 1) {
      res.render("movie/edit", {
        title: `Edycja Filmu: ${rows[0].name}`,
        data: rows,
        username: getUserName(req.session.token, res),
      });
    } else {
      res.redirect("/movies");
    }
  });
});

router.post("/edit/:id", (req, res, next) => {
  const { tytul, rezyser, srednia_ocena, gatunek } = req.body;
  const { id } = req.params;

  const isAdmin = getIsAdmin(req.session.token, res);
  if (isAdmin === 1) {
    const sql = `UPDATE movies SET tytul=$1, rezyser=$2, srednia_ocena=$3, gatunek=$4 WHERE id=$5`;
    db.all(sql, [tytul, rezyser, srednia_ocena, gatunek, id], (err, result) => {
      if (err) return console.error("Błąd przy aktualizacji", err);
      res.redirect("/movies");
    });
  } else {
    res.redirect("/movies");
  }
});

router.get("/delete/:id", (req, res, next) => {
  const { id } = req.params;

  const isAdmin = getIsAdmin(req.session.token, res);
  if (isAdmin === 1) {
    const sql = `DELETE FROM movies WHERE id=$1`;
    db.all(sql, [id], (err, result) => {
      if (err)
        return console.error("Błąd przy próbie usunięcia filmu z bazy", err);

      res.redirect("/movies");
    });
  } else {
    res.redirect("/movies");
  }
});



module.exports = router;
