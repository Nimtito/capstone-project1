// LOAD CART OR CREATE NEW
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART
function addToCart(name, price){
    const existing = cart.find(item => item.name === name);

    if(existing){
        existing.qty++;
    } else {
        cart.push({name, price, qty:1});
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    showMessage(name + " added to cart");
}

// SHOW MESSAGE (BETTER THAN ALERT)
function showMessage(msg){
    const message = document.createElement("div");
    message.innerText = msg;

    message.style.position = "fixed";
    message.style.bottom = "20px";
    message.style.right = "20px";
    message.style.background = "orange";
    message.style.color = "#fff";
    message.style.padding = "10px 15px";
    message.style.borderRadius = "6px";

    document.body.appendChild(message);

    setTimeout(()=>{
        message.remove();
    }, 2000);
}