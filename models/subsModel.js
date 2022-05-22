const mongoose = require("mongoose");
const Joi = require("joi");

const subSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength:2},
  email: {type: String, unique:true, required: true, minlength:2},
  profession: {type: String, required: true, minlength:2},
  seniority: {type: Number, required: true, minlength:2},
  info: {type: String, required: true, minlength:2},
  location: {type: String, required: true, minlength:2},
  links: {type: Array, required: true},
  userId:{type: String, required: true}
});
const subModel = mongoose.model("subs", subSchema);
exports.subModel = subModel;

const validSub = (_item) => {
  let schema = Joi.object({
    // id: Joi.any(),
    name: Joi.string().min(2).required(),
    email: Joi.string().min(2).email().required(),
    profession: Joi.string().min(2).required(),
    seniority: Joi.number().required(),
    location: Joi.string().required(),
    info: Joi.string().min(5).max(40).required(),
    links: Joi.array().min(2).required(),
  });
  return schema.validate(_item)
};
exports.validSub = validSub;

const editSub = (_item) => {
  let schema = Joi.object({
    id: Joi.any(),
    name: Joi.string().min(2),
    email: Joi.string().min(2).email(),
    profession: Joi.string().min(2),
    seniority: Joi.number(),
    location: Joi.string(),
    info: Joi.string().min(5).max(40),
    links: Joi.array(),
  });
  return schema.validate(_item)
};
exports.editSub = editSub;
