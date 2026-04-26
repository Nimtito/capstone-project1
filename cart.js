// ================= LOAD CART =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ================= DISPLAY CART =================
function displayCart(){
    const empty = document.getElementById("cart-empty");
    const content = document.getElementById("cart-content");
    const itemsDiv = document.getElementById("cart-items");
    const totalEl = document.getElementById("total");

    itemsDiv.innerHTML = "";
    let total = 0;

    if(cart.length === 0){
        empty.style.display = "block";
        content.style.display = "none";
        return;
    }

    empty.style.display = "none";
    content.style.display = "block";

    cart.forEach((item, index) => {

        total += item.price * item.qty;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <p>${item.name}</p>

            <div>
                <button onclick="decrease(${index})">−</button>
                ${item.qty}
                <button onclick="increase(${index})">+</button>
            </div>

            <p>Ksh ${item.price}</p>

            <button onclick="removeItem(${index})">Remove</button>
        `;

        itemsDiv.appendChild(div);
    });

    totalEl.innerText = total;
}

// ================= SAVE CART =================
function saveCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// ================= INCREASE =================
function increase(index){
    cart[index].qty++;
    saveCart();
}

// ================= DECREASE =================
function decrease(index){
    if(cart[index].qty > 1){
        cart[index].qty--;
    } else {
        cart.splice(index, 1);
    }
    saveCart();
}

// ================= REMOVE =================
function removeItem(index){
    cart.splice(index, 1);
    saveCart();
}

// ================= CLEAR CART (OPTIONAL) =================
function clearCart(){
    cart = [];
    saveCart();
}

// ================= CHECKOUT =================
function checkout(){
    if(cart.length === 0){
        alert("Your cart is empty!");
        return;
    }

    alert("Proceeding to checkout...");
    // later you connect to payment/login page
}

// ================= RUN ON LOAD =================
displayCart();