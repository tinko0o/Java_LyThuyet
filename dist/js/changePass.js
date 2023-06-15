const http = "http://localhost:8080/api/";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const User = JSON.parse(localStorage.getItem("loginUser"));
import {alertFullil,alertFail} from "./header.js";
// $("#email").disabled = true
// $("#email").disabled = true
// $("#email").disabled = true

const formHtml = `
    <div class="form-group">
        <label for="key">KEY</label>
        <input class="form-control" id="key" required="">
    </div>
    <div class="form-group">
        <label for="inputPasswordNew">New Password</label>
        <input type="password" class="form-control" id="inputPasswordNew" required="">
    </div>
    <div class="form-group">
        <label for="inputPasswordRe">Repeat Password</label>
        <input type="password" class="form-control" id="inputPasswordRe" required="">
    </div>
    <div class="form-group d-flex  justify-content-between">
        <button type="submit" class="btn btn-success btn-lg float-right btn-change">Change Password</button>
        <button class="btn btn-success btn-lg float-right">Go Back</button>
    </div>
`
async function forgotPassword(email) {
  await fetch(`${http}users/forgotPassword`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: User?.token,
    },
    method: "post",
    body:JSON.stringify({email})
  })
    .then((data) => data.json())
    .then((data) => {
      if (data.success) {
        $("#email").disabled = true
        alertFullil(data.message,3000)
        form.innerHTML = formHtml
      }
      else {
        alertFail(data.message)
      }
    })
    .catch((err) => {
      console.log(err);
    })
}
async function resetPassword(newPassword,resetToken) {
  await fetch(`${http}users/resetPassword`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    //   Authorization: User?.token,
    },
    method: "post",
    body:JSON.stringify({newPassword,resetToken})
  })
    .then((data) => data.json())
    .then((data) => {
      if (data.success) {
          alertFullil(data.message)
          setTimeout(()=>{
              window.location.replace("../fromUser.html");
          },1000)
      }
      else {
        alertFail(data.message)
      }
    })
    .catch((err) => {
      console.log(err);
    })
}

const form= $(".form")
form.addEventListener("submit",function(){
    const resetToken = form.elements["key"].value;
    const newPassword = form.elements["inputPasswordNew"].value;
    const rePassword = form.elements["inputPasswordRe"].value;
    if(newPassword != rePassword){
        alertFail("Password not match")
    }else{
        resetPassword(newPassword,resetToken)
    }
// console.log(rePassword,resetToken,newPassword)

})

const formsend= $(".form-send")
formsend.addEventListener("submit",function(){
    const email = formsend.elements["email"].value;
    // console.log(email);
    forgotPassword(email)
})