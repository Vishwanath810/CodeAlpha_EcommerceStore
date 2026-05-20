const productsContainer = document.getElementById("products");


// Fetch products
async function fetchProducts() {

    try {

        const response = await fetch("http://localhost:5000/api/products");

        const products = await response.json();

        displayProducts(products);

    } catch (error) {

        console.log(error);

    }

}


// Display products
function displayProducts(products) {

    productsContainer.innerHTML = "";

    products.forEach(product => {

        productsContainer.innerHTML += `
        
        <div class="card">

            <img src="${product.image}" alt="${product.name}">

            <div class="card-content">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <h2>₹${product.price}</h2>

                <button onclick='addToCart(${JSON.stringify(product)})'>
                    Add to Cart
                </button>

            </div>

        </div>
        
        `;

    });

}


// Add to cart
function addToCart(product) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product Added To Cart");

}


fetchProducts();