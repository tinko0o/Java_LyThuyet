const http = "http://localhost:8080/api/";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const User = JSON.parse(localStorage.getItem("loginUser"));
import {formatCurrency,alertFullil,alertFail} from "./header.js";

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
      // dataCart = [...data?.cart?.cartItems]
      if(data.success && data.message == "Cart is empty"){
        renderProduct(null)
        }else{         
        //   dataCart = [...data?.cart?.cartItems]
          renderProduct(data?.cart)
          // console.log(dataCart)
        }
    }).catch((err)=>{
        console.log(err);
        alertFail(err)
    })
}
async function createOder(phone, address){
    await fetch(`${http}purchases/add`,{
        headers: {                     
        "Content-type": "application/json; charset=UTF-8",
      authorization: User?.token},
        method:"post",
        body:JSON.stringify({phone, address}) 
    })
    .then((data) => data.json())
    .then((data) => {
      if(data.success){
          alertFullil(data.message)
          window.location.replace("./thank.html");
        }else{
            alertFail(data.message)
        }
    }).catch((err)=>{
        console.log(err);
        alertFail(err)
    })
}
function renderProduct(data){
    if(data !=null){
        const html = data.cartItems.map((val,index)=>{
        let total = val.quantity*val.price;
            return`
            <div class="product">
                <img src="${val.phone.img}" alt="">
                <div class="p-name">
                    <h4 class="name-product">${val.phone.name}</h4>
                     <span class="quantity">X${val.quantity}</span>
                </div>
                <p class="p-total">${formatCurrency(val.total)}</p>
            </div>
            `
        })
        $(".products").innerHTML = html.join("");
        $(".subtotal-detail").innerHTML = formatCurrency(parseInt(data.total));
        // total=data.data.total;
    }else{
        $(".products").innerHTML = " no product";
        $(".subtotal-detail").innerHTML = "0d";
    }
}
window.addEventListener("load",function(){
    getCart()
    if(User){
        $("#u-name").value= User?.user;
        $("#u-name").setAttribute("disabled","disabled")       
    }
        const form=$(".f-checkout")
    form.addEventListener("submit",function(e){
        e.preventDefault()
        const name =this.elements["name"].value;
        const phone =this.elements["phone"].value;
        const address =this.elements["address"].value;
        console.log(phone,address)
        createOder(phone,address);
    })
})