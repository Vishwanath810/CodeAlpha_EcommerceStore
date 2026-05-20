const cartItems = document.getElementById("cartItems");

const totalElement = document.getElementById("total");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price;

        cartItems.innerHTML += `
        
        <div class="card">

            <img src="${item.image}" alt="${item.name}">

            <h3>${item.name}</h3>

            <p>${item.description}</p>

            <h2>₹${item.price}</h2>

            <button onclick="removeItem(${index})">
                Remove
            </button>

        </div>
        
        `;

    });

    totalElement.innerText = `Total: ₹${total}`;

}


// Remove item
function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();

}

async function placeOrder() {

    if (cart.length === 0) {

        alert("Cart is empty");

        return;

    }

    let total = 0;

    cart.forEach(item => {
        total += item.price;
    });

    try {

        const response = await fetch(
            "http://localhost:5000/api/orders",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    items: cart,
                    totalAmount: total
                })
            }
        );

        const data = await response.json();

        alert(data.message);

        localStorage.removeItem("cart");

        window.location.reload();

    } catch (error) {

        console.log(error);

    }

}

displayCart();