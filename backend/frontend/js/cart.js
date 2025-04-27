// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const cartCount = document.querySelector('.cart-count');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Update cart total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Render cart items
function renderCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Your cart is empty</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">₹${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <span class="remove-item" data-id="${item.id}">Remove</span>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', decreaseQuantity);
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', increaseQuantity);
    });
    
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', updateQuantity);
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', removeItem);
    });
    
    updateCartTotal();
}

// Add to cart
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    saveCart();
    updateCartCount();
    renderCartItems();
}

// Decrease quantity
function decreaseQuantity(e) {
    const id = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === id);
    
    if (item.quantity > 1) {
        item.quantity -= 1;
    } else {
        cart = cart.filter(item => item.id !== id);
    }
    
    saveCart();
    updateCartCount();
    renderCartItems();
}

// Increase quantity
function increaseQuantity(e) {
    const id = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === id);
    item.quantity += 1;
    
    saveCart();
    updateCartCount();
    renderCartItems();
}

// Update quantity
function updateQuantity(e) {
    const id = parseInt(e.target.getAttribute('data-id'));
    const quantity = parseInt(e.target.value);
    const item = cart.find(item => item.id === id);
    
    if (quantity >= 1) {
        item.quantity = quantity;
    } else {
        cart = cart.filter(item => item.id !== id);
    }
    
    saveCart();
    updateCartCount();
    renderCartItems();
}

// Remove item
function removeItem(e) {
    const id = parseInt(e.target.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== id);
    
    saveCart();
    updateCartCount();
    renderCartItems();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Initialize cart
updateCartCount();
renderCartItems();

// Event delegation for add to cart buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const product = sampleProducts.find(p => p.id === productId);
        addToCart(product);
    }
});

// TODO: Connect to backend for cart persistence
// function syncCartWithBackend() {
//     if (userIsLoggedIn) {
//         fetch('/api/cart', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${userToken}`
//             },
//             body: JSON.stringify({ cart })
//         })
//         .then(response => response.json())
//         .then(data => {
//             // Handle response
//         });
//     }
// }