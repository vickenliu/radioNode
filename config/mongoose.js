'use strict'

let config = require('./')();
let mongoose = require('mongoose');

module.exports = () => {
    var db = mongoose.connect(config.mongodb)
    require('../models/radio')

    return db;
}