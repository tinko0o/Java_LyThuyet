const signinBtn = document.querySelector(".signin-btn");
const signupBtn = document.querySelector(".signup-btn");
const formBx = document.querySelector(".form-bx");
const wrapperForm = document.querySelector(".wrapper-form");
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const http = "http://localhost:8080/api/";
import {alertFullil,alertFail} from "./header.js";
const alertSuccess = $(".alert-primary");
const alertDanger = $(".alert-danger");
const formSignin = $(".get-signin");
const formSignup = $(".get-signup");



window.addEventListener("load", function () {
  signupBtn.onclick = function (e) {
    formBx.classList.add("active");
    wrapperForm.classList.add("active");
  };

  signinBtn.onclick = function (e) {
    formBx.classList.remove("active");
    wrapperForm.classList.remove("active");
  };

  formSignin.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.elements["email"].value;
    const password = this.elements["password"].value;
    const data = {
      email,
      password,
    };
    console.log("formSignin:", data);
    login(data)
  });

  formSignup.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.elements["email"].value;
    const name = this.elements["username"].value;
    const password = this.elements["password"].value;
    const confirm = this.elements["confirm"].value;
    if (password === confirm) {
      const data = {
        email,
        name,
        password,
      };
      register(data)
      console.log("formSignup:", data);
    }else{
      alertFail("password not match")
    }
  });
});
async function register(data){
    await fetch(`${http}users/register`,{
        headers: {                     
        "Content-type": "application/json; charset=UTF-8"},
        method:"post",
        body:JSON.stringify(data) 
    })
    .then((data) => data.json())
    .then((data) => {
      if(data.success){
          alertFullil(data.message)
          signinBtn.click();
        }else{
          alertFail(data.message)
        }
    }).catch((err)=>{
        console.log(err);
        alertFail(err)
    })
}
async function login(data){
    await fetch(`${http}users/login`,{
        headers: {                     
        "Content-type": "application/json; charset=UTF-8"},
        method:"post",
        body:JSON.stringify(data) 
    })
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      if(data.success){
          alertFullil(data.message)
        // const user
        localStorage.setItem(
          "loginUser",
          JSON.stringify({ user: data.user, token: data.token })
        );
        // localStorage.setItem("loginUser", JSON.stringify(data));
        window.location.replace("./home.html");
        }else{
          alertFail(data.message)
        }
    }).catch((err)=>{
        console.log(err);
        alertFail(err)
    })
}