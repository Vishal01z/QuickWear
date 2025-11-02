// User Authentication System
document.addEventListener('DOMContentLoaded', function() {
    // Signup Form
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            if (password !== confirmPassword) {
                alert("Passwords don't match!");
                return;
            }
            
            // Save user to localStorage
            const user = {
                name,
                email,
                password
            };
            
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem(email, JSON.stringify(user));
            
            alert('Account created successfully! Redirecting to login...');
            window.location.href = 'login.html';
        });
    }
    
    // Login Form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            const user = JSON.parse(localStorage.getItem(email));
            
            if (!user || user.password !== password) {
                alert('Invalid email or password');
                return;
            }
            
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Login successful! Redirecting to homepage...');
            window.location.href = '/frontend/index.html';
        });
    }
});