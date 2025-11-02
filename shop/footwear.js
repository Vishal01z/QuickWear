// Enhanced Footwear Page JavaScript
class FootwearStore {
  constructor() {
    this.products = [];
    this.filteredProducts = [];
    this.displayedProducts = [];
    this.currentPage = 0;
    this.itemsPerPage = 12;
    this.cart = [];
    this.wishlist = [];
    this.filters = {
      category: 'all',
      brand: 'all',
      priceRange: 'all',
      search: ''
    };
    this.sortBy = 'featured';
    
    this.init();
  }

  init() {
    this.generateProducts();
    this.setupEventListeners();
    this.hideLoadingScreen();
    this.applyFilters();
    this.renderProducts();
  }

  hideLoadingScreen() {
    setTimeout(() => {
      const loadingScreen = document.getElementById('loadingScreen');
      if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
          loadingScreen.remove();
        }, 500);
      }
    }, 1500);
  }

  generateProducts() {
    const shoesData = [
      // Nike Collection


       {
        id: 'adidas-stan-smith',
        name: 'Adidas Stan Smith',
        brand: 'Adidas',
        category: 'casual',
        price: 7995,
        originalPrice: 9995,
        rating: 4.4,
        reviews: 567,
        image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=500&h=400&fit=crop',
        badge: null,
        isNew: false,
        description: 'Clean and simple with an effortless style.',
        features: ['Premium leather', 'Perforated 3-Stripes', 'Rubber cupsole', 'OrthoLite sockliner']
      },


      {
        id: 'puma-suede-classic',
        name: 'Puma Suede Classic',
        brand: 'Puma',
        category: 'casual',
        price: 5995,
        originalPrice: 7995,
        rating: 4.5,
        reviews: 445,
        image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&h=400&fit=crop',
        badge: null,
        isNew: false,
        description: 'The original B-boy shoe with legendary style.',
        features: ['Suede upper', 'Rubber sole', 'Classic formstripe', 'Low-profile silhouette']
      },

      // Reebok Collection
      {
        id: 'reebok-classic-leather',
        name: 'Reebok Classic Leather',
        brand: 'Reebok',
        category: 'casual',
        price: 6995,
        originalPrice: 8995,
        rating: 4.3,
        reviews: 324,
        image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&h=400&fit=crop',
        badge: null,
        isNew: false,
        description: 'Timeless style meets modern comfort.',
        features: ['Soft leather upper', 'Die-cut EVA midsole', 'High abrasion rubber', 'Padded collar']
      },
      {
        id: 'nike-air-max-270',
        name: 'Nike Air Max 270',
        brand: 'Nike',
        category: 'running',
        price: 12995,
        originalPrice: 15995,
        rating: 4.5,
        reviews: 328,
        image: 'https://m.media-amazon.com/images/I/61z8mZq7bOL._AC_UL320_.jpg',
        badge: 'bestseller',
        isNew: false,
        description: 'The Nike Air Max 270 delivers visible cushioning under every step.',
        features: ['Air Max cushioning', 'Breathable mesh upper', 'Rubber outsole', 'Lightweight design']
      },
      {
        id: 'nike-react-infinity',
        name: 'Nike React Infinity Run',
        brand: 'Nike',
        category: 'running',
        price: 13995,
        originalPrice: 16995,
        rating: 4.7,
        reviews: 156,
        image: 'https://m.media-amazon.com/images/I/518PotRvlLL._SY695_.jpg',
        badge: 'new',
        isNew: true,
        description: 'Designed to help reduce injury and keep you running.',
        features: ['React foam cushioning', 'Flyknit upper', 'Rocker shape geometry', 'Data-driven design']
      },
      {
        id: 'nike-air-force-1',
        name: 'Nike Air Force 1 \'07',
        brand: 'Nike',
        category: 'casual',
        price: 8995,
        originalPrice: 10995,
        rating: 4.8,
        reviews: 892,
        image: 'https://m.media-amazon.com/images/I/51T7Tytcq3L._SY695_.jpg',
        badge: 'bestseller',
        isNew: false,
        description: 'The radiance lives on in the Nike Air Force 1 \'07.',
        features: ['Premium leather upper', 'Air-Sole unit', 'Pivot points', 'Classic style']
      },

      // Adidas Collection
      {
        id: 'adidas-ultraboost-22',
        name: 'Adidas Ultraboost 22',
        brand: 'Adidas',
        category: 'running',
        price: 17995,
        originalPrice: 19995,
        rating: 4.6,
        reviews: 243,
        image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&h=400&fit=crop',
        badge: 'new',
        isNew: true,
        description: 'Our most responsive running shoe with incredible energy return.',
        features: ['Boost midsole', 'Primeknit upper', 'Continental rubber', 'Torsion system']
      },
      {
        id: 'adidas-stan-smith',
        name: 'Adidas Stan Smith',
        brand: 'Adidas',
        category: 'casual',
        price: 7995,
        originalPrice: 9995,
        rating: 4.4,
        reviews: 567,
        image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=500&h=400&fit=crop',
        badge: null,
        isNew: false,
        description: 'Clean and simple with an effortless style.',
        features: ['Premium leather', 'Perforated 3-Stripes', 'Rubber cupsole', 'OrthoLite sockliner']
      },
      {
        id: 'adidas-nmd-r1',
        name: 'Adidas NMD_R1',
        brand: 'Adidas',
        category: 'casual',
        price: 12995,
        originalPrice: 15995,
        rating: 4.3,
        reviews: 389,
        image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=500&h=400&fit=crop',
        badge: 'sale',
        isNew: false,
        description: 'Street-ready style with responsive cushioning.',
        features: ['Boost midsole', 'Sock-like construction', 'EVA plugs', 'Rubber outsole']
      },

      // Puma Collection
      {
        id: 'puma-rs-x',
        name: 'Puma RS-X Reinvention',
        brand: 'Puma',
        category: 'casual',
        price: 8995,
        originalPrice: 11995,
        rating: 4.2,
        reviews: 178,
        image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=400&fit=crop',
        badge: 'sale',
        isNew: false,
        description: 'Bold colors and futuristic design meets retro running DNA.',
        features: ['RS foam midsole', 'Mixed material upper', 'Bold colorways', 'Chunky silhouette']
      },

 {
        id: 'adidas-stan-smith',
        name: 'Adidas Stan Smith',
        brand: 'Adidas',
        category: 'casual',
        price: 7995,
        originalPrice: 9995,
        rating: 4.4,
        reviews: 567,
        image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=500&h=400&fit=crop',
        badge: null,
        isNew: false,
        description: 'Clean and simple with an effortless style.',
        features: ['Premium leather', 'Perforated 3-Stripes', 'Rubber cupsole', 'OrthoLite sockliner']
      },


      {
        id: 'puma-suede-classic',
        name: 'Puma Suede Classic',
        brand: 'Puma',
        category: 'casual',
        price: 5995,
        originalPrice: 7995,
        rating: 4.5,
        reviews: 445,
        image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&h=400&fit=crop',
        badge: null,
        isNew: false,
        description: 'The original B-boy shoe with legendary style.',
        features: ['Suede upper', 'Rubber sole', 'Classic formstripe', 'Low-profile silhouette']
      },

      // Reebok Collection
      {
        id: 'reebok-classic-leather',
        name: 'Reebok Classic Leather',
        brand: 'Reebok',
        category: 'casual',
        price: 6995,
        originalPrice: 8995,
        rating: 4.3,
        reviews: 324,
        image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&h=400&fit=crop',
        badge: null,
        isNew: false,
        description: 'Timeless style meets modern comfort.',
        features: ['Soft leather upper', 'Die-cut EVA midsole', 'High abrasion rubber', 'Padded collar']
      },
      {
        id: 'reebok-nano-x1',
        name: 'Reebok Nano X1',
        brand: 'Reebok',
        category: 'sports',
        price: 11995,
        originalPrice: 14995,
        rating: 4.6,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=400&fit=crop',
        badge: 'new',
        isNew: true,
        description: 'Built for versatility and high-intensity training.',
        features: ['Floatride Energy foam', 'Flexweave knit upper', 'Meta-split outsole', 'Toe protection']
      },

      // Vans Collection
      {
        id: 'vans-old-skool',
        name: 'Vans Old Skool',
        brand: 'Vans',
        category: 'casual',
        price: 4995,
        originalPrice: 6495,
        rating: 4.7,
        reviews: 678,
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=400&fit=crop',
        badge: 'bestseller',
        isNew: false,
        description: 'The original and now iconic Vans side stripe skate shoe.',
        features: ['Canvas and suede upper', 'Re-enforced toecaps', 'Signature rubber waffle outsole', 'Padded collars']
      },
      {
        id: 'vans-sk8-hi',
        name: 'Vans Sk8-Hi',
        brand: 'Vans',
        category: 'casual',
        price: 5495,
        originalPrice: 7495,
        rating: 4.4,
        reviews: 234,
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=400&fit=crop',
        badge: null,
        isNew: false,
        description: 'The legendary high-top skate shoe.',
        features: ['High-top silhouette', 'Sturdy canvas upper', 'Signature side stripe', 'Vulcanized construction']
      },

      // Converse Collection
      {
        id: 'converse-chuck-taylor',
        name: 'Converse Chuck Taylor All Star',
        brand: 'Converse',
        category: 'casual',
        price: 4495,
        originalPrice: 5995,
        rating: 4.6,
        reviews: 1203,
        image: 'https://m.media-amazon.com/images/I/71rzTpKXGgL._SX625_.jpg',
        badge: 'bestseller',
        isNew: false,
        description: 'The original basketball shoe that started it all.',
        features: ['Canvas upper', 'Rubber toe cap', 'Vulcanized rubber sole', 'Star ankle patch']
      },

      // Formal Shoes
      {
        id: 'formal-oxford-black',
        name: 'Premium Oxford Dress Shoes',
        brand: 'Nike',
        category: 'formal',
        price: 8995,
        originalPrice: 12995,
        rating: 4.2,
        reviews: 156,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=400&fit=crop',
        badge: 'sale',
        isNew: false,
        description: 'Classic oxford shoes perfect for business and formal occasions.',
        features: ['Genuine leather upper', 'Cushioned insole', 'Non-slip sole', 'Breathable lining']
      },
      {
        id: 'formal-loafer-brown',
        name: 'Leather Penny Loafers',
        brand: 'Adidas',
        category: 'formal',
        price: 7495,
        originalPrice: 9995,
        rating: 4.4,
        reviews: 89,
        image: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=500&h=400&fit=crop',
        badge: null,
        isNew: false,
        description: 'Comfortable loafers for smart-casual and business casual wear.',
        features: ['Premium leather', 'Slip-on design', 'Padded sole', 'Versatile style']
      },

      // Boots
      {
        id: 'timberland-boots',
        name: 'Classic Timberland Boots',
        brand: 'Puma',
        category: 'boots',
        price: 15995,
        originalPrice: 19995,
        rating: 4.7,
        reviews: 267,
        image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=500&h=400&fit=crop',
        badge: 'new',
        isNew: true,
        description: 'Waterproof leather boots built for durability and comfort.',
        features: ['Waterproof leather', 'Padded collar', 'Anti-fatigue footbed', 'Durable rubber sole']
      },
      {
        id: 'chelsea-boots',
        name: 'Chelsea Ankle Boots',
        brand: 'Reebok',
        category: 'boots',
        price: 9995,
        originalPrice: 13995,
        rating: 4.3,
        reviews: 134,
        image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=400&fit=crop',
        badge: 'sale',
        isNew: false,
        description: 'Sleek chelsea boots perfect for both casual and semi-formal occasions.',
        features: ['Premium leather', 'Elastic side panels', 'Pull tabs', 'Flexible sole']
      },

      // Sandals
      {
        id: 'nike-sandals',
        name: 'Nike Comfort Slide Sandals',
        brand: 'Nike',
        category: 'sandals',
        price: 2995,
        originalPrice: 3995,
        rating: 4.1,
        reviews: 445,
        image: 'https://m.media-amazon.com/images/I/71soeLyB2+L._SY500_.jpg',
        badge: null,
        isNew: false,
        description: 'Comfortable slide sandals for everyday wear.',
        features: ['Soft foam footbed', 'Adjustable strap', 'Lightweight design', 'Quick-dry material']
      },
      {
        id: 'adidas-slides',
        name: 'Adidas Adilette Slides',
        brand: 'Adidas',
        category: 'sandals',
        price: 2495,
        originalPrice: 3495,
        rating: 4.0,
        reviews: 567,
        image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=500&h=400&fit=crop',
        badge: 'bestseller',
        isNew: false,
        description: 'Classic three-stripe slides for comfort and style.',
        features: ['Synthetic upper', 'Cloudfoam footbed', '3-Stripes branding', 'Easy slip-on']
      }
    ];

    this.products = shoesData;
    this.filteredProducts = [...this.products];
  }

  setupEventListeners() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger?.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const clearSearch = document.getElementById('clearSearch');

    searchInput?.addEventListener('input', (e) => {
      this.filters.search = e.target.value.toLowerCase();
      this.showClearSearchButton(e.target.value);
      this.debounceSearch();
    });

    searchBtn?.addEventListener('click', () => {
      this.applyFilters();
      this.renderProducts();
    });

    clearSearch?.addEventListener('click', () => {
      searchInput.value = '';
      this.filters.search = '';
      this.showClearSearchButton('');
      this.applyFilters();
      this.renderProducts();
    });

    // Filter controls
    const categoryFilter = document.getElementById('categoryFilter');
    const brandFilter = document.getElementById('brandFilter');
    const priceFilter = document.getElementById('priceFilter');
    const sortSelect = document.getElementById('sortSelect');
    const clearAllFilters = document.getElementById('clearAllFilters');

    categoryFilter?.addEventListener('change', (e) => {
      this.filters.category = e.target.value;
      this.applyFilters();
      this.renderProducts();
      this.updateFilterResults();
    });

    brandFilter?.addEventListener('change', (e) => {
      this.filters.brand = e.target.value;
      this.applyFilters();
      this.renderProducts();
      this.updateFilterResults();
    });

    priceFilter?.addEventListener('change', (e) => {
      this.filters.priceRange = e.target.value;
      this.applyFilters();
      this.renderProducts();
      this.updateFilterResults();
    });

    sortSelect?.addEventListener('change', (e) => {
      this.sortBy = e.target.value;
      this.sortProducts();
      this.renderProducts();
    });

    clearAllFilters?.addEventListener('click', () => {
      this.clearAllFilters();
    });

    // Load more button
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    loadMoreBtn?.addEventListener('click', () => {
      this.loadMoreProducts();
    });

    // Product grid event delegation
    const productGrid = document.getElementById('productGrid');
    productGrid?.addEventListener('click', (e) => {
      const productCard = e.target.closest('.product-card');
      if (!productCard) return;

      if (e.target.classList.contains('add-to-cart')) {
        e.stopPropagation();
        const productId = productCard.dataset.productId;
        this.addToCart(productId);
      } else if (e.target.classList.contains('product-wishlist') || e.target.parentElement.classList.contains('product-wishlist')) {
        e.stopPropagation();
        const productId = productCard.dataset.productId;
        this.toggleWishlist(productId);
      } else if (e.target.classList.contains('quick-view')) {
        e.stopPropagation();
        const productId = productCard.dataset.productId;
        this.showProductModal(productId);
      } else {
        // Click on card opens modal
        const productId = productCard.dataset.productId;
        this.showProductModal(productId);
      }
    });

    // Modal functionality
    const modal = document.getElementById('productModal');
    const modalClose = document.querySelector('.modal-close');
    const modalAddToCart = document.querySelector('.modal-add-to-cart');
    const modalWishlist = document.querySelector('.modal-wishlist');

    modalClose?.addEventListener('click', () => {
      this.hideProductModal();
    });

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.hideProductModal();
      }
    });

    modalAddToCart?.addEventListener('click', () => {
      const productId = modal.dataset.currentProductId;
      if (productId) {
        this.addToCart(productId);
        this.hideProductModal();
      }
    });

    modalWishlist?.addEventListener('click', () => {
      const productId = modal.dataset.currentProductId;
      if (productId) {
        this.toggleWishlist(productId);
      }
    });

    // Smooth scrolling for CTA button
    document.querySelector('.cta-button')?.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    });

    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
      const header = document.querySelector('.header');
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        header?.style.setProperty('transform', 'translateY(-100%)');
      } else {
        header?.style.setProperty('transform', 'translateY(0)');
      }
      
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  }

  showClearSearchButton(value) {
    const clearSearch = document.getElementById('clearSearch');
    if (clearSearch) {
      clearSearch.style.display = value ? 'block' : 'none';
    }
  }

  debounceSearch() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.applyFilters();
      this.renderProducts();
    }, 300);
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = this.filters.category === 'all' || product.category === this.filters.category;
      const matchesBrand = this.filters.brand === 'all' || product.brand.toLowerCase() === this.filters.brand;
      const matchesSearch = !this.filters.search || 
        product.name.toLowerCase().includes(this.filters.search) ||
        product.brand.toLowerCase().includes(this.filters.search) ||
        product.category.toLowerCase().includes(this.filters.search);
      
      let matchesPrice = true;
      if (this.filters.priceRange !== 'all') {
        const [min, max] = this.filters.priceRange.split('-').map(p => p.replace('+', ''));
        if (max) {
          matchesPrice = product.price >= parseInt(min) && product.price <= parseInt(max);
        } else {
          matchesPrice = product.price >= parseInt(min);
        }
      }

      return matchesCategory && matchesBrand && matchesSearch && matchesPrice;
    });

    this.sortProducts();
    this.currentPage = 0;
    this.updateFilterResults();
  }

  sortProducts() {
    switch (this.sortBy) {
      case 'price-low':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        this.filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        this.filteredProducts.sort((a, b) => b.isNew - a.isNew);
        break;
      case 'popular':
        this.filteredProducts.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // Featured - prioritize bestsellers and new items
        this.filteredProducts.sort((a, b) => {
          if (a.badge === 'bestseller' && b.badge !== 'bestseller') return -1;
          if (b.badge === 'bestseller' && a.badge !== 'bestseller') return 1;
          if (a.isNew && !b.isNew) return -1;
          if (b.isNew && !a.isNew) return 1;
          return b.rating - a.rating;
        });
    }
  }

  renderProducts() {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;

    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const productsToShow = this.filteredProducts.slice(0, endIndex);

    if (this.currentPage === 0) {
      productGrid.innerHTML = '';
    }

    productsToShow.slice(startIndex).forEach((product, index) => {
      const productCard = this.createProductCard(product);
      productCard.style.setProperty('--stagger', index);
      productCard.classList.add('fade-in', 'stagger-animation');
      productGrid.appendChild(productCard);
    });

    this.updateLoadMoreButton();
    this.displayedProducts = productsToShow;
  }

  createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.productId = product.id;

    const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const badgeHtml = product.badge ? `<span class="product-badge ${product.badge}">${product.badge}</span>` : '';
    
    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        ${badgeHtml}
        <button class="product-wishlist" aria-label="Add to wishlist">
          <i class="far fa-heart"></i>
        </button>
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-brand">${product.brand}</p>
        <div class="product-rating">
          <div class="stars">
            ${this.renderStars(product.rating)}
          </div>
          <span class="rating-text">${product.rating} (${product.reviews})</span>
        </div>
        <div class="product-price">
          <span class="current-price">₹${this.formatPrice(product.price)}</span>
          <span class="original-price">₹${this.formatPrice(product.originalPrice)}</span>
          <span class="discount-percent">${discountPercent}% OFF</span>
        </div>
        <div class="product-actions">
          <button class="add-to-cart">
            <i class="fas fa-shopping-cart"></i>
            Add to Cart
          </button>
          <button class="quick-view" aria-label="Quick view">
            <i class="fas fa-eye"></i>
          </button>
        </div>
      </div>
    `;

    return card;
  }

  renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    let starsHtml = '';
    
    for (let i = 0; i < fullStars; i++) {
      starsHtml += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
      starsHtml += '<i class="fas fa-star-half-alt"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
      starsHtml += '<i class="far fa-star"></i>';
    }

    return starsHtml;
  }

  formatPrice(price) {
    return price.toLocaleString('en-IN');
  }

  loadMoreProducts() {
    this.currentPage++;
    this.renderProducts();
  }

  updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (!loadMoreBtn) return;

    const totalShown = (this.currentPage + 1) * this.itemsPerPage;
    if (totalShown >= this.filteredProducts.length) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'block';
      const remaining = this.filteredProducts.length - totalShown;
      loadMoreBtn.querySelector('span').textContent = `Load ${Math.min(remaining, this.itemsPerPage)} More Shoes`;
    }
  }

  updateFilterResults() {
    const resultsCount = document.getElementById('resultsCount');
    const clearAllFilters = document.getElementById('clearAllFilters');
    
    if (resultsCount) {
      if (this.filteredProducts.length === this.products.length) {
        resultsCount.textContent = `Showing all ${this.products.length} products`;
      } else {
        resultsCount.textContent = `Showing ${this.filteredProducts.length} of ${this.products.length} products`;
      }
    }

    if (clearAllFilters) {
      const hasFilters = this.filters.category !== 'all' || 
                        this.filters.brand !== 'all' || 
                        this.filters.priceRange !== 'all' || 
                        this.filters.search !== '';
      clearAllFilters.style.display = hasFilters ? 'block' : 'none';
    }
  }

  clearAllFilters() {
    this.filters = {
      category: 'all',
      brand: 'all',
      priceRange: 'all',
      search: ''
    };
    this.sortBy = 'featured';

    // Reset form controls
    document.getElementById('categoryFilter').value = 'all';
    document.getElementById('brandFilter').value = 'all';
    document.getElementById('priceFilter').value = 'all';
    document.getElementById('sortSelect').value = 'featured';
    document.getElementById('searchInput').value = '';
    this.showClearSearchButton('');

    this.applyFilters();
    this.renderProducts();
  }

  addToCart(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = this.cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    this.updateCartCount();
    this.showNotification(`${product.name} added to cart!`, 'success');
    this.animateCartIcon();
  }

  toggleWishlist(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = this.wishlist.findIndex(item => item.id === productId);
    const wishlistBtn = document.querySelector(`[data-product-id="${productId}"] .product-wishlist i`);
    
    if (existingIndex > -1) {
      this.wishlist.splice(existingIndex, 1);
      wishlistBtn?.classList.replace('fas', 'far');
      this.showNotification(`${product.name} removed from wishlist`, 'info');
    } else {
      this.wishlist.push(product);
      wishlistBtn?.classList.replace('far', 'fas');
      this.showNotification(`${product.name} added to wishlist!`, 'success');
    }
  }

  updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
      const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCount.textContent = totalItems;
      cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
  }

  animateCartIcon() {
    const cartIcon = document.querySelector('.cart');
    cartIcon?.classList.add('animate__animated', 'animate__bounce');
    setTimeout(() => {
      cartIcon?.classList.remove('animate__animated', 'animate__bounce');
    }, 1000);
  }

  showProductModal(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('productModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalRating = document.getElementById('modalRating');
    const modalPrice = document.getElementById('modalPrice');
    const modalFeatures = document.getElementById('modalFeatures');

    if (!modal) return;

    modal.dataset.currentProductId = productId;
    modalImage.src = product.image;
    modalImage.alt = product.name;
    modalTitle.textContent = product.name;
    modalDescription.textContent = product.description;
    
    modalRating.innerHTML = `
      <div class="stars">${this.renderStars(product.rating)}</div>
      <span class="rating-text">${product.rating} (${product.reviews} reviews)</span>
    `;

    const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    modalPrice.innerHTML = `
      <span class="current-price">₹${this.formatPrice(product.price)}</span>
      <span class="original-price">₹${this.formatPrice(product.originalPrice)}</span>
      <span class="discount-percent">${discountPercent}% OFF</span>
    `;

    modalFeatures.innerHTML = product.features.map(feature => `<li>${feature}</li>`).join('');

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  hideProductModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
      delete modal.dataset.currentProductId;
    }
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
      </div>
    `;

    // Add styles
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      z-index: 10001;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;

    notification.querySelector('.notification-content').style.cssText = `
      display: flex;
      align-items: center;
      gap: 0.5rem;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Animate out and remove
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
}

// Initialize the store when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new FootwearStore();
});

// Add some utility functions for enhanced interactivity
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('productModal');
    if (modal && modal.classList.contains('show')) {
      modal.classList.remove('show');
      document.body.style.overflow = '';
    }
  }
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationDelay = `${entry.target.style.getPropertyValue('--stagger') * 0.1}s`;
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Progressive image loading
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src || img.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = FootwearStore;
}