
const sampleProducts = [
    {
        id: 1,
        name: "Classic White T-Shirt",
        price: 500,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 2,
        name: "Blue Denim Jeans",
        price: 800,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 3,
        name: "Black Leather Jacket",
        price: 1500,
        image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 4,
        name: "Casual Sneakers",
        price: 2000,
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
        id: 5,
        name: "Wool Winter Coat",
        price: 3500,
        image: "https://images.unsplash.com/photo-1580314030478-327a103e4146?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: 6,
        name: "Silk Summer Dress",
        price: 65.99,
        image: "https://images.unsplash.com/photo-1610631344924-b7df7cf236c5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];


const productGrid = document.getElementById('productGrid');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeButtons = document.querySelectorAll('.close');
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.querySelector('.close-cart');


function displayProducts(products) {
    productGrid.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">₹${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}


loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

signupBtn.addEventListener('click', () => {
    signupModal.style.display = 'block';
});

closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        loginModal.style.display = 'none';
        signupModal.style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (e.target === signupModal) {
        signupModal.style.display = 'none';
    }
});

cartIcon.addEventListener('click', () => {
    cartSidebar.classList.add('open');
});

closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('open');
});


document.addEventListener('DOMContentLoaded', () => {
    displayProducts(sampleProducts);
    
    
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        
        loginBtn.addEventListener('click', () => {
            loginModal.style.display = 'block';
        });
        
        signupBtn.addEventListener('click', () => {
            signupModal.style.display = 'block';
        });
    }
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (e.target === signupModal) {
        signupModal.style.display = 'none';
    }
    if (e.target === checkoutModal) {
        checkoutModal.style.display = 'none';
    }
    if (e.target === orderSuccessModal) {
        orderSuccessModal.style.display = 'none';
    }
});


closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        loginModal.style.display = 'none';
        signupModal.style.display = 'none';
        checkoutModal.style.display = 'none';
        orderSuccessModal.style.display = 'none';
    });
});