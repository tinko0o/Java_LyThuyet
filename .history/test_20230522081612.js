fetch("http://localhost:8080/phones", {
  method: "GET", // or 'POST', 'PUT', etc.
  headers: {
    "Content-Type": "application/json", // Set appropriate content type
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log("data:", data);
    // Handle the response data here
  })
  .catch((error) => {
    // Handle any errors that occur during the request
  });

// const btn = document.querySelector("button");
// function handleImageUpload() {
//   const inputElement = document.getElementById("imageInput");
//   console.log("inputElement:", inputElement);
//   const file = inputElement.files[0];

//   if (file) {
//     const reader = new FileReader();

//     reader.onload = function (event) {
//       console.log("file:", file);
//       const imageData = event.target.result; // Dữ liệu ảnh dưới dạng base64
//       console.log("imageData:", imageData);

//       // Gửi dữ liệu ảnh lên server, ví dụ sử dụng AJAX hoặc Fetch API
//       // ...

//       // Hoặc hiển thị ảnh trên trang web
//       const imageElement = document.createElement("img");
//       imageElement.src = imageData;
//       document.body.appendChild(imageElement);
//     };

//     reader.readAsDataURL(file);
//   }
// }
// btn.addEventListener("click", function (e) {
//   const inputElement = document.getElementById("imageInput");
//   const file = inputElement.files[0];
//   console.log("file:", file);
// });
