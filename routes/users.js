const express= require("express");
const bcrypt = require("bcrypt");
const { validateUser, UserModel, validateLogin, genToken } = require("../models/userModel");
const { auth } = require("../middlewares/atuh");
const router = express.Router();

router.get("/", (req,res) => {
  res.json({msg:"Users work ****"});
})

// ראוט שישמש לבדיקה אם הטוקן עדיין בתוקף או אמין
router.get("/authUser", auth , async(req,res) => {
  res.json({status:"ok",msg:"token valid"})
})

router.get("/userInfo", auth , async(req,res) => {
  try{
    let data = await UserModel.findOne({_id:req.tokenData._id},{password:0})
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json(err)
  }
  // אמור להחזיר מידע של שם , כתובת
  // וכו לגבי המשתמש
})

// הוספת משתמש חדש
router.post("/", async(req,res) => {
  let validBody = validateUser(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let user = new UserModel(req.body);
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    user.password = "******";
    res.status(201).json(user);
  }
  catch(err){
    if(err.code == 11000){
      return res.status(400).json({code:11000,err_msg:"Email already in system try log in"})
    }
    console.log(err);
    res.status(500).json(err);
  }
})


router.post("/login", async(req,res) => {
  let validBody = validateLogin(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let user = await UserModel.findOne({email:req.body.email});
    if(!user){
      return res.status(401).json({err_msg:"User/email not found in the system"});
    }

    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
      return res.status(401).json({err_msg:"Password worng"});
    }
 
    let token = genToken(user._id)
    // {token} ->
    // למרות שכתבנו רק טוקן בגלל שיש גם משתנה בשם של המאפיין אז ג'אווה סקריפט יודע לזהות
    // בסקופ משתנה  או פרמטר והוא מכניס אותו למאפיין
    res.json({token});

    // בסוף נצטרך לשלוח טוקן למשתמש
  }
  catch(err){
    console.log(err);
    res.status(500).json(err);
  }
})

module.exports = router;