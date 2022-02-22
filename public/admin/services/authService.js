import { API_URL, doApiGet } from "./apiService.js"

// פונקציה שנפעיל בכל אזור/דף שהמשתמש חייב להיות מחובר בו
// והפונקציה בודקת אם הטוקן תקין/תקף
export const authUser = async() => {
    let url = API_URL + "/users/authUser";
    try {
        let data = await doApiGet(url)
        if (data.status != "ok") {
            alert("You must logged in first to be here!")
            window.location.href = "login.html";
            localStorage.removeItem('tok_cakes');
        }
    } catch (err) {
        throw err;
    }
}