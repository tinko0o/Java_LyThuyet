function handleImageUpload() {
  const inputElement = document.getElementById("imageInput");
  const file = inputElement.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (event) {
      const imageData = event.target.result; // Dữ liệu ảnh dưới dạng base64

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
