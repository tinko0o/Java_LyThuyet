const http = "http://localhost:8080/api/";
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
import {formatCurrency,alertFullil,alertFail} from "./header.js";
const User = JSON.parse(localStorage.getItem("loginUser"));
function head () {
    if (User) {
    const showUser = $(".user");
    showUser.innerHTML = `<i class="fa-solid fa-user"></i> ${User?.user}
    <ul class="dropdown-user">
        <li class="profile">Your profile</li>
        <li class="purchase"><a href="./purchase.html">Purchase</a></li>
        <li class="logout">Logout</li>
    </ul>
    `;

    const logoff = $(".logout");
    logoff.addEventListener("click", function () {
      localStorage.removeItem("loginUser");
      window.location.reload();
    });
  }
}


function renderProduct (data) {
const productHtml = data.map((val, index) => { 
    return `
    <div class="product col-lg-4 col-md-6 col-xl-3">
    <div class="item">
    <div class="image">
    <a class="detail-img" data-id=${val.id} href="#">
        <img src="${val.img}" alt="imagesProduct">
    </a>
    </div>
    <button data-id=${val.id} class="add-cart">Thêm vào giỏ</button>
    </div>
    <div class="content">
    <p class="price">${formatCurrency(val.price)}</p>
    <h4 class="product-name">${val.name}</h4>
    </div>
    </div>
    `;
    });

$(".wrapper-products").innerHTML = productHtml.join("");
}
async function getProduct(){
    await fetch(`${http}phones/`,{
        headers: {                     
        "Content-type": "application/json; charset=UTF-8"
        },
        method:"get",
        // body:JSON.stringify({nextUrl,total}) 
        
    })
    .then((data) => data.json())
    .then((data) => {
        // console.log(data);
        renderProduct (data.phones)
    }).catch((err)=>{
        console.log(err);
    })
}
async function addCart(id){
    await fetch(`${http}carts/add`,{
        headers: {                     
        "Content-type": "application/json; charset=UTF-8",
        authorization: User?.token},
        method:"post",
        body:JSON.stringify({id}) 
        
    })
    .then((data) => data.json())
    .then((data) => {
    //   console.log(data);
      if(!data.success){
        alertFail(data.message)
      }else{
          alertFullil(data.message)
      }
    }).catch(()=>{
        alertFail()
    })
}
async function searchPhones(name){
    await fetch(`${http}phones/searchPhones`,{
        headers: {                     
        "Content-type": "application/json; charset=UTF-8"
        },
        method:"post",
        // body:JSON.stringify({name}) 
        
    })
    .then((data) => data.json())
    .then((data) => {
        console.log("search",data);
    }).catch((err)=>{
        console.log(err);
    })
}
window.addEventListener('load',function(e){
    getProduct()
    head()
    searchPhones("vivo")
    const products=[];
    const wrapperDetail = $(".wrapper-products");
        wrapperDetail.onclick= function(e){
        e.preventDefault();
        const detailImg = e.target.closest(".detail-img");
        const detailName = e.target.closest(".product-name");
        const btnAddCart = e.target.closest(".add-cart");
        //button add cart
        if(btnAddCart){
            // console.log("btn them vao gio");
            const id = btnAddCart.dataset.id;
            // console.log(id);
            addCart(id)
        }
        }
})