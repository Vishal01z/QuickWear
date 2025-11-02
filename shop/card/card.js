document.addEventListener('DOMContentLoaded', function() {
    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('quickwear_cart')) || [];
    
    // DOM Elements
    const cartItemsList = document.getElementById('cart-items-list');
    const cartEmpty = document.getElementById('cart-empty');
    const cartCount = document.getElementById('cart-count');
    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    // Render cart items
    function renderCart() {
        // Clear existing items
        cartItemsList.innerHTML = '';
        
        if (cart.length === 0) {
            cartEmpty.style.display = 'flex';
            cartItemsList.style.display = 'none';
            cartCount.textContent = '0';
            updateOrderSummary(0);
            return;
        }
        
        cartEmpty.style.display = 'none';
        cartItemsList.style.display = 'block';
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        
        // Calculate subtotal
        let subtotal = 0;
        
        cart.forEach(item => {
            subtotal += item.price * item.quantity;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${item.name}</h3>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-actions">
                        <button class="remove-item" data-id="${item.id}">Remove</button>
                        <button class="save-for-later" data-id="${item.id}">Save for later</button>
                    </div>
                </div>
                <div class="quantity-selector">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
            `;
            
            cartItemsList.appendChild(cartItem);
        });
        
        updateOrderSummary(subtotal);
    }
    
    // Update order summary
    function updateOrderSummary(subtotal) {
        const shipping = subtotal > 50 ? 0 : 5.99;
        const tax = subtotal * 0.08; // 8% tax
        
        subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        shippingEl.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
        taxEl.textContent = `$${tax.toFixed(2)}`;
        totalEl.textContent = `$${(subtotal + shipping + tax).toFixed(2)}`;
    }
    
    // Event delegation for cart actions
    cartItemsList.addEventListener('click', function(e) {
        const target = e.target;
        const id = target.getAttribute('data-id');
        
        if (target.classList.contains('remove-item')) {
            // Remove item completely
            cart = cart.filter(item => item.id !== id);
            saveCart();
            renderCart();
            showNotification('Item removed from cart');
        }
        else if (target.classList.contains('quantity-btn')) {
            const itemIndex = cart.findIndex(item => item.id === id);
            if (itemIndex >= 0) {
                if (target.classList.contains('minus')) {
                    // Decrement quantity (remove if reaches 0)
                    if (cart[itemIndex].quantity > 1) {
                        cart[itemIndex].quantity--;
                    } else {
                        cart.splice(itemIndex, 1);
                    }
                } else if (target.classList.contains('plus')) {
                    // Increment quantity
                    cart[itemIndex].quantity++;
                }
                saveCart();
                renderCart();
            }
        }
    });
    
    // Handle quantity input changes
    cartItemsList.addEventListener('change', function(e) {
        if (e.target.classList.contains('quantity-input')) {
            const id = e.target.getAttribute('data-id');
            const quantity = parseInt(e.target.value) || 1;
            
            const itemIndex = cart.findIndex(item => item.id === id);
            if (itemIndex >= 0) {
                if (quantity > 0) {
                    cart[itemIndex].quantity = quantity;
                } else {
                    cart.splice(itemIndex, 1);
                }
                saveCart();
                renderCart();
            }
        }
    });
    
    // Save cart to localStorage
    function saveCart() {
        localStorage.setItem('quickwear_cart', JSON.stringify(cart));
        // Update cart count in header
        const headerCartCounts = document.querySelectorAll('.cart-count');
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        headerCartCounts.forEach(el => el.textContent = totalItems);
    }
    
    // Show notification
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }, 10);
    }
    
    // Checkout button
    checkoutBtn.addEventListener('click', function() {
        if (cart.length === 0) {
            showNotification('Your cart is empty!');
            return;
        }
        window.location.href = 'checkout.html';
    });
    
    // Initial render
    renderCart();
    
    // Hide loader
    setTimeout(() => {
        document.getElementById('loader').classList.add('fade-out');
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 500);
    }, 500);
});