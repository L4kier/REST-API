var express = require("express");
var sqlite3 = require('sqlite3').verbose();
var logger = require('../logs/config');

const client = new sqlite3.Database("./db/appdb.db", sqlite3.OPEN_READWRITE,
    (err) => {
        if (err) return console.error(err.message);
        logger.info("Connected to the database");
    })


module.exports= client;