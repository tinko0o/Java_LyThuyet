const http = "http://localhost:8080/api/";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const User = JSON.parse(localStorage.getItem("loginUser"));
import {formatCurrency,alertFullil,alertFail} from "./header.js";
let dataCart=[];
function renderCart(data){
    if(data != null){
        // console.log(typeof(data.total));
    const html = data.cartItems.map((val,index) => {
        return `
        <tr class="product-item">
                <th>
                    <a data-id="${val.phone.id}" href="" class="img">
                        <img src="${val.phone.img}" alt="">
                    </a>
                </th>
                <th>
                    <div class="name-product">
                        ${val.phone.name}
                    </div>
                </th>
                <th>
                    ${formatCurrency(val.phone.price)}
                </th>
        <th>

            <div class="quantity-product">
                <button data-id="${index}" class="sub">-</button>
                <input class="quantity" data-id="${index}" type="number" value="${val.quantity}" min="1" max="100">
                <button data-id="${index}" class="plus">+</button>
            </div>
        </th>
        <th>${formatCurrency(data.total)}</th>
        <th>
            <button data-id="${val.phone.id}" class="delete">
            <i class="fa-solid fa-xmark"></i>
            </button>
        </th>
    </tr>
        `
    });

    $("#add-to-cart").innerHTML = html.join("");
    $(".total-text").innerHTML = `Tổng tiền: ${formatCurrency(data.total)}`;
  }
  else{
      $("#add-to-cart").innerHTML = "";
      $(".total-text").innerHTML = "Tổng tiền: 0đ";
      
    }
}

// get carts
async function getCart(){
    await fetch(`${http}carts/`,{
        headers: {                     
        "Content-type": "application/json; charset=UTF-8",
      authorization: User?.token},
        method:"get",
        // body:JSON.stringify({id}) 
    })
    .then((data) => data.json())
    .then((data) => {
      console.log(data);
      // renderCart(data?.cart)
      if(data.success && data.message == "Cart is empty"){
        dataCart = []
        renderCart(data?.cart)
        }else{         
          dataCart = [...data?.cart?.cartItems]
          renderCart(data?.cart)
          // console.log(dataCart)
        }
    }).catch((err)=>{
        console.log(err);
        alertFail(err)
    })
}
async function updateCart(id, quantity){
    await fetch(`${http}carts/items/${id}`,{
        headers: {                     
        "Content-type": "application/json; charset=UTF-8",
      authorization: User?.token},
        method:"put",
        body:JSON.stringify({quantity}) 
    })
    .then((data) => data.json())
    .then((data) => {
        getCart()
      if(data.success){
          alertFullil(data.message)
        }else{
            alertFail(data.message)
        }
    }).catch((err)=>{
        console.log(err);
        alertFail(err)
    })
}
async function deleteCart(id){
    await fetch(`${http}carts/items/${id}`,{
        headers: {                     
        "Content-type": "application/json; charset=UTF-8",
      authorization: User?.token},
        method:"delete",
        // body:JSON.stringify({}) 
    })
    .then((data) => data.json())
    .then((data) => {
      if(data.success){
        getCart()
          alertFullil("Delete successfully")
        }else{
            alertFail(data.message)
        }
    }).catch((err)=>{
        console.log(err);
        alertFail(err)
    })
}
async function deleteAllCart(){
    await fetch(`${http}carts/`,{
        headers: {                     
        "Content-type": "application/json; charset=UTF-8",
      authorization: User?.token},
        method:"delete",
        // body:JSON.stringify({}) 
    })
    .then((data) => data.json())
    .then((data) => {
      if(data.success){
        getCart()
          alertFullil(data.message)
        }else{
            alertFail(data.message)
        }
    }).catch((err)=>{
        console.log(err);
        alertFail(err)
    })
}
window.addEventListener("load",function(){
    // header();
    getCart()
    // renderCart(carts);
    // U_quantityCart()
    const addCart = $("#add-to-cart");
    const deleteAll = $(".detele-all");
    deleteAll.addEventListener("click",function(){
      deleteAllCart();
    //   U_quantityCart()
    })

    addCart.addEventListener("change", function (e) {
        const quantityInput = e.target.closest(".quantity");
        const index = quantityInput.dataset.id;
        const id = dataCart[index].phone.id;
        // console.log(dataCart)
        // console.log(id)
        if(quantityInput){
            // console.log(quantityInput.value)
            if (+quantityInput.value >= 1 && +quantityInput.value <= 100) {
              dataCart[index].quantity= quantityInput.value; 
                updateCart(id,parseInt(quantityInput.value));
                // alertFullil();
                // U_quantityCart()
            }
            else{
                alertFail("sl khong dc lon hon 100")
            }
        }
    });

    addCart.addEventListener("click",function(e){
      const quantity = $(".quantity");
      const sub = e.target.closest(".sub");
      const plus = e.target.closest(".plus");
      const del = e.target.closest(".delete")
      //   U_quantityCart()
      if (sub) {
          const index = sub.dataset.id;
          const id = dataCart[index].phone.id;
          if (dataCart[index].quantity > 1) {
            // console.log(dataCart[index].quantity );
          dataCart[index].quantity--;
          sub.nextElementSibling.value = dataCart[index].quantity;
          updateCart(id,dataCart[index].quantity)
        //   U_quantityCart()
        }
      }
      if (plus) {
        const index = plus.dataset.id;
        const id = dataCart[index].phone.id;
        if (dataCart[index].quantity < 100) {
          dataCart[index].quantity++;
          plus.previousElementSibling.value = dataCart[index].quantity;
        // console.log(dataCart[index].quantity);
          updateCart(id,dataCart[index].quantity)
        //   U_quantityCart()
        }
      }
      if(del){
        const id = del.dataset.id;
        // console.log(id)
        deleteCart(id);
        // U_quantityCart()
      }
    })
    const btnCheckout= $(".checkout")
    btnCheckout.addEventListener("click",function(e){
      if(dataCart.length != 0){
        window.location.replace("./payment.html")
      }
      else{
        alertFail("gio hang trong")
      }
    })
})