document.addEventListener('DOMContentLoaded', () => {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const addToCartButton = card.querySelector('.add-to-cart');
        const sizeSelect = card.querySelector('.size-select, #size-select');
        const quantityInput = card.querySelector('.quantity, #quantity');
        const productTitle = card.querySelector('.product-title').textContent;

        addToCartButton.addEventListener('click', () => {
            const selectedSize = sizeSelect.value;
            const quantity = quantityInput.value;

            if (!selectedSize) {
                alert('Please select a size');
                return;
            }

            alert(`Added ${quantity} ${productTitle} of size ${selectedSize.toUpperCase()} to cart`);
        });

        quantityInput.addEventListener('change', () => {
            if (quantityInput.value < 1) {
                quantityInput.value = 1;
            }
        });
    });

    // Add inner card click handlers
    const innerCards = document.querySelectorAll('.inner-card');
    innerCards.forEach(card => {
        card.addEventListener('click', () => {
            const price = card.querySelector('p').textContent;
            const variation = card.querySelector('h3').textContent;
            const parentCard = card.closest('.product-card');
            const mainPrice = parentCard.querySelector('.product-price');
            const mainTitle = parentCard.querySelector('.product-title');
            
            mainPrice.textContent = price;
            mainTitle.textContent = `${mainTitle.textContent} - ${variation}`;
        });
    });

    // Update quantity buttons for all products
    document.querySelectorAll('.product-container').forEach(container => {
        const minusBtn = container.querySelector('.minus');
        const plusBtn = container.querySelector('.plus');
        const quantityInput = container.querySelector('.quantity-input');

        minusBtn.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            quantityInput.value = value + 1;  // Removed upper limit
        });

        quantityInput.addEventListener('change', () => {
            let value = parseInt(quantityInput.value);
            if (value < 1) {
                quantityInput.value = 1;
            }
            // Removed upper limit check
        });
    });

    const addToCartBtn = document.querySelector('.add-to-cart');

    addToCartBtn.addEventListener('click', () => {
        alert(`Added ${quantityInput.value} item(s) to cart!`);
    });

    const cartButton = document.getElementById('cartButton');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCart = document.querySelector('.close-cart');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.querySelector('.cart-count');

    let cart = [];

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        
        cart.forEach((item, index) => {
            total += item.price * item.quantity;
            cartItems.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <h3>${item.name}</h3>
                        <p class="cart-item-price">$${item.price}</p>
                        <div class="cart-item-quantity">
                            <button class="cart-quantity-btn minus" onclick="updateCartItemQuantity(${index}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="cart-quantity-btn plus" onclick="updateCartItemQuantity(${index}, 1)">+</button>
                            <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
                        </div>
                    </div>
                </div>
            `;
        });

        cartTotal.textContent = total.toFixed(2);
        cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
        
        // Hide cart if empty
        if (cart.length === 0) {
            cartCount.style.display = 'none';
        } else {
            cartCount.style.display = 'flex';
        }
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    function updateCartItemQuantity(index, change) {
        const item = cart[index];
        const newQuantity = item.quantity + change;
        
        if (newQuantity > 0) {  // Only check for minimum value
            item.quantity = newQuantity;
        } else {
            removeFromCart(index);
        }
        updateCart();
    }

    // Make functions globally available
    window.removeFromCart = removeFromCart;
    window.updateCartItemQuantity = updateCartItemQuantity;

    cartButton.addEventListener('click', () => {
        cartOverlay.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cartOverlay.classList.remove('active');
    });

    function addToCart(name, price, image, quantity) {
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ name, price, image, quantity });
        }
        
        updateCart();
        // Show cart overlay when item is added
        cartOverlay.classList.add('active');
        
        // Optional: Auto-hide cart overlay after 2 seconds
        setTimeout(() => {
            cartOverlay.classList.remove('active');
        }, 2000);
        animateCartButton();
    }

    // Update add to cart button click handlers
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const container = e.target.closest('.product-container');
            const name = container.querySelector('.product-title').textContent;
            const price = parseFloat(container.querySelector('.product-price').textContent.replace('$', ''));
            const image = container.querySelector('.product-image img').src;
            const quantity = parseInt(container.querySelector('.quantity-input').value);
            
            addToCart(name, price, image, quantity);
        });
    });

    function animateCartButton() {
        cartButton.classList.add('bounce');
        setTimeout(() => {
            cartButton.classList.remove('bounce');
        }, 300);
    }

    // Slider code
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto advance slides every 5 seconds
    setInterval(nextSlide, 5000);

    // Add mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const box1 = document.querySelector('.box1');

    menuToggle.addEventListener('click', () => {
        box1.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!box1.contains(e.target) && !menuToggle.contains(e.target)) {
            box1.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
        }
    });

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 932) {  // Changed from 768 to 932
                box1.classList.remove('active');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            }
        }, 250);
    });

    // Update slider for touch devices
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    slider.addEventListener('touchmove', (e) => {
        touchEndX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', () => {
        const swipeDistance = touchStartX - touchEndX;
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    });

    // Update the checkout button click handler
    document.querySelector('.checkout-btn').addEventListener('click', function() {
        if (cart.length > 0) {
            // Save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            // Redirect to checkout page
            window.location.href = 'checkout.html';
        } else {
            alert('Your cart is empty!');
        }
    });
});

// Make cart overlay responsive to screen size
window.addEventListener('resize', () => {
    const cartOverlay = document.getElementById('cartOverlay');
    if (window.innerWidth <= 932) {  // Changed from 768 to 932
        cartOverlay.style.width = '100%';
    } else {
        cartOverlay.style.width = '400px';
    }
});
