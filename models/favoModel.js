const mongoose = require("mongoose");
const Joi = require("joi");

const favoSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.ObjectId, ref: 'users'},
    subId: {type: mongoose.Schema.ObjectId, ref: 'subs'}
})
const favModel = mongoose.model('favorites', favoSchema);
exports.favModel = favModel;

const validFav = (_fav) => {
    let schema = Joi.object({
      userId: Joi.string().min(2).max(50).required(),
      subId: Joi.string().min(2).max(50).required()
    });
    return schema.validate(_fav);
  };
  exports.validFav = validFav;

