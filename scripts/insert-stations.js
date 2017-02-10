
'use strict'

let mongo = require('../mongodb/mongoUtil');

mongo.connect('radio');

function insert(record){
    const stations = mongo.getCollection('radio');
    if(!record) return false;
    stations.insert(record);
}

insert({
    name: 'NonStop UK',
    url: 'http://stream.nonstopplay.co.uk/nsp-128k-mp3'
})
