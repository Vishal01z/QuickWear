// Women's Category Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize page
    initWomenPage();
    
    // Simulate loading delay
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
    }, 1000);
});

let allProducts = [];

function initWomenPage() {
    // Load products
    loadWomenProducts();
    
    // Set up event listeners
    setupEventListeners();
}

function loadWomenProducts() {
    // In a real app, this would fetch from an API
    // For now, we'll simulate with mock data
    allProducts = [
        {
            id: 'w-prod-001',
            name: 'Floral Summer Dress',
            price: 59.99,
            originalPrice: 79.99,
            image: 'https://m.media-amazon.com/images/I/718UPcEuxfL._SY741_.jpg',
            rating: 4.5,
            reviewCount: 124,
            isNew: true,
            dateAdded: '2024-05-15',
            colors: ['red', 'blue', 'yellow'],
            sizes: ['S', 'M', 'L']
        },
        {
            id: 'w-prod-002',
            name: 'Classic White Blouse',
            price: 39.99,
            image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&q=80',
            rating: 4.2,
            reviewCount: 89,
            dateAdded: '2024-06-10',
            colors: ['white', 'black'],
            sizes: ['XS', 'S', 'M', 'L']
        },
        {
            id: 'w-prod-003',
            name: 'High-Waist Jeans',
            price: 49.99,
            originalPrice: 69.99,
            image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&q=80',
            rating: 4.7,
            reviewCount: 203,
            isTrending: true,
            dateAdded: '2024-04-22',
            colors: ['blue', 'black'],
            sizes: ['24', '26', '28', '30']
        },
        {
            id: 'w-prod-004',
            name: 'Knit Sweater',
            price: 45.99,
            image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&q=80',
            rating: 4.3,
            reviewCount: 67,
            dateAdded: '2024-06-05',
            colors: ['beige', 'gray', 'green'],
            sizes: ['S', 'M', 'L']
        },
        {
            id: 'w-prod-005',
            name: 'Leather Crossbody Bag',
            price: 89.99,
            image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&q=80',
            rating: 4.8,
            reviewCount: 156,
            dateAdded: '2024-05-30',
            colors: ['black', 'brown'],
            sizes: ['One Size']
        },
        {
            id: 'w-prod-006',
            name: 'Yoga Leggings',
            price: 34.99,
            originalPrice: 49.99,
            image: 'https://m.media-amazon.com/images/I/61VVvRE63RL._SX679_.jpg',
            rating: 4.6,
            reviewCount: 231,
            isNew: true,
            dateAdded: '2024-06-18',
            colors: ['black', 'gray', 'blue'],
            sizes: ['XS', 'S', 'M', 'L', 'XL']
        },
        {
            id: 'w-prod-007',
            name: 'Denim Jacket',
            price: 65.99,
            image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&q=80',
            rating: 4.4,
            reviewCount: 112,
            dateAdded: '2024-05-10',
            colors: ['blue', 'black'],
            sizes: ['S', 'M', 'L']
        },
        {
            id: 'w-prod-008',
            name: 'Silk Scarf',
            price: 29.99,
            originalPrice: 39.99,
            image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=634&q=80',
            rating: 4.9,
            reviewCount: 87,
            dateAdded: '2024-06-12',
            colors: ['red', 'blue', 'green'],
            sizes: ['One Size']
        }
    ];
    
    displayProducts(allProducts);
}

function displayProducts(products) {
    const productsGrid = document.querySelector('.products-grid');
    
    // Clear existing content
    productsGrid.innerHTML = '';
    
    // Generate product cards
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-id', product.id);
    
    // Create badges HTML if needed
    let badgesHtml = '';
    if (product.isNew) {
        badgesHtml += '<span class="badge badge-new">New</span>';
    }
    if (product.isTrending) {
        badgesHtml += '<span class="badge badge-trending">Trending</span>';
    }
    if (product.originalPrice) {
        badgesHtml += `<span class="badge badge-sale">${Math.round((1 - product.price / product.originalPrice) * 100)}% OFF</span>`;
    }
    
    // Create price HTML
    let priceHtml = `<span class="current-price">$${product.price.toFixed(2)}</span>`;
    if (product.originalPrice) {
        priceHtml += `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>`;
    }
    
    // Create rating stars HTML
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 >= 0.5;
    let starsHtml = '';
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHtml += '<i class="fas fa-star"></i>';
        } else if (i === fullStars && hasHalfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHtml += '<i class="far fa-star"></i>';
        }
    }
    
    // Set the card HTML
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            ${badgesHtml ? `<div class="product-badges">${badgesHtml}</div>` : ''}
            <div class="product-actions">
                <button class="action-btn" title="Add to Wishlist"><i class="far fa-heart"></i></button>
                <button class="action-btn" title="Quick View"><i class="fas fa-eye"></i></button>
                <button class="action-btn" title="Compare"><i class="fas fa-exchange-alt"></i></button>
            </div>
        </div>
        <div class="product-info">
            <div class="product-rating">
                <div class="stars">
                    ${starsHtml}
                </div>
                <span class="rating-count">(${product.reviewCount})</span>
            </div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.colors.join(', ')} colors available</p>
            <div class="product-price">
                ${priceHtml}
            </div>
            <button class="add-to-cart-btn">Add to Cart</button>
        </div>
    `;
    
    return card;
}

function setupEventListeners() {
    // Filter and sort functionality
    const sortSelect = document.getElementById('sort-by');
    const sizeSelect = document.getElementById('filter-size');
    const colorSelect = document.getElementById('filter-color');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            sortProducts(this.value);
        });
    }
    
    if (sizeSelect) {
        sizeSelect.addEventListener('change', function() {
            filterProducts();
        });
    }
    
    if (colorSelect) {
        colorSelect.addEventListener('change', function() {
            filterProducts();
        });
    }
    
    // Pagination buttons
    const paginationButtons = document.querySelectorAll('.pagination-btn:not(:disabled)');
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                document.querySelector('.pagination-btn.active').classList.remove('active');
                this.classList.add('active');
                // In a real app, this would load the appropriate page of products
                console.log('Go to page:', this.textContent.trim());
            }
        });
    });
    
    // Add to cart functionality (using event delegation)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart-btn') || e.target.closest('.add-to-cart-btn')) {
            const productCard = e.target.closest('.product-card');
            const productId = productCard.getAttribute('data-id');
            addToCart(productId);
        }
        
        // Wishlist toggle
        if (e.target.classList.contains('fa-heart') || e.target.closest('.action-btn[title="Add to Wishlist"]')) {
            const btn = e.target.classList.contains('fa-heart') ? e.target : e.target.querySelector('i');
            toggleWishlist(btn);
        }
    });
}

function sortProducts(sortBy) {
    let sortedProducts = [...allProducts];
    
    switch(sortBy) {
        case 'newest':
            sortedProducts.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
            break;
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'featured':
        default:
            // Default sorting (featured items first)
            sortedProducts.sort((a, b) => {
                if (a.isNew && !b.isNew) return -1;
                if (!a.isNew && b.isNew) return 1;
                if (a.isTrending && !b.isTrending) return -1;
                if (!a.isTrending && b.isTrending) return 1;
                return b.rating - a.rating;
            });
    }
    
    displayProducts(sortedProducts);
}

function filterProducts() {
    const sizeFilter = document.getElementById('filter-size').value;
    const colorFilter = document.getElementById('filter-color').value;
    
    let filteredProducts = allProducts.filter(product => {
        // Size filter
        if (sizeFilter !== 'all' && !product.sizes.includes(sizeFilter.toUpperCase())) {
            return false;
        }
        
        // Color filter
        if (colorFilter !== 'all' && !product.colors.includes(colorFilter)) {
            return false;
        }
        
        return true;
    });
    
    displayProducts(filteredProducts);
}

function addToCart(productId) {
    console.log('Adding to cart:', productId);
    // In a real app, this would make an API call to add to cart
    updateCartCount(1);
    
    // Show feedback to user
    const productCard = document.querySelector(`.product-card[data-id="${productId}"]`);
    if (productCard) {
        const btn = productCard.querySelector('.add-to-cart-btn');
        btn.textContent = 'Added!';
        btn.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            btn.textContent = 'Add to Cart';
            btn.style.backgroundColor = '#333';
        }, 2000);
    }
}

function toggleWishlist(icon) {
    if (icon.classList.contains('far')) {
        icon.classList.remove('far');
        icon.classList.add('fas');
        // In a real app, this would add to wishlist
        console.log('Added to wishlist');
    } else {
        icon.classList.remove('fas');
        icon.classList.add('far');
        // In a real app, this would remove from wishlist
        console.log('Removed from wishlist');
    }
}

function updateCartCount(change) {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        let currentCount = parseInt(cartCount.textContent) || 0;
        currentCount += change;
        cartCount.textContent = currentCount;
        
        // Add animation
        cartCount.classList.add('bounce');
        setTimeout(() => {
            cartCount.classList.remove('bounce');
        }, 500);
    }
}