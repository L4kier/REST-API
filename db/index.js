var express = require("express");
const logger = require("../logs/config");
var sqlite3 = require('sqlite3').verbose();

const client = new sqlite3.Database("./db/appdb.db", sqlite3.OPEN_READWRITE,
    (err) => {
        if (err) return logger.error(err.message);
    })


module.exports= client;