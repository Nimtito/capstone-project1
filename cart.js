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
        alert(" User already exists!");
        return;
    }

    users.push({username, password});
    localStorage.setItem("users", JSON.stringify(users));

    alert(" Registration successful!");
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

        alert(" Login successful!");
    } else {
        alert(" Invalid username or password");
    }
});


//  CHECKOUT 
document.getElementById("checkoutForm")?.addEventListener("submit", function(e){
    e.preventDefault();

    if(!currentUser){
        alert(" Please login first!");
        return;
    }

    if(cart.length === 0){
        alert(" Your cart is empty!");
        return;
    }

    const name = document.getElementById("name").value;

    alert(" Order placed successfully, " + name + "!");

    
    localStorage.removeItem("cart");
    cart = [];

    displayCart();
});

