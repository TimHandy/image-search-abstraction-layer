'use strict'

var mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
        term: String,
        when: String
    })

const Search = mongoose.model('searches', searchSchema)  // applies the searchSchema to the 'searches' collection in the DB. 'searches' collection will be automatically created the first time it is used.

module.exports = Search