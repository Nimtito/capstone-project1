//  USERS
let users = JSON.parse(localStorage.getItem("users")) || [];

//  CURRENT USER
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;

//  CART 
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// REGISTER 
document.getElementById("registerForm")?.addEventListener("submit", function(e){
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // check if user exists
    const exists = users.find(u => u.username === username);

    if(exists){
        alert("❌ User already exists!");
        return;
    }

    users.push({username, password});
    localStorage.setItem("users", JSON.stringify(users));

    alert("✅ Registration successful!");
});


// LOGIN 
document.getElementById("loginForm")?.addEventListener("submit", function(e){
    e.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const user = users.find(u => u.username === username && u.password === password);

    if(user){
        localStorage.setItem("currentUser", JSON.stringify(user));
        currentUser = user;

        alert("✅ Login successful!");
    } else {
        alert("❌ Invalid username or password");
    }
});


//  DISPLAY CART 
function displayCart(){
    const cartEmpty = document.getElementById("cart-empty");
    const cartContent = document.getElementById("cart-content");
    const itemsDiv = document.getElementById("cart-items");
    const totalEl = document.getElementById("total");

    if(cart.length === 0){
        cartEmpty.style.display = "block";
        cartContent.style.display = "none";
        return;
    }

    cartEmpty.style.display = "none";
    cartContent.style.display = "block";

    itemsDiv.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;

        itemsDiv.innerHTML += `
            <div class="cart-item">
                <p>${item.name}</p>
                <p>Ksh ${item.price} x ${item.qty}</p>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;
    });

    totalEl.innerText = total;
}


//  REMOVE ITEM
function removeItem(index){
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    alert("❌ Item removed from cart");
    displayCart();
}


//  CHECKOUT 
document.getElementById("checkoutForm")?.addEventListener("submit", function(e){
    e.preventDefault();

    if(!currentUser){
        alert("⚠️ Please login first!");
        return;
    }

    if(cart.length === 0){
        alert("⚠️ Your cart is empty!");
        return;
    }

    const name = document.getElementById("name").value;

    alert("🎉 Order placed successfully, " + name + "!");

    // clear chat
    localStorage.removeItem("cart");
    cart = [];

    displayCart();
});



displayCart();