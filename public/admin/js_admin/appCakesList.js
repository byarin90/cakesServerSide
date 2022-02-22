import { API_URL, doApiGet, doApiMethod } from "../services/apiService.js";
import { authUser } from "../services/authService.js";
import CakeTrClass from "./cakeTrClass.js";
let $ = document.querySelector.bind(document);

window.onload = () => {
  // בדקית אוטנטיקציה אם  למששתמש
  // בכלל מותר להיות כאן
  authUser();
  // בקשת API
  doApi();
  declareViewEvents();
}

const declareViewEvents = () => {
  $("#id_logout").addEventListener("click", () => {
    // confirm - פותח פופ אפ ששואל אם את המשתמש
    // אם מאשר זה יהיה אמת
    if(confirm("Are you sure you want to log out?")){
      localStorage.removeItem("tok_cakes");
      window.location.href = "login.html";
    }
  })
}

const doApi = async () => {
  // בקשת גט ששולחת גם טוקן
  let url = API_URL + "/cakes/userCakes?perPage=50";

  let data = await doApiGet(url);
  console.log(data);
  createCakesTr(data);
}

const createCakesTr = (_ar) => {
  $("#id_tbody").innerHTML = "";
  _ar.forEach((item, i) => {
    let cakeTr = new CakeTrClass("#id_tbody", item, i,deleteCake);
    cakeTr.render();
  })
}


const deleteCake = async (_id) => {
  let url = API_URL + "/cakes/" + _id;
  try {
    let data = await doApiMethod(url, "DELETE", {});
    console.log(data);
    if(data.deletedCount == 1){
      // alert("Cake deleted");
      doApi();
    }
  }
  catch (err) {
    console.log(err);
    alert("There problem , try again later");
  }
}