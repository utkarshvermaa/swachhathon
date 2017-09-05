const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const toiletSchema = new Schema({
  hygieneScore : number,
  address : string,

});

const toilet = module.exports = mongoose.model('toilet', toiletSchema);