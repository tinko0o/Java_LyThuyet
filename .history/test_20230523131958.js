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

var firebaseConfig = {
  apiKey: "AIzaSyAEdgYwOD3LSc_En_PE5BQrs0S608Cfxl4",
  authDomain: "upload-img-fe871.firebaseapp.com",
  projectId: "upload-img-fe871",
  storageBucket: "upload-img-fe871.appspot.com",
  messagingSenderId: "921179138895",
  appId: "1:921179138895:web:d169df8086d99cb6c6733a",
  measurementId: "G-GYJ5K9XJBV",
};

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
        // Perform any necessary actions with the file URL (e.g., store it in your database)
        // ...
      });
    }
  );
});
