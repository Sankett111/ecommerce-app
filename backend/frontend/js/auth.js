const authButtons = document.getElementById('authButtons');
const userAvatar = document.getElementById('userAvatar');
const avatarInitials = document.querySelector('.avatar-initials');
const logoutBtn = document.getElementById('logoutBtn');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        alert('Login successful! (Simulated)');
        loginForm.reset();
        document.getElementById('loginModal').style.display = 'none';
        
        
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
    }
});


signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    try {
        alert('Account created successfully! (Simulated)');
        signupForm.reset();
        document.getElementById('signupModal').style.display = 'none';
    } catch (error) {
        console.error('Signup error:', error);
        alert('Signup failed. Please try again.');
    }
});

let isLoggedIn = false; 
let currentUser = null;

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        
        isLoggedIn = true;
        currentUser = {
            name: 'Sanket Nandurkar',
            email: email
        };
       
        updateAuthUI();
        
        alert('Login successful!');
        loginForm.reset();
        document.getElementById('loginModal').style.display = 'none';
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please try again.');
    }
});

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    try {
       
        isLoggedIn = true;
        currentUser = {
            name: name,
            email: email
        };
        
        updateAuthUI();
        
        alert('Account created successfully!');
        signupForm.reset();
        document.getElementById('signupModal').style.display = 'none';
    } catch (error) {
        console.error('Signup error:', error);
        alert('Signup failed. Please try again.');
    }
});


logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isLoggedIn = false;
    currentUser = null;
    updateAuthUI();
});


function updateAuthUI() {
    if (isLoggedIn && currentUser) {
        
        authButtons.style.display = 'none';
        userAvatar.style.display = 'block';
        
        const names = currentUser.name.split(' ');
        const initials = names.map(name => name[0]).join('').toUpperCase();
        avatarInitials.textContent = initials;
    } else {
        
        authButtons.style.display = 'flex';
        userAvatar.style.display = 'none';
    }
}


updateAuthUI();