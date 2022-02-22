const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret");

let userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    phone: String,
    // הברירת מחדל של התאריך זה יהיה התאריך שיצרנו את הרשומה
    date_created: {
        type: Date,
        default: Date.now()
    }
})



exports.UserModel = mongoose.model("users", userSchema);

exports.genToken = (_id) => {
    let token = jwt.sign({ _id }, `${config.tokenSecret}`, { expiresIn: "60mins" });
    return token;
}

exports.validateUser = (_reqBody) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(2).max(100).required(),
        // email - בודק תקינות האמיילי
        email: Joi.string().min(2).max(150).email().required(),
        password: Joi.string().min(3).max(100).required(),
        // allow - מאפשר לשלוח מאפיין ריק
        address: Joi.string().min(2).max(150).allow(null, ""),
        phone: Joi.string().min(2).max(20).allow(null, "")
    })
    return joiSchema.validate(_reqBody);
}

// וולדזציה ללוג אין
exports.validateLogin = (_reqBody) => {
    let joiSchema = Joi.object({
        email: Joi.string().min(2).max(150).email().required(),
        password: Joi.string().min(3).max(100).required(),
    })
    return joiSchema.validate(_reqBody);
}