'use strict'

let mongoose = require('mongoose'),
    db = require('../mongodb/')(),
    Schema = mongoose.Schema;

let Radio = new Schema({
    name: {type: String, default: 'new Station'},
    url: String,
    iconUrl: String,
    createdTime: {type: String, default: Date.now}
});

module.exports = {
    model: db.model('radio', Radio)
}

