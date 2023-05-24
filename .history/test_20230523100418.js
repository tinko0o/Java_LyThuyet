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

let s3 = new window.AWS.S3({
  credentials: new window.AWS.Credentials({
    accessKeyId: credential.accressKeyId,
    secretAccessKey: credential.secretAccessKey,
    region: credential.region,
  }),
});
// Configure the S3 bucket name
const bucketName = "YOUR_BUCKET_NAME";
document.querySelector("button").addEventListener("click", function (e) {
  const fileInput = document.getElementById("file-input");
  const file = fileInput.files[0];
  console.log("file:", file);
  if (file) {
    // Generate a unique file name
    const fileName = `${Date.now()}-${file.name}`;

    // Set the S3 object parameters
    const params = {
      Bucket: "YOUR_BUCKET_NAME",
      Key: fileName,
      Body: file,
      ACL: "public-read",
    };

    // Upload the file to S3
    s3.upload(params, (err, data) => {
      if (err) {
        console.log("Error uploading file:", err);
        return;
      }

      const fileUrl = data.Location;
      console.log("File uploaded successfully:", fileUrl);

      // Perform any necessary actions with the file URL (e.g., store it in your database)
      // ...
    });
  }
});
