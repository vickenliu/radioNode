'use strict'

let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let RadioSchema = new Schema({
    name: {type: String, default: 'new Station'},
    url: String,
    iconUrl: String,
    createdTime: {type: String, default: Date.now}
});

mongoose.model('Radio', RadioSchema)


