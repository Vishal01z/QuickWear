// Global Variables
let wishlistCount = 0;
let cartCount = 0;
let currentCarouselSlide = 0;
let carouselInterval;

// Sample product data for search
const productDatabase = [
  { name: "iPhone 15 Pro", category: "Electronics", price: "₹1,34,900" },
  { name: "Nike Air Max", category: "Footwear", price: "₹12,995" },
  { name: "Samsung 4K TV", category: "Electronics", price: "₹45,999" },
  { name: "Levi's Jeans", category: "Fashion", price: "₹3,999" },
  { name: "MacBook Air", category: "Electronics", price: "₹1,14,900" },
  { name: "Adidas Sneakers", category: "Footwear", price: "₹8,999" },
  { name: "Sony Headphones", category: "Electronics", price: "₹15,999" },
  { name: "Zara Jacket", category: "Fashion", price: "₹5,999" },
  { name: "Canon DSLR", category: "Electronics", price: "₹65,999" },
  { name: "H&M Dress", category: "Fashion", price: "₹2,999" }
];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
  initLoader();
  initCarousel();
  initSearch();
  initLogin();
  initNavigation();
  initTrendingCategories();
  initFeaturedProducts();
  initBrands();
  initNewsletterForm();
  updateYear();
  initScrollAnimations();
});

// Loader Animation
function initLoader() {
  const loader = document.getElementById('loader');
  
  setTimeout(() => {
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
        document.body.style.overflow = 'visible';
      }, 500);
    }
  }, 1500);
}

// Carousel Functionality
function initCarousel() {
  const carouselItems = [
    {
      bg: "/pexels-olly-1050244.jpg",
      h1: "Fashion Revolution Starts Here",
      desc: "Discover the latest trends with up to 70% off on premium brands",
      btn: "Shop Collection"
    },
    {
      bg: "/pexels-tim-douglas-6567607.jpg",
      h1: "Tech That Transforms",
      desc: "Latest gadgets and electronics with exclusive online deals",
      btn: "Explore Tech"
    },
    {
      bg: "/back.png",
      h1: "Step Into Style",
      desc: "Premium footwear collection for every occasion and season",
      btn: "Shop Footwear"
    }
  ];

  renderCarousel(carouselItems);
  startCarouselAutoPlay();
  setupCarouselControls(carouselItems);
}

function renderCarousel(items) {
  const slidesContainer = document.getElementById('carouselSlides');
  const indicatorsContainer = document.getElementById('carouselIndicators');
  
  let slidesHTML = '';
  let indicatorsHTML = '';
  
  items.forEach((slide, index) => {
    slidesHTML += `
      <div class="carousel-slide ${index === 0 ? 'active' : ''}" style="background-image: url('${slide.bg}')">
        <div class="carousel-content">
          <h1>${slide.h1}</h1>
          <p>${slide.desc}</p>
          <a href="#trending" class="btn-cta">${slide.btn}</a>
        </div>
      </div>
    `;
    
    indicatorsHTML += `
      <span class="carousel-indicator ${index === 0 ? 'active' : ''}" data-slide="${index}"></span>
    `;
  });
  
  slidesContainer.innerHTML = slidesHTML;
  indicatorsContainer.innerHTML = indicatorsHTML;
}

function setupCarouselControls(items) {
  const nextBtn = document.getElementById('carouselNext');
  const prevBtn = document.getElementById('carouselPrev');
  const indicators = document.getElementById('carouselIndicators');
  
  nextBtn.addEventListener('click', () => {
    currentCarouselSlide = (currentCarouselSlide + 1) % items.length;
    updateCarouselSlide();
    resetCarouselAutoPlay();
  });
  
  prevBtn.addEventListener('click', () => {
    currentCarouselSlide = (currentCarouselSlide - 1 + items.length) % items.length;
    updateCarouselSlide();
    resetCarouselAutoPlay();
  });
  
  indicators.addEventListener('click', (e) => {
    if (e.target.classList.contains('carousel-indicator')) {
      currentCarouselSlide = parseInt(e.target.dataset.slide);
      updateCarouselSlide();
      resetCarouselAutoPlay();
    }
  });
}

function updateCarouselSlide() {
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.carousel-indicator');
  
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentCarouselSlide);
  });
  
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle('active', index === currentCarouselSlide);
  });
}

function startCarouselAutoPlay() {
  carouselInterval = setInterval(() => {
    const totalSlides = document.querySelectorAll('.carousel-slide').length;
    currentCarouselSlide = (currentCarouselSlide + 1) % totalSlides;
    updateCarouselSlide();
  }, 5000);
}

function resetCarouselAutoPlay() {
  clearInterval(carouselInterval);
  startCarouselAutoPlay();
}

// Search Functionality
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const suggestionsContainer = document.getElementById('searchSuggestions');
  
  searchInput.addEventListener('input', handleSearchInput);
  searchInput.addEventListener('focus', handleSearchFocus);
  searchInput.addEventListener('blur', handleSearchBlur);
  searchBtn.addEventListener('click', handleSearch);
  
  // Close suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-container')) {
      hideSuggestions();
    }
  });
}

function handleSearchInput(e) {
  const query = e.target.value.toLowerCase().trim();
  
  if (query.length > 0) {
    const suggestions = getSearchSuggestions(query);
    displaySuggestions(suggestions);
  } else {
    hideSuggestions();
  }
}

function getSearchSuggestions(query) {
  const suggestions = productDatabase.filter(product => 
    product.name.toLowerCase().includes(query) || 
    product.category.toLowerCase().includes(query)
  ).slice(0, 5);
  
  // Add some popular searches if no exact matches
  if (suggestions.length < 3) {
    const popularSearches = [
      { name: "Popular: Smartphones", category: "Electronics", isPopular: true },
      { name: "Trending: Sneakers", category: "Footwear", isPopular: true },
      { name: "Sale: Fashion Items", category: "Fashion", isPopular: true }
    ];
    
    popularSearches.forEach(item => {
      if (item.name.toLowerCase().includes(query) && suggestions.length < 5) {
        suggestions.push(item);
      }
    });
  }
  
  return suggestions;
}

function displaySuggestions(suggestions) {
  const suggestionsContainer = document.getElementById('searchSuggestions');
  
  if (suggestions.length === 0) {
    hideSuggestions();
    return;
  }
  
  let suggestionsHTML = '';
  suggestions.forEach(suggestion => {
    const icon = suggestion.isPopular ? 'fa-fire' : 'fa-search';
    suggestionsHTML += `
      <div class="suggestion-item" data-suggestion="${suggestion.name}">
        <i class="fas ${icon}"></i>
        <span>${suggestion.name}</span>
        ${suggestion.price ? `<small style="margin-left: auto; color: #667eea;">${suggestion.price}</small>` : ''}
      </div>
    `;
  });
  
  suggestionsContainer.innerHTML = suggestionsHTML;
  suggestionsContainer.classList.add('active');
  
  // Add click handlers for suggestions
  suggestionsContainer.querySelectorAll('.suggestion-item').forEach(item => {
    item.addEventListener('click', () => {
      const suggestionText = item.dataset.suggestion;
      document.getElementById('searchInput').value = suggestionText;
      hideSuggestions();
      performSearch(suggestionText);
    });
  });
}

function hideSuggestions() {
  const suggestionsContainer = document.getElementById('searchSuggestions');
  suggestionsContainer.classList.remove('active');
}

function handleSearchFocus() {
  const query = document.getElementById('searchInput').value.toLowerCase().trim();
  if (query.length > 0) {
    const suggestions = getSearchSuggestions(query);
    displaySuggestions(suggestions);
  }
}

function handleSearchBlur() {
  // Delay hiding suggestions to allow clicks
  setTimeout(() => {
    hideSuggestions();
  }, 200);
}

function handleSearch() {
  const query = document.getElementById('searchInput').value.trim();
  if (query) {
    performSearch(query);
  }
}

function performSearch(query) {
  // Simulate search functionality
  console.log('Searching for:', query);
  showNotification(`Searching for "${query}"...`, 'info');
  hideSuggestions();
}

// Login Modal Functionality
function initLogin() {
  const loginBtn = document.getElementById('loginBtn');
  const loginModal = document.getElementById('loginModal');
  const closeModal = document.getElementById('closeModal');
  const loginForm = document.getElementById('loginForm');
  
  loginBtn.addEventListener('click', openLoginModal);
  closeModal.addEventListener('click', closeLoginModal);
  loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
      closeLoginModal();
    }
  });
  
  loginForm.addEventListener('submit', handleLogin);
  
  // Social login buttons
  const socialBtns = document.querySelectorAll('.social-btn');
  socialBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const provider = btn.classList.contains('google') ? 'Google' : 'Facebook';
      showNotification(`${provider} login coming soon!`, 'info');
    });
  });
}

function openLoginModal() {
  const loginModal = document.getElementById('loginModal');
  loginModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
  const loginModal = document.getElementById('loginModal');
  loginModal.classList.remove('active');
  document.body.style.overflow = 'visible';
}

function handleLogin(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const email = e.target.querySelector('input[type="email"]').value;
  
  // Simulate login
  showNotification('Welcome back! Login successful.', 'success');
  closeLoginModal();
  
  // Update login button
  const loginBtn = document.getElementById('loginBtn');
  loginBtn.innerHTML = `<i class="fas fa-user-check"></i> <span>Hi, User!</span>`;
}

// Navigation Functionality
function initNavigation() {
  const hamburger = document.getElementById('hamburger');
  
  if (hamburger) {
    hamburger.addEventListener('click', toggleMobileMenu);
  }
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}




function toggleMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navbar = document.querySelector('.navbar');
  
  hamburger.classList.toggle('active');
  navbar.classList.toggle('mobile-menu-open');



}
function initMaleCategories() {
  const maleCategories = [
    {
      name: "Male Fashion",
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80",
      count: "1,000+ items",
      discount: "Up to 50% OFF"
    }
  ];

  const maleGrid = document.getElementById('maleGrid');
  let html = '';
  maleCategories.forEach(cat => {
    html += `
      <div class="trending-card">
        <div class="trending-image">
          <img src="${cat.image}" alt="${cat.name}">
          <div class="trending-overlay">
            <div class="trending-discount">${cat.discount}</div>
          </div>
        </div>
        <div class="trending-info">
          <h3>${cat.name}</h3>
          <p>${cat.count}</p>
        </div>
      </div>
    `;
  });
  maleGrid.innerHTML = html;
}

function initFemaleCategories() {
  const femaleCategories = [
    {
      name: "Female Fashion",
      image: "https://images.unsplash.com/photo-1520975930846-56c69af6b3c4?auto=format&fit=crop&w=400&q=80",
      count: "1,200+ items",
      discount: "Up to 55% OFF"
    }
  ];

  const femaleGrid = document.getElementById('femaleGrid');
  let html = '';
  femaleCategories.forEach(cat => {
    html += `
      <div class="trending-card">
        <div class="trending-image">
          <img src="${cat.image}" alt="${cat.name}">
          <div class="trending-overlay">
            <div class="trending-discount">${cat.discount}</div>
          </div>
        </div>
        <div class="trending-info">
          <h3>${cat.name}</h3>
          <p>${cat.count}</p>
        </div>
      </div>
    `;
  });
  femaleGrid.innerHTML = html;
}

// Trending Categories
function initTrendingCategories() {
  const categories = [
    {
      name: "Fashion & Apparel",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=400&q=80",
      count: "2,450+ items",
      discount: "Up to 60% OFF"
    },
    {
      name: "Accessories & Bags",
      image: "https://images.unsplash.com/photo-1682745230951-8a5aa9a474a0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      count: "400+ items",
      discount: "Up to 45% OFF"
    },
    {
      name: "Footwear Collection",
      image: "/frontend/images/Gemini_Generated_Image_6vqw4c6vqw4c6vqw.png",
      count: "800+ items",
      discount: "Up to 55% OFF",
      link: "../shop/Footwear.html" // 👈 link add kiya
    },
    {
      name: "Beauty & Personal Care",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=400&q=80",
      count: "650+ items",
      discount: "Up to 40% OFF"
    },
    {
      name: "Watches & Bracelets",
      image: "../frontend/images/watch.png",
      count: "900+ items",
      discount: "Up to 50% OFF"
    },
    {
      name: "Formal & Work Wear",
      image: "/frontend/images/generated-image (3).png",
      count: "450+ items",
      discount: "Up to 35% OFF"
    }
  ];
  
  const trendingGrid = document.getElementById('trendingGrid');
  let categoryHTML = '';
  
  categories.forEach((category, index) => {
    categoryHTML += `
      <div class="trending-card" data-category="${category.name}" data-link="${category.link || ''}">
        <div class="trending-image">
          <img src="${category.image}" alt="${category.name}" loading="lazy">
          <div class="trending-overlay">
            <div class="trending-discount">${category.discount}</div>
          </div>
        </div>
        <div class="trending-info">
          <h3>${category.name}</h3>
          <p>${category.count}</p>
        </div>
      </div>
    `;
  });
  
  trendingGrid.innerHTML = categoryHTML;
  
  // Add click handlers
  document.querySelectorAll('.trending-card').forEach(card => {
    card.addEventListener('click', () => {
      const link = card.dataset.link;
      const category = card.dataset.category;

      if (link) {
        // agar link diya gaya hai to us page pe le jao
        window.location.href = link;
      } else {
        // warna bas notification dikhado
        showNotification(`Exploring ${category}...`, 'info');
      }
    });
  });
}

// Featured Products
function initFeaturedProducts() {
  const products = [
    {
      id: 1,
      name: "Lehenga Cholis",
      brand: "SAFERSKY",
      price: "₹5,999",
      originalPrice: "₹24,999",
      discount: "80% OFF",
      image: "/frontend/images/generated-image (5).png",
      rating: 4.5,
      reviews: 2847
    },
    {
      id: 2,
      name: "Designer Leather Jacket",
      brand: "StyleCraft",
      price: "₹3,499",
      originalPrice: "₹12,999",
      discount: "65% OFF",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80",
      rating: 4.3,
      reviews: 1523
    },
    {
      id: 3,
      name: "Smart Fitness Watch",
      brand: "FitTech",
      price: "₹1,999",
      originalPrice: "₹8,999",
      discount: "32% OFF",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
      rating: 4.6,
      reviews: 3241
    },
    {
      id: 4,
      name: "Running Sneakers Pro",
      brand: "SportMax",
      price: "₹6,999",
      originalPrice: "₹9,999",
      discount: "30% OFF",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
      rating: 4.4,
      reviews: 1876
    },
    {
      id: 5,
      name: "Casual Cotton T-Shirt",
      brand: "ComfortWear",
      price: "₹1,299",
      originalPrice: "₹1,999",
      discount: "35% OFF",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80",
      rating: 4.2,
      reviews: 987
    },
    {
      id: 6,
      name: "Professional Laptop Bag",
      brand: "WorkStyle",
      price: "₹3,499",
      originalPrice: "₹5,499",
      discount: "36% OFF",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
      rating: 4.5,
      reviews: 654
    }
  ];
  
  const featuredGrid = document.getElementById('featuredGrid');
  let productHTML = '';
  
  products.forEach(product => {
    const stars = generateStarRating(product.rating);
    productHTML += `
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <div class="product-badge">${product.discount}</div>
          <div class="product-actions">
            <button class="action-btn wishlist-btn" onclick="toggleWishlist(${product.id})">
              <i class="fas fa-heart"></i>
            </button>
            <button class="action-btn quick-view-btn" onclick="quickView(${product.id})">
              <i class="fas fa-eye"></i>
            </button>
          </div>
        </div>
        <div class="product-info">
          <div class="product-brand">${product.brand}</div>
          <h3 class="product-name">${product.name}</h3>
          <div class="product-rating">
            <div class="stars">${stars}</div>
            <span class="rating-count">(${product.reviews.toLocaleString()})</span>
          </div>
          <div class="product-price">
            <span class="current-price">${product.price}</span>
            <span class="original-price">${product.originalPrice}</span>
          </div>
          <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
            <i class="fas fa-shopping-cart"></i>
            Add to Cart
          </button>
        </div>
      </div>
    `;
  });
  
  featuredGrid.innerHTML = productHTML;
}

function generateStarRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let stars = '';
  
  for (let i = 0; i < fullStars; i++) {
    stars += '<i class="fas fa-star"></i>';
  }
  
  if (hasHalfStar) {
    stars += '<i class="fas fa-star-half-alt"></i>';
  }
  
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars += '<i class="far fa-star"></i>';
  }
  
  return stars;
}

// Product Actions
function toggleWishlist(productId) {
  const btn = event.target.closest('.wishlist-btn');
  const icon = btn.querySelector('i');
  
  if (icon.classList.contains('fas')) {
    icon.classList.remove('fas');
    icon.classList.add('far');
    wishlistCount = Math.max(0, wishlistCount - 1);
    showNotification('Removed from wishlist', 'info');
  } else {
    icon.classList.remove('far');
    icon.classList.add('fas');
    wishlistCount++;
    showNotification('Added to wishlist!', 'success');
  }
  
  updateWishlistCount();
}

function addToCart(productId) {
  cartCount++;
  updateCartCount();
  showNotification('Item added to cart!', 'success');
}

function quickView(productId) {
  showNotification('Quick view coming soon!', 'info');
}

function updateWishlistCount() {
  const wishlistCountEl = document.getElementById('wishlistCount');
  if (wishlistCountEl) {
    wishlistCountEl.textContent = wishlistCount;
  }
}

function updateCartCount() {
  const cartCountEl = document.getElementById('cartCount');
  if (cartCountEl) {
    cartCountEl.textContent = cartCount;
  }
}

// Brands Section
function initBrands() {
  const brands = [
    {
      name: "Nike",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png",
      discount: "Up to 40% OFF"
    },
    {
      name: "Adidas",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Adidas-Logo.png",
      discount: "Up to 35% OFF"
    },
    {
      name: "Puma",
      logo: "https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png",
      discount: "Up to 45% OFF"
    },
    {
      name: "H&M",
      logo: "./images/hm.png",
      discount: "Up to 50% OFF"
    },
    {
      name: "Zara",
      logo: "./images/Zara.png",
      discount: "Up to 30% OFF"
    },
    {
      name: "Levi's",
      logo: "./images/levis.png",
      discount: "Up to 55% OFF"
    },
 {
      name: "Plum",
      logo: "./images/plum.png",
      discount: "Up to 40% OFF"
    },
    {
      name: "Calvin Klein",
      logo: "./images/CV.png",
      discount: "Up to 75% OFF"
    },
     {
      name: "Louis Vuitton",
      logo: "./images/LV.png",
      discount: "Up to 30% OFF"
    },
    {
      name: "Gucci",
      logo: "./images/Gucchi.png",
      discount: "Up to 15% OFF"
    }


  ];
  
  const brandsSlider = document.getElementById('brandsSlider');
  let brandsHTML = '';
  
  brands.forEach(brand => {
    brandsHTML += `
      <div class="brand-card" data-brand="${brand.name}">
        <div class="brand-logo">
          <img src="${brand.logo}" alt="${brand.name}" loading="lazy">
        </div>
        <div class="brand-info">
          <h4>${brand.name}</h4>
          <p>${brand.discount}</p>
        </div>
      </div>
    `;
  });
  
  brandsSlider.innerHTML = brandsHTML;
  
  // Add click handlers
  document.querySelectorAll('.brand-card').forEach(card => {
    card.addEventListener('click', () => {
      const brand = card.dataset.brand;
      showNotification(`Exploring ${brand} products...`, 'info');
    });
  });
}

// Newsletter Form
function initNewsletterForm() {
  const newsletterForm = document.getElementById('newsletterForm');
  
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Simulate newsletter subscription
    showNotification('Thank you for subscribing! Welcome to QuickWear family.', 'success');
    e.target.reset();
  });
}

// Utility Functions
function updateYear() {
  const yearElement = document.getElementById('year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe elements for animation
  document.querySelectorAll('.section-header, .trending-card, .product-card, .brand-card').forEach(el => {
    observer.observe(el);
  });
}

// Notification System
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas ${getNotificationIcon(type)}"></i>
      <span>${message}</span>
    </div>
    <button class="notification-close">&times;</button>
  `;
  
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => notification.classList.add('show'), 100);
  
  // Auto hide after 3 seconds
  const autoHide = setTimeout(() => hideNotification(notification), 3000);
  
  // Close button handler
  notification.querySelector('.notification-close').addEventListener('click', () => {
    clearTimeout(autoHide);
    hideNotification(notification);
  });
}

function getNotificationIcon(type) {
  switch(type) {
    case 'success': return 'fa-check-circle';
    case 'error': return 'fa-exclamation-circle';
    case 'warning': return 'fa-exclamation-triangle';
    default: return 'fa-info-circle';
  }
}

function hideNotification(notification) {
  notification.classList.remove('show');
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 300);
}

// Lazy Loading Images
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  // Escape key closes modals
  if (e.key === 'Escape') {
    closeLoginModal();
    hideSuggestions();
  }
  
  // Enter key on search
  if (e.key === 'Enter' && document.activeElement.id === 'searchInput') {
    handleSearch();
  }
});

// Smooth Scroll to Top
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Add scroll to top button functionality
window.addEventListener('scroll', () => {
  const scrollToTopBtn = document.querySelector('.scroll-to-top');
  if (scrollToTopBtn) {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  }
});

// Performance Optimization
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Optimized search input with debounce
const debouncedSearch = debounce(handleSearchInput, 300);

// Error Handling
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.error);
});

// Service Worker Registration (if available)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

initMaleCategories();
initFemaleCategories();
