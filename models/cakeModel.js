const mongoose = require("mongoose");
const Joi = require("joi");


let cakeSchema = new mongoose.Schema({
  name:String,
  info:String,
  price:Number,
  img_url:String,
  // יכיל את האיי די מהקולקשן יוזרס של המשתמש
  // שהוסיף את העוגה
  user_id:String,
  date_created:{
    type:Date, default:Date.now()
  }
})

exports.CakeModel = mongoose.model("cakes", cakeSchema);

exports.validateCake = (_reqBody) => {
  let joiSchema = Joi.object({
    name:Joi.string().min(2).max(99).required(),
    info:Joi.string().min(2).max(500).allow(null,""),
    price:Joi.number().min(1).max(9999).required(),
    img_url:Joi.string().min(3).max(500).allow(null,"")
  })
  return joiSchema.validate(_reqBody)
}