import { API_URL, doApiMethod } from "../services/apiService.js";
import { authUser } from "../services/authService.js"

let $ = document.querySelector.bind(document);

window.onload = () => {
  authUser();
  declareEvents();
}

const declareEvents = () => {
  $("#id_form").addEventListener("submit",(e) => {
    e.preventDefault();
    
    let dataBody = {
      name:$("#id_name").value,
      info:$("#id_info").value,
      price:$("#id_price").value,
      img_url:$("#id_img_url").value,
    }
    console.log(dataBody);
    if(dataBody.name.length < 2){
      return alert("Enter valid name , min 2 chars")
    }
    if(dataBody.price < 1){
      return alert("Enter valid price");
    }
    doApi(dataBody);
  })
}

const doApi = async(_dataBody) => {
  let url = API_URL+"/cakes";
  try{
    let data = await doApiMethod(url,"POST",_dataBody);
    if(data._id){
      alert("Add new porduct success");
      window.location.href = "cakesList.html"
    }
    else{
      alert("There problem come back later")
    }
  }
  catch(err){
    alert("There problem , check info or url img  or try again later");
  }
}