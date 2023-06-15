const http = "http://localhost:8080/api/";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
import {formatCurrency,alertFullil,alertFail} from "./header.js";
const User = JSON.parse(localStorage.getItem("loginUser"));
// format daytime
function formatDate(date) {
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function formattedDate(date) {
  const dated = new Date(`${date}`)
  return formatDate(dated)
};
async function getPurchased() {
  await fetch(`${http}purchases/`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: User?.token,
    },
    // method:"get",
  })
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      renderPuchase(data.Purchases);
    })
    .catch((err) => {
      console.log(err);
    })
} 
getPurchased()
function renderPuchase(data) {
  const html = data.map((val, index) => {
    let count = 0;
    let status = val.status
    const cancelBtn = status == "PENDING" ? `<button data-id="${val.id}" class="btn btn-danger btn-cancel">Hủy Đơn</button>`:""  
    const producthtml = val.purchaseOrderItems.map((v, i) => {
      count = count + v.quantity;
      const ratingClass = v.rating > 0 ? "disabled" : "";
      const ratingButton = status == "Đã giao" ? v.rating > 0 ? " " : `<button class="btn btn-rate">Rating</button>` :"";
      return `
        <div data-id="${v.phone.id}" class="product">
          <img src="${v.phone.img}" alt="">
          <div class="p-name">
            <h4 class="name-product">${v.phone.name}</h4>
            <span class="quantity">${v.quantity}</span>
          </div>
          <p class="p-total">${v.phone.price}</p>
        </div>
      `;
    });
    return `
      <div class="block">
        <div class="address d-flex justify-content-between">
          <div class="address-content d-block">
          <p class="p-createdAt"><strong>Đặt vào:</strong>${formattedDate(val.date)}</p>
            <p class="p-address"><strong>Địa chỉ:</strong>${val.address}</p>
            
          </div>
          <div class="total d-block">
            <p class="t-quantity"><strong>Số sản phẩm:</strong>${count}</p>
            <p class="t-price"><strong>Tổng tiền:</strong>${formatCurrency(val.total)}</p>
          </div>
          <div class="status d-block">
            <p class="s-status"><strong>Trang thái:</strong>${val.status}</p>
            <hr style="margin-bottom: 0; color: white;">
            ${cancelBtn}
          </div>
        </div>
        <hr>
        <div data-id="${val.id}" class="products">
          ${producthtml.join("")}
        </div>
      </div>
    `;
  });
  $(".purchased").innerHTML = html.join("");

}
async function cancelOder(id) {
  await fetch(`${http}purchases/${id}/cancel/`, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: User?.token,
    },
    method: "put",
  })
    .then((data) => data.json())
    .then((data) => {
      if (data.success) {
        alertFullil(data.message)
        getPurchased()
      }
      else {
        alertFail(data.message)
      }
    })
    .catch((err) => {
      console.log(err);
    })
}
const purchased = $(".purchased");
purchased.addEventListener('click', function (e) {
    const btnCancel = e.target.closest(".btn-cancel")
    if (btnCancel) {
      const id = btnCancel.dataset.id;
      console.log(id)
      cancelOder(id)
    }
})