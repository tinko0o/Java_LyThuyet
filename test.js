// const data = {
//   name: "ha",
//   img: "lalala",
//   price: 7000,
//   category: {
//     id: 1,
//   },
// };

// fetch("http://localhost:8080/phones", {
//   method: "POST", // or 'POST', 'PUT', etc.
//   headers: {
//     "Content-Type": "application/json", // Set appropriate content type
//   },
//   body: JSON.stringify(data),
// })
//   .then((response) => response.json())
//   .then((data) => {
//     console.log("data:", data);
//     // Handle the response data here
//   })
//   .catch((error) => {
//     console.log("error:", error);
//     // Handle any errors that occur during the request
//   });

// // const btn = document.querySelector("button");
// // function handleImageUpload() {
// //   const inputElement = document.getElementById("imageInput");
// //   console.log("inputElement:", inputElement);
// //   const file = inputElement.files[0];

// //   if (file) {
// //     const reader = new FileReader();

// //     reader.onload = function (event) {
// //       console.log("file:", file);
// //       const imageData = event.target.result; // Dữ liệu ảnh dưới dạng base64
// //       console.log("imageData:", imageData);

// //       // Gửi dữ liệu ảnh lên server, ví dụ sử dụng AJAX hoặc Fetch API
// //       // ...

// //       // Hoặc hiển thị ảnh trên trang web
// //       const imageElement = document.createElement("img");
// //       imageElement.src = imageData;
// //       document.body.appendChild(imageElement);
// //     };

// //     reader.readAsDataURL(file);
// //   }
// // }
// // btn.addEventListener("click", function (e) {
// //   const inputElement = document.getElementById("imageInput");
// //   const file = inputElement.files[0];
// //   console.log("file:", file);
// // });
// AWS.config.update({
//   accessKeyId: "YOUR_ACCESS_KEY",
//   secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
//   region: "YOUR_BUCKET_REGION",
// });

// // Create an instance of the S3 service
// const s3 = new AWS.S3();

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWYoY0c7loFh9g6rCacR8Ah7De2q8sU_0",
  authDomain: "upload-img-adf68.firebaseapp.com",
  projectId: "upload-img-adf68",
  storageBucket: "upload-img-adf68.appspot.com",
  messagingSenderId: "909145032467",
  appId: "1:909145032467:web:ea5862e923710ffe083ce6",
  measurementId: "G-TB90XV70M8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var storage = firebase.storage();

// Get the file input element
var fileInput = document.getElementById("file-input");

// Listen for file selection changes
fileInput.addEventListener("change", function (event) {
  var file = event.target.files[0];

  // Create a storage reference with a unique filename
  var storageRef = storage.ref().child("files/" + file.name);

  // Upload the file to Firebase Storage
  var uploadTask = storageRef.put(file);

  // Monitor upload progress
  uploadTask.on(
    "state_changed",
    function (snapshot) {
      // Handle progress updates
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload progress: " + progress + "%");
    },
    function (error) {
      // Handle upload error
      console.error("Upload error:", error);
    },
    function () {
      // Handle successful upload
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log("File available at: " + downloadURL);
        document.querySelector("img").setAttribute("src", downloadURL);
        // Perform any necessary actions with the file URL (e.g., store it in your database)
        // ...
      });
    }
  );
});

const formTranslate = document.querySelector(".translate");
formTranslate.addEventListener("submit",async function(e){
  e.preventDefault();
  const value = this.elements["value"].value;
  translate(value);
})


async function translate(value){
  await fetch(`https://api.tracau.vn/WBBcwnwQpV89/s/${value}/en`)
  .then((response) => response.json())
  .then((data) => {
    console.log("data:", data);
    // Handle the response data here
  })
  .catch((error) => {
    console.log("error:", error);
    // Handle any errors that occur during the request
  });

}