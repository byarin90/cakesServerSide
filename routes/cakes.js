const express= require("express");
const { auth } = require("../middlewares/atuh");
const { validateCake, CakeModel } = require("../models/cakeModel");
const router = express.Router();

router.get("/", async(req,res) => {
  try{
    let perPage = req.query.perPage || 4;
    let page = req.query.page || 1;
    let data = await CakeModel.find({})
    .limit(perPage)
    .skip((page-1)*perPage)
    res.json(data);

  }
  catch(err){
    console.log(err);
    res.status(500).json({msg_err:"There problem in server try again later"})
  }
})

//?s= חיפוש
router.get("/search", async(req,res) => {
  try{
    let searchQ = req.query.s;
    // i -> מבטל את הקייס סינסטיב - אותיות גדולות קטנות באנגלית
    let searchReg = new RegExp(searchQ,"i")
    let data = await CakeModel.find({$or:[{name:searchReg},{info:searchReg}]})
    .limit(20)
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg_err:"There problem in server try again later"})
  }
})

// מביא רשימת עוגות של אותו משתמש בלבד לפי הטוקן
router.get("/userCakes", auth ,async(req,res) => {
  try{
    let perPage = req.query.perPage || 4;
    let page = req.query.page || 1;
    let data = await CakeModel.find({user_id:req.tokenData._id})
    .limit(perPage)
    .skip((page-1)*perPage)
    // 1 -> asc - a -> z
    // -1 -> desc - z -> a
    .sort({_id:-1})
    res.json(data);

  }
  catch(err){
    console.log(err);
    res.status(500).json({msg_err:"There problem in server try again later"})
  }
})



router.post("/", auth, async(req,res) => {
  // בודק אם המידע שנשלח מצד לקוח תקין
  let validBody = validateCake(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let cake = new CakeModel(req.body);
    // יוסיף את האיי די של המשתמש לרשומה החדשה
    cake.user_id = req.tokenData._id;
    await cake.save();
    res.status(201).json(cake)

  }
  catch(err){
    console.log(err);
  }
})

// עריכת רשומה קיימת
router.put("/:idCake", auth, async(req,res) => {
  // בודק אם המידע שנשלח מצד לקוח תקין
  let validBody = validateCake(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let idCake = req.params.idCake;
    let data = await CakeModel.updateOne({_id:idCake, user_id:req.tokenData._id}, req.body);
    
    // modfiedCount:1 - אם יש הצלחה
    res.json(data)
  }
  catch(err){
    console.log(err);
  }
})

router.delete("/:idDel",auth,async(req,res) => {
  try{
    let idDel = req.params.idDel;
    let data = await CakeModel.deleteOne({_id:idDel, user_id:req.tokenData._id});
    // countDelted: 1 אם הצליח למחוק
    res.json(data);
  }
  catch(err){
    console.log(err);
  }
})

module.exports = router;