const $ = document.querySelector.bind(document);
const momo = JSON.parse(localStorage.getItem("Momo"))||null;
const http = "http://localhost:8080/api/";
const User = JSON.parse(localStorage.getItem("loginUser"));
window.addEventListener("load",function(){
    this.setTimeout(()=>{
        this.window.location.replace("./home.html")
    },4000)
    $(".btn-back").addEventListener("click",function(){
        window.location.replace("./home.html")
    })
})