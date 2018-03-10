'use strict'

let config = require('./')();
let mongoose = require('mongoose');

module.exports = () => {
    var db = mongoose.connect(config.mongodb.url, {
        user: config.mongodb.username, 
        pass: config.mongodb.password
    });
    require('../models/radio')

    return db;
}