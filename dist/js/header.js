const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const alertSuccess = $(".alert-primary");
const alertDanger = $(".alert-danger");

//alert
export  function alertFullil(message="success", time = 2000) {
  alertSuccess.children[0].textContent = `${message}`;
  alertSuccess.classList.add("get-active");
  setTimeout(() => {
    alertSuccess.classList.remove("get-active");
  }, time);
}

export  function alertFail(message="Something fail!",time = 2000) {
  alertDanger.children[0].textContent = `${message}`;
  alertDanger.classList.add("get-active");
  setTimeout(() => {
    alertDanger.classList.remove("get-active");
  }, time);
}
//formatCurrency
export  function formatCurrency(price, symbol = "đ") {
  var DecimalSeparator = Number('1.2').toLocaleString().substr(1, 1);
  var priceWithCommas = price.toLocaleString();
  var arParts = String(priceWithCommas).split(DecimalSeparator);
  var intPart = arParts[0];
  var decPart = arParts.length > 1 ? arParts[1] : '';
  decPart = (decPart + '000').substr(0, 3);
  return intPart + symbol;
}
