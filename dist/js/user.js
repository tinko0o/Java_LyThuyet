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
const btnLoginGoogle = $(".login-google");

const firebaseConfig = {
  apiKey: "AIzaSyA851AECRpuNBNaBxEQquw4c8NG7qz3K8I",
  authDomain: "login-210cd.firebaseapp.com",
  projectId: "login-210cd",
  storageBucket: "login-210cd.appspot.com",
  messagingSenderId: "946726083551",
  appId: "1:946726083551:web:7fd9dc21e37eae9bcd426a",
  measurementId: "G-HXPCR3G83B",
};

firebase.initializeApp(firebaseConfig);

// Create an instance of the Google provider object
const provider = new firebase.auth.GoogleAuthProvider();

// Function to handle Google sign-in
async function signInWithGoogle() {
  return await firebase
    .auth()
    .signInWithPopup(provider)
    .then(async function (result) {
      // User signed in successfully
      const user = result.user;
      const name = user.displayName;
      const email = user.email;
      const dataRegister = {
        name,
        email,
        password: "",
      };
      fetch("http://localhost:8080/api/users/login", {
        method: "POST", // or 'POST', 'PUT', etc.
        headers: {
          "Content-Type": "application/json", // Set appropriate content type
        },
        body: JSON.stringify({ email: dataRegister.email, password: "" }),
      })
        .then((response) => response.json())
        .then(async (data) => {
          console.log("data:", data);
          if (!data.success) {
            await register(dataRegister, true);
            await fetch("http://localhost:8080/api/users/login", {
              method: "POST", // or 'POST', 'PUT', etc.
              headers: {
                "Content-Type": "application/json", // Set appropriate content type
              },
              body: JSON.stringify({ email: dataRegister.email, password: "" }),
            })
              .then((response) => response.json())
              .then((res) => {
                localStorage.setItem(
                  "loginUser",
                  JSON.stringify({ token: res.token, user: res.user })
                );
                window.location.replace("../home.html");
              });
          } else {
            localStorage.setItem(
              "loginUser",
              JSON.stringify({ token: data.token, user: data.user })
            );
            window.location.replace("../home.html");
          }

          // Handle the response data here
        })
        .catch((error) => {
          console.log("error:", error);
          // Handle any errors that occur during the request
        });

      // You can perform additional actions with the user data or redirect to another page
    })
    .catch(function (error) {
      // Handle errors
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error:", errorCode, errorMessage);
    });
}

async function register(req, isGoogle) {
  const urlGoogle = isGoogle
    ? "http://localhost:8080/api/users/register/Google"
    : "http://localhost:8080/api/users/register";

  return await fetch(urlGoogle, {
    method: "POST", // or 'POST', 'PUT', etc.
    headers: {
      "Content-Type": "application/json", // Set appropriate content type
    },
    body: JSON.stringify(req),
  })
    .then((response) => response.json())
    .then((data) => {
      // Handle the response data here
      if (data.success) {
        if (!isGoogle) alert(`${data.message}`);
      } else {
        alert(`${data.message}`);
      }
    })
    .catch((error) => {
      console.log("error:", error);
      // Handle any errors that occur during the request
    });
}

window.addEventListener("load", function () {
  signupBtn.onclick = function (e) {
    formBx.classList.add("active");
    wrapperForm.classList.add("active");
  };

  signinBtn.onclick = function (e) {
    formBx.classList.remove("active");
    wrapperForm.classList.remove("active");
  };

  btnLoginGoogle.addEventListener("click", function (e) {
    e.preventDefault();
    signInWithGoogle();
  });

  formSignin.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = this.elements["email"].value;
    const password = this.elements["password"].value;
    if (email && password) {
      const data = {
        email,
        password,
      };
      fetch("http://localhost:8080/api/users/login", {
        method: "POST", // or 'POST', 'PUT', etc.
        headers: {
          "Content-Type": "application/json", // Set appropriate content type
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          // Handle the response data here
          if (data.success) {
            localStorage.setItem(
              "loginUser",
              JSON.stringify({ token: data.token, user: data.user })
            );
            window.location.replace("../home.html");
          } else {
            alert(`${data.message}`);
          }
        })
        .catch((error) => {
          console.log("error:", error);
          // Handle any errors that occur during the request
        });
    }
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
      register(data, false);
    } else {
      alert("Password must the same comfirm");
    }
  });
});
