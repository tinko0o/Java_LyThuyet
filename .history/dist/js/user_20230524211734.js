const signinBtn = document.querySelector(".signin-btn");
const signupBtn = document.querySelector(".signup-btn");
const formBx = document.querySelector(".form-bx");
const wrapperForm = document.querySelector(".wrapper-form");
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
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
  if (checkRegister) {
    signupBtn.click();
    localStorage.removeItem("register");
  }
  formSignin.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.elements["email"].value;
    const password = this.elements["password"].value;
    const data = {
      email,
      password,
    };
    console.log("formSignin:", data);
  });

  formSignup.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.elements["email"].value;
    const username = this.elements["username"].value;
    const password = this.elements["password"].value;
    const confirm = this.elements["confirm"].value;
    if (password === confirm) {
      const data = {
        email,
        username,
        password,
      };
      console.log("formSignup:", data);
    }
  });
});
