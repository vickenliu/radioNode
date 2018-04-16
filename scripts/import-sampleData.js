
'use strict'
const mongoose = require('mongoose');
const config = require(`../config/${process.env.NODE_ENV || "development"}.json`);
mongoose.connect(config.mongodb.url, {
    user: config.mongodb.username, 
    pass: config.mongodb.password
  })
let Radio = require('../models/radio').model;

let async = require('async');


const samples =[{
    name: 'Gaydio UK',
    url: 'http://uklisten1.gaydio.co.uk:8001/gaydio_high'
},
{
    name: 'Joy AU',
    url: 'http://audio.joy.org.au:8000/live'
},
{
    name: 'NonStop UK',
    url: 'http://stream.nonstopplay.co.uk/nsp-128k-mp3'
}];


Radio.find({}).remove((err) => {
    if (err) {
        console.log(err);
        process.exit();
    }
    async.each(samples, (sample, cb) => {
        let radio = new Radio(sample);
        radio.save((err) => {
            console.log('radio added' + sample.name);
            cb()
        });
    }, (err) => {
        console.log('Finished adding all samples');
        process.exit();
    })
})