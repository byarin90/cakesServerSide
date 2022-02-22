const indexR = require("./index");
const usersR = require("./users");
const cakesR = require("./cakes");

exports.routesInit = (app) => {
  app.use("/",indexR);
  app.use("/users", usersR);
  app.use("/cakes",cakesR);

  // אם כותבים ראוט או קובץ שלא קיים בפאבליק
  // שיציג שגיאה 404
  app.use((req,res) => {
    res.status(404).json({msg_error:"Url not found, 404!"});
  })
}


// מאפשר לשרת בדומיין אחר לבצע בקשות לשרת שלנו דרך דפדפן
exports.corsAccessControl = (app) => {
  app.all('*',  (req, res, next) => {
    if (!req.get('Origin')) return next();
    // * -> במציאות במקום כוכבית נכניס שם דומיין שיש לו אישור גישה
    // לשרת
    res.set('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,auth-token,x-api-key');
    next();
  });
}