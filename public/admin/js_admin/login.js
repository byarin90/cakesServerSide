import { API_URL, doApiMethod } from "../services/apiService.js"
let $ = document.querySelector.bind(document);


window.onload = () => {
    declareEvents();
}

const declareEvents = () => {
    $("#id_form").addEventListener("submit", (e) => {
        // למנוע ברירת מחדל של שיגור טופס
        e.preventDefault();
        // console.log("from work");
        let bodyData = {
            email: $("#id_email").value,
            password: $("#id_pass").value
        }

        if (!bodyData.email.includes("@") || !bodyData.email.includes(".") || bodyData.email.length < 5) {
            return alert("Enter valid email!");
        }
        if (bodyData.password.length < 3) {
            return alert("Enter valid password");
        }
        console.log(bodyData)
        doApi(bodyData)

    })
}


const doApi = async(_bodyData) => {
    let url = API_URL + "/users/login"
        // בקשת פטץ' של פוסטx
    try {
        let data = await doApiMethod(url, "POST", _bodyData);
        console.log(data)
            // בדיקה שהצליח לעשות לוגאין
        if (data.token) {
            // שומר את הטוקן שישמש בהמשך לבקשות
            localStorage.setItem("tok_cakes", data.token);
            // משגר לעמוד של רשימת העוגות
            window.location.href = "cakesList.html"
        } else {
            alert("Password or email is worng")
        }
    } catch (err) {
        alert("There problem in server try again later..")
    }
}