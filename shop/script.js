// ===== GLOBAL VARIABLES =====
let cart = [];
let wishlist = [];
let currentUser = null;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initApp();
    loadSavedData();
    setupEventListeners();
    showLoadingAnimation();
});

// ===== CORE FUNCTIONS =====
function initApp() {
    // Set current year in footer
    document.querySelector('.footer-bottom p').textContent = 
        `© ${new Date().getFullYear()} QuickWear. All rights reserved.`;
}

function loadSavedData() {
    // Load cart
    const savedCart = localStorage.getItem('quickwear_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
    }
    
    // Load wishlist
    const savedWishlist = localStorage.getItem('quickwear_wishlist');
    if (savedWishlist) {
        wishlist = JSON.parse(savedWishlist);
        updateWishlistIcons();
    }
    
    // Load user
    const savedUser = localStorage.getItem('quickwear_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserIcon();
    }
}

function setupEventListeners() {
    // Mobile menu toggle
    document.getElementById('hamburger').addEventListener('click', toggleMobileMenu);
    
    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('keypress', handleSearch);
    document.querySelector('.search-icon').addEventListener('click', () => performSearch(searchInput.value));
    
    // Product filtering
    if (document.querySelector('.footwear-filter-btn')) {
        document.querySelectorAll('.footwear-filter-btn').forEach(btn => {
            btn.addEventListener('click', filterFootwear);
        });
    }
    
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
    
    // Wishlist buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        if (btn.querySelector('.fa-heart')) {
            btn.addEventListener('click', toggleWishlist);
        }
    });
    
    // Newsletter subscription
    if (document.getElementById('newsletter-form')) {
        document.getElementById('newsletter-form').addEventListener('submit', subscribeToNewsletter);
    }
    
    // Header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
}

// ===== UI FUNCTIONS =====
function showLoadingAnimation() {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.classList.add('fade-out');
        
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1500);
}

function handleHeaderScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

function toggleMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Toggle body scroll
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        this.classList.add('active');
        
        // Close mobile menu if open
        if (document.getElementById('nav-menu').classList.contains('active')) {
            toggleMobileMenu();
        }
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ===== FOOTWEAR FILTERING =====
function filterFootwear() {
    // Update active button
    document.querySelectorAll('.footwear-filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    this.classList.add('active');
    
    const filter = this.getAttribute('data-filter');
    const footwearCards = document.querySelectorAll('.footwear-card');
    
    footwearCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        
        if (filter === 'all' || categories.includes(filter)) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease forwards';
        } else {
            card.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// ===== CART FUNCTIONALITY =====
function addToCart() {
    const productCard = this.closest('.footwear-card');
    const productId = productCard.getAttribute('data-id') || Date.now().toString();
    const productName = productCard.querySelector('.footwear-title').textContent;
    const productPrice = parseFloat(
        productCard.querySelector('.footwear-price').textContent.replace('$', '')
    );
    const productImage = productCard.querySelector('.footwear-img').src;
    
    // Check if product exists in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveCartToStorage();
    
    // Show notification
    showNotification(`${productName} added to cart!`);
    
    // Add button animation
    this.classList.add('clicked');
    setTimeout(() => {
        this.classList.remove('clicked');
    }, 300);
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.querySelector('.cart-count');
    
    cartCountElement.textContent = totalItems;
    if (totalItems > 0) {
        cartCountElement.style.display = 'flex';
    } else {
        cartCountElement.style.display = 'none';
    }
}

function saveCartToStorage() {
    try {
        localStorage.setItem('quickwear_cart', JSON.stringify(cart));
    } catch (e) {
        console.error('Error saving cart:', e);
    }
}

// ===== WISHLIST FUNCTIONALITY =====
function toggleWishlist() {
    const productCard = this.closest('.footwear-card');
    const productId = productCard.getAttribute('data-id') || Date.now().toString();
    const productName = productCard.querySelector('.footwear-title').textContent;
    const productPrice = parseFloat(
        productCard.querySelector('.footwear-price').textContent.replace('$', '')
    );
    const productImage = productCard.querySelector('.footwear-img').src;
    const heartIcon = this.querySelector('i');
    
    // Check if product is in wishlist
    const existingIndex = wishlist.findIndex(item => item.id === productId);
    
    if (existingIndex >= 0) {
        // Remove from wishlist
        wishlist.splice(existingIndex, 1);
        heartIcon.classList.remove('fas');
        heartIcon.classList.add('far');
        heartIcon.style.color = '';
        showNotification(`${productName} removed from wishlist`, 'info');
    } else {
        // Add to wishlist
        wishlist.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage
        });
        heartIcon.classList.remove('far');
        heartIcon.classList.add('fas');
        heartIcon.style.color = '#e74c3c';
        showNotification(`${productName} added to wishlist!`, 'success');
    }
    
    saveWishlistToStorage();
}

function updateWishlistIcons() {
    document.querySelectorAll('.footwear-card').forEach(card => {
        const productId = card.getAttribute('data-id') || '';
        const heartIcon = card.querySelector('.fa-heart');
        
        if (heartIcon && wishlist.some(item => item.id === productId)) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
            heartIcon.style.color = '#e74c3c';
        }
    });
}

function saveWishlistToStorage() {
    try {
        localStorage.setItem('quickwear_wishlist', JSON.stringify(wishlist));
    } catch (e) {
        console.error('Error saving wishlist:', e);
    }
}

// ===== SEARCH FUNCTIONALITY =====
function handleSearch(e) {
    if (e.key === 'Enter') {
        performSearch(this.value);
    }
}

function performSearch(query) {
    if (query.trim()) {
        // In a real app, this would redirect to search results
        showNotification(`Searching for: "${query}"`, 'info');
        document.querySelector('.search-input').value = '';
    }
}

// ===== NEWSLETTER =====
function subscribeToNewsletter(e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    const email = emailInput.value.trim();
    
    if (validateEmail(email)) {
        // Save to localStorage
        const subscribers = JSON.parse(localStorage.getItem('quickwear_subscribers') || '[]');
        subscribers.push({
            email: email,
            date: new Date().toISOString()
        });
        localStorage.setItem('quickwear_subscribers', JSON.stringify(subscribers));
        
        showNotification('Thank you for subscribing!', 'success');
        emailInput.value = '';
    } else {
        showNotification('Please enter a valid email address', 'error');
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== USER ACCOUNT =====
function updateUserIcon() {
    const userIcon = document.querySelector('.fa-user');
    if (currentUser) {
        userIcon.classList.add('logged-in');
        userIcon.setAttribute('title', 'My Account');
    } else {
        userIcon.classList.remove('logged-in');
        userIcon.setAttribute('title', 'Login/Signup');
    }
}