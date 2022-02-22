
// שנעלה לשרת אמיתי נוכל להחליף מהר
// בבקשות דומיין של השרת האמיתי
export const API_URL = "http://localhost:3000";
// export const API_URL = "http://monkeys.herokapp.net";

// לבקשות גט
export const doApiGet = async(_url) => {
  try{
    let resp = await fetch(_url , {
      method:"GET",
      headers: {
        'x-api-key': localStorage["tok_cakes"], 
        'content-type': "application/json"
      }
    })
    let data = await resp.json();
    return data;
  }
  catch(err){
    throw err;
  }
}

// POST,PUT,DELETE ,PATCH לבקשות
export const doApiMethod = async(_url,_method,_body) => {
  try{
    let resp = await fetch(_url , {
      method:_method,
      body:JSON.stringify(_body),
      headers: {
        'x-api-key': localStorage["tok_cakes"], 
        'content-type': "application/json"
      }
    })
    let data = await resp.json();
    // פונקציה אסיכרונית שעושה רטרן תמיד תחזיר את 
    // המידע כפרומיס
    return data;
  }
  catch(err){
    // ברגע שיש THROW
    // יפעיל ישר את הריג'קט והפרומיס
    throw err;
  }
}