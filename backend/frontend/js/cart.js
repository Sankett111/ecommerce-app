let paymentTimer;
let timeLeft = 300;


let cart = JSON.parse(localStorage.getItem('cart')) || [];


const cartCount = document.querySelector('.cart-count');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');


function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

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

function increaseQuantity(e) {
    const id = parseInt(e.target.getAttribute('data-id'));
    const item = cart.find(item => item.id === id);
    item.quantity += 1;
    
    saveCart();
    updateCartCount();
    renderCartItems();
}

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

function removeItem(e) {
    const id = parseInt(e.target.getAttribute('data-id'));
    cart = cart.filter(item => item.id !== id);
    
    saveCart();
    updateCartCount();
    renderCartItems();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

updateCartCount();
renderCartItems();

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const product = sampleProducts.find(p => p.id === productId);
        addToCart(product);
    }
});


document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add some items before checkout.');
        return;
    }
    
    
    cartSidebar.classList.remove('open');
    
    
    document.getElementById('checkoutSection').style.display = 'block';
    
    
    document.getElementById('checkoutSection').scrollIntoView({ behavior: 'smooth' });
    
    
    renderOrderSummary();
});

function renderOrderSummary() {
    const orderItems = document.getElementById('orderItems');
    const orderSubtotal = document.getElementById('orderSubtotal');
    const orderShipping = document.getElementById('orderShipping');
    const orderTotal = document.getElementById('orderTotal');
    
    orderItems.innerHTML = '';
    
    if (cart.length === 0) {
        orderItems.innerHTML = '<p>Your cart is empty</p>';
        return;
    }
    
    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="order-item-info">
                <img src="${item.image}" alt="${item.name}" class="order-item-image">
                <div>
                    <h4>${item.name}</h4>
                    <p>₹${item.price.toFixed(2)} × ${item.quantity}</p>
                </div>
            </div>
            <p class="order-item-total">₹${(item.price * item.quantity).toFixed(2)}</p>
        `;
        orderItems.appendChild(orderItem);
    });
    
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 999 ? 0 : 50; 
    const total = subtotal + shipping;
    
    orderSubtotal.textContent = subtotal.toFixed(2);
    orderShipping.textContent = shipping.toFixed(2);
    orderTotal.textContent = total.toFixed(2);
}


document.getElementById('checkoutForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    
    const orderId = 'FH' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    
    
    document.getElementById('orderId').textContent = orderId;
    document.getElementById('orderConfirmationModal').style.display = 'block';
    
    
    localStorage.removeItem('cart');
    cart = [];
    
    
    updateCartCount();
    
    
    document.getElementById('checkoutSection').style.display = 'none';
});


document.querySelector('#orderConfirmationModal .close').addEventListener('click', () => {
    document.getElementById('orderConfirmationModal').style.display = 'none';
});


document.getElementById('continueShoppingBtn').addEventListener('click', () => {
    document.getElementById('orderConfirmationModal').style.display = 'none';
    window.location.href = 'index.html';
});


window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('orderConfirmationModal')) {
        document.getElementById('orderConfirmationModal').style.display = 'none';
    }
});


document.getElementById('payment').addEventListener('change', function() {
    const googlePayContainer = document.getElementById('googlePayContainer');
    if (this.value === 'googlepay') {
        googlePayContainer.style.display = 'block';
        generateQRCode();
        startPaymentTimer();
    } else {
        googlePayContainer.style.display = 'none';
        clearInterval(paymentTimer);
    }
});


function generateQRCode() {
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    qrCodeContainer.innerHTML = '';
    
    
    const paymentData = {
        merchant: 'FashionHub',
        amount: document.getElementById('orderTotal').textContent,
        currency: 'INR',
        reference: 'FH' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0')
    };
    
    
    const qrSize = 180;
    const qrCode = document.createElement('div');
    qrCode.style.width = qrSize + 'px';
    qrCode.style.height = qrSize + 'px';
    qrCode.style.backgroundColor = 'white';
    qrCode.style.backgroundImage = `url('https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(JSON.stringify(paymentData))}')`;
    qrCode.style.backgroundSize = 'contain';
    qrCode.style.backgroundRepeat = 'no-repeat';
    qrCode.style.backgroundPosition = 'center';
    
    qrCodeContainer.appendChild(qrCode);
}


function startPaymentTimer() {
    timeLeft = 300; 
    updateTimerDisplay();
    
    clearInterval(paymentTimer);
    paymentTimer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(paymentTimer);
            alert('Payment time has expired. Please select your payment method again.');
            document.getElementById('googlePayContainer').style.display = 'none';
            document.getElementById('payment').value = '';
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('paymentTimer').textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    
    if (timeLeft <= 60) {
        document.getElementById('paymentTimer').style.color = 'red';
    } else {
        document.getElementById('paymentTimer').style.color = 'var(--primary-color)';
    }
}


document.getElementById('checkoutForm').addEventListener('submit', (e) => {
    clearInterval(paymentTimer);
    
});