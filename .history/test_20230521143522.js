const btn = document.querySelector("button");
function handleImageUpload() {
  const inputElement = document.getElementById("imageInput");
  const file = inputElement.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (event) {
      const imageData = event.target.result; // Dữ liệu ảnh dưới dạng base64
      console.log("imageData:", imageData);

      // Gửi dữ liệu ảnh lên server, ví dụ sử dụng AJAX hoặc Fetch API
      // ...

      // Hoặc hiển thị ảnh trên trang web
      const imageElement = document.createElement("img");
      imageElement.src = imageData;
      document.body.appendChild(imageElement);
    };

    reader.readAsDataURL(file);
  }
}
btn.addEventListener("click", handleImageUpload());
