// Creative Pizza Website JavaScript

// Hero Slider Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

// Auto slide
setInterval(nextSlide, 5000);

// Slider controls
document.querySelector('.slider-btn.next').addEventListener('click', nextSlide);
document.querySelector('.slider-btn.prev').addEventListener('click', prevSlide);

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Menu Category Filtering
const menuCategories = document.querySelectorAll('.menu-category');
const menuItems = document.querySelectorAll('.menu-item');

menuCategories.forEach(category => {
    category.addEventListener('click', function() {
        // Remove active class from all categories
        menuCategories.forEach(cat => cat.classList.remove('active'));
        // Add active class to clicked category
        this.classList.add('active');

        const categoryFilter = this.getAttribute('data-category');

        menuItems.forEach(item => {
            if (categoryFilter === 'all' || item.getAttribute('data-category') === categoryFilter) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Order Form Functionality
const orderForm = document.getElementById('orderForm');
const orderTotal = document.getElementById('orderTotal');

const pizzaPrices = {
    margherita: 16.99,
    pepperoni: 18.99,
    veggie: 17.99
};

const sizeMultipliers = {
    small: 0.8,
    medium: 1,
    large: 1.2
};

function calculateTotal() {
    const pizzaType = document.getElementById('pizzaType').value;
    const pizzaSize = document.getElementById('pizzaSize').value;
    const quantity = parseInt(document.getElementById('quantity').value) || 1;

    if (pizzaType && pizzaSize) {
        const basePrice = pizzaPrices[pizzaType];
        const sizeMultiplier = sizeMultipliers[pizzaSize];
        const total = (basePrice * sizeMultiplier * quantity).toFixed(2);
        orderTotal.textContent = total;
    }
}

// Event listeners for order form
document.getElementById('pizzaType').addEventListener('change', calculateTotal);
document.getElementById('pizzaSize').addEventListener('change', calculateTotal);
document.getElementById('quantity').addEventListener('input', calculateTotal);

// Order form submission
orderForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('customerName').value,
        phone: document.getElementById('customerPhone').value,
        address: document.getElementById('customerAddress').value,
        pizzaType: document.getElementById('pizzaType').value,
        pizzaSize: document.getElementById('pizzaSize').value,
        quantity: document.getElementById('quantity').value,
        total: orderTotal.textContent
    };

    // Validate form
    if (!formData.name || !formData.phone || !formData.address || !formData.pizzaType) {
        alert('Please fill in all required fields.');
        return;
    }

    // Show order confirmation
    const confirmationMessage = `
🎉 Order Confirmed! 🎉

Thank you ${formData.name}!

📍 Delivery Address: ${formData.address}
📞 Phone: ${formData.phone}
🍕 Order: ${formData.quantity}x ${formData.pizzaType} (${formData.pizzaSize})
💰 Total: $${formData.total}

Your delicious pizza will be delivered within 30-45 minutes!
Our delivery team will call you when they're on the way.

Bon Appétit! 🍕✨
    `;

    alert(confirmationMessage);

    // Reset form
    this.reset();
    calculateTotal();
});

// Sticky Navigation
const navbar = document.querySelector('.navbar');
const stickyOffset = navbar.offsetTop;

function handleScroll() {
    if (window.pageYOffset > stickyOffset) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
}

window.addEventListener('scroll', handleScroll);

// Parallax Effect for Hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSlides = document.querySelectorAll('.hero-slide');

    heroSlides.forEach(slide => {
        const rate = scrolled * -0.5;
        slide.style.transform = `translateY(${rate}px)`;
    });
});

// Video Placeholder Interaction
const videoPlaceholder = document.querySelector('.video-placeholder');
if (videoPlaceholder) {
    videoPlaceholder.addEventListener('click', function() {
        alert('🎥 Video: "The Art of Pizza Making at Mushka Pizza"\n\nThis video showcases our master pizzaiolos crafting each pizza with traditional techniques and the finest ingredients. Coming soon!');
    });
}

// Menu Card Hover Effects
const menuCards = document.querySelectorAll('.menu-card');
menuCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const overlay = this.querySelector('.menu-overlay');
        if (overlay) {
            overlay.style.opacity = '1';
        }
    });

    card.addEventListener('mouseleave', function() {
        const overlay = this.querySelector('.menu-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
        }
    });
});

// Review Cards Animation
const reviewCards = document.querySelectorAll('.review-card');
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}, observerOptions);

reviewCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Social Media Links
function openFacebook() {
    window.open('https://facebook.com/mushkapizza', '_blank');
}

function openInstagram() {
    window.open('https://instagram.com/mushkapizza', '_blank');
}

function openTwitter() {
    window.open('https://twitter.com/mushkapizza', '_blank');
}

function openYouTube() {
    window.open('https://youtube.com/mushkapizza', '_blank');
}

// Newsletter Subscription (placeholder)
function subscribeNewsletter() {
    const email = prompt('Enter your email for exclusive offers:');
    if (email) {
        alert('Thank you for subscribing! Get ready for delicious updates and special offers.');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set initial slide
    showSlide(0);

    // Calculate initial order total
    calculateTotal();

    // Add scroll animations
    const animatedElements = document.querySelectorAll('.section-title, .section-subtitle, .menu-categories');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInLeft 1s ease-out';
            }
        });
    });

    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });

    // Add floating animation to decorative elements
    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach(element => {
        element.style.animation = 'float 3s ease-in-out infinite';
    });
});

// Menu item quick order
function quickOrder(pizzaType, size = 'medium') {
    // Scroll to order section
    document.getElementById('order').scrollIntoView({behavior: 'smooth'});

    // Pre-fill order form
    setTimeout(() => {
        document.getElementById('pizzaType').value = pizzaType;
        document.getElementById('pizzaSize').value = size;
        calculateTotal();
    }, 1000);
}

// Add click handlers to menu order buttons
document.querySelectorAll('.btn-order-sm').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const card = this.closest('.menu-card');
        const pizzaName = card.querySelector('h3').textContent.toLowerCase();

        let pizzaType = 'margherita'; // default
        if (pizzaName.includes('pepperoni')) pizzaType = 'pepperoni';
        if (pizzaName.includes('veggie')) pizzaType = 'veggie';

        quickOrder(pizzaType);
    });
});

// ===== SHOPPING CART FUNCTIONALITY =====
let cart = [];
let cartTotal = 0;

function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        cart.push({...item});
    }

    updateCartDisplay();
    updateCartCount();
    showNotification(`${item.name} added to cart!`);
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
    updateCartCount();
}

function updateCartQuantity(itemId, newQuantity) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal = 0;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Size: ${item.size}</p>
                    <p>Quantity: <input type="number" value="${item.quantity}" min="1" onchange="updateCartQuantity('${item.id}', this.value)"></p>
                </div>
                <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
                <button class="remove-item" onclick="removeFromCart('${item.id}')">&times;</button>
            </div>
        `).join('');

        cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    cartTotalElement.textContent = cartTotal.toFixed(2);
}

function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const themeOverlay = document.getElementById('themeOverlay');

    cartSidebar.classList.toggle('open');
    themeOverlay.style.display = cartSidebar.classList.contains('open') ? 'block' : 'none';
}

function checkoutCart() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const orderSummary = cart.map(item =>
        `${item.quantity}x ${item.name} (${item.size}) - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const totalMessage = `\n\nTotal: $${cartTotal.toFixed(2)}\n\nProceed to checkout?`;

    if (confirm('Order Summary:\n\n' + orderSummary + totalMessage)) {
        // In a real application, this would redirect to checkout
        alert('Redirecting to checkout...');
        cart = [];
        updateCartDisplay();
        updateCartCount();
        toggleCart();
    }
}

// ===== SEARCH FUNCTIONALITY =====
function initializeSearch() {
    const searchInput = document.getElementById('menuSearch');

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const menuItems = document.querySelectorAll('.menu-item');

        menuItems.forEach(item => {
            const itemName = item.querySelector('h3').textContent.toLowerCase();
            const itemDesc = item.querySelector('p').textContent.toLowerCase();

            if (itemName.includes(searchTerm) || itemDesc.includes(searchTerm) || searchTerm === '') {
                item.style.display = 'block';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
}

// ===== DARK MODE TOGGLE =====
function toggleDarkMode() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle i');

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        themeToggle.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
        showNotification('Dark mode enabled!');
    } else {
        themeToggle.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
        showNotification('Light mode enabled!');
    }
}

// Load saved theme
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.querySelector('.theme-toggle i');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.className = 'fas fa-sun';
    } else {
        themeToggle.className = 'fas fa-moon';
    }
}

// ===== NEWSLETTER FUNCTIONALITY =====
function openNewsletterPopup() {
    document.getElementById('newsletterPopup').style.display = 'flex';
}

function closeNewsletterPopup() {
    document.getElementById('newsletterPopup').style.display = 'none';
}

function subscribeNewsletter(event) {
    event.preventDefault();

    const email = event.target.querySelector('input[type="email"]').value;
    const consent = document.getElementById('newsletterConsent').checked;

    if (!consent) {
        alert('Please agree to receive marketing emails.');
        return;
    }

    if (email) {
        // In a real application, this would send to backend
        alert(`Thank you for subscribing! We'll send updates to ${email}`);
        closeNewsletterPopup();
        event.target.reset();
    }
}

// Auto-show newsletter popup after 30 seconds
setTimeout(() => {
    if (!localStorage.getItem('newsletterShown')) {
        openNewsletterPopup();
        localStorage.setItem('newsletterShown', 'true');
    }
}, 30000);

// ===== IMAGE GALLERY LIGHTBOX =====
let currentImageIndex = 0;
let galleryImages = [];

function initializeLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');

    galleryImages = Array.from(galleryItems).map(img => ({
        src: img.src,
        alt: img.alt
    }));

    galleryItems.forEach((img, index) => {
        img.addEventListener('click', () => openLightbox(index));
    });
}

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');

    lightboxImage.src = galleryImages[index].src;
    lightboxCaption.textContent = galleryImages[index].alt;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightboxImage();
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');

    lightboxImage.src = galleryImages[currentImageIndex].src;
    lightboxCaption.textContent = galleryImages[currentImageIndex].alt;
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightbox');

    if (lightbox.style.display === 'flex') {
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    }
});

// ===== LIVE CHAT FUNCTIONALITY =====
let chatMessages = [];
let chatOpen = false;

function toggleChat() {
    const chatWidget = document.getElementById('chatWidget');
    chatOpen = !chatOpen;

    if (chatOpen) {
        chatWidget.classList.add('open');
    } else {
        chatWidget.classList.remove('open');
    }
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (message) {
        addMessage('user', message);
        input.value = '';

        // Simulate bot response
        setTimeout(() => {
            const responses = [
                "Thanks for your message! How can I help you with your pizza order?",
                "I'd be happy to assist you! What would you like to know about our menu?",
                "Great question! Let me help you find the perfect pizza.",
                "Thanks for reaching out! Our customer service team will get back to you soon.",
                "I understand! Let me connect you with our support team."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage('bot', randomResponse);
        }, 1000 + Math.random() * 2000);
    }
}

function handleChatKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function addMessage(sender, content) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const avatar = sender === 'user' ? '👤' : '🤖';

    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i>
        </div>
        <div class="message-content">
            <p>${content}</p>
            <small>${new Date().toLocaleTimeString()}</small>
        </div>
    `;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// ===== ORDER TRACKING =====
function showTrackingModal() {
    $('#trackingModal').modal('show');
}

function trackOrder() {
    const orderNumber = document.getElementById('orderNumber').value;

    if (!orderNumber) {
        alert('Please enter an order number.');
        return;
    }

    // Simulate order tracking
    document.querySelector('.tracking-form').style.display = 'none';
    document.getElementById('trackingResult').style.display = 'block';

    // In a real application, this would fetch from backend
    showNotification(`Tracking order #${orderNumber}`);
}

// ===== PRINT RECEIPT FUNCTIONALITY =====
function printReceipt(orderData) {
    const printWindow = window.open('', '_blank');
    const receiptHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Mushka Pizza Receipt</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 400px; margin: 0 auto; padding: 20px; }
                .header { text-align: center; border-bottom: 2px solid #ff6b35; padding-bottom: 20px; margin-bottom: 20px; }
                .logo { font-size: 24px; font-weight: bold; color: #ff6b35; }
                .order-details { margin: 20px 0; }
                .item { display: flex; justify-content: space-between; margin: 10px 0; padding: 10px; background: #f9f9f9; border-radius: 5px; }
                .total { font-size: 18px; font-weight: bold; text-align: center; margin: 20px 0; padding: 15px; background: #ff6b35; color: white; border-radius: 5px; }
                .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo">MUSHKA PIZZA</div>
                <p>Order #${orderData.orderNumber || 'N/A'}</p>
                <p>${new Date().toLocaleDateString()}</p>
            </div>

            <div class="order-details">
                <h3>Customer Details:</h3>
                <p><strong>Name:</strong> ${orderData.name || 'N/A'}</p>
                <p><strong>Phone:</strong> ${orderData.phone || 'N/A'}</p>
                <p><strong>Address:</strong> ${orderData.address || 'N/A'}</p>
            </div>

            <div class="order-details">
                <h3>Order Items:</h3>
                ${orderData.items ? orderData.items.map(item => `
                    <div class="item">
                        <span>${item.quantity}x ${item.name} (${item.size})</span>
                        <span>$${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('') : '<p>No items</p>'}
            </div>

            <div class="total">
                Total: $${orderData.total || '0.00'}
            </div>

            <div class="footer">
                <p>Thank you for choosing Mushka Pizza!</p>
                <p>Visit us again soon!</p>
            </div>
        </body>
        </html>
    `;

    printWindow.document.write(receiptHTML);
    printWindow.document.close();
    printWindow.print();
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #ff6b35, #f7931e);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== FAVORITES/WISHLIST SYSTEM =====
let favorites = JSON.parse(localStorage.getItem('pizzaFavorites')) || [];

function toggleFavorite(pizzaId) {
    const index = favorites.indexOf(pizzaId);

    if (index > -1) {
        favorites.splice(index, 1);
        showNotification('Removed from favorites');
    } else {
        favorites.push(pizzaId);
        showNotification('Added to favorites');
    }

    localStorage.setItem('pizzaFavorites', JSON.stringify(favorites));
    updateFavoriteButtons();
}

function updateFavoriteButtons() {
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        const pizzaId = btn.dataset.pizzaId;
        const icon = btn.querySelector('i');

        if (favorites.includes(pizzaId)) {
            icon.className = 'fas fa-heart';
            btn.style.color = '#ff6b35';
        } else {
            icon.className = 'far fa-heart';
            btn.style.color = '#666';
        }
    });
}

// ===== VIDEO FUNCTIONALITY =====
function playMainVideo() {
    // In a real implementation, this would load a video player
    alert('🎥 Now playing: "The Art of Pizza Making at Mushka Pizza"\n\nThis video showcases our master pizzaiolos crafting each pizza with traditional techniques and the finest ingredients.\n\n[Video would play here in a real implementation]');
    showNotification('Video started playing!');
}

function playVideo(videoNumber) {
    const videoTitles = {
        1: 'Customer Stories - Real Reviews from Happy Customers',
        2: 'Behind the Scenes - A Day in Our Kitchen',
        3: 'Special Events - Celebrating with Our Community'
    };

    const videoDescriptions = {
        1: 'Hear directly from our satisfied customers about their favorite Mushka Pizza experiences.',
        2: 'Take a peek behind the scenes at our daily operations and pizza-making process.',
        3: 'Join us for special events, celebrations, and community gatherings at Mushka Pizza.'
    };

    alert(`🎥 Now playing: "${videoTitles[videoNumber]}"\n\n${videoDescriptions[videoNumber]}\n\n[Video would play here in a real implementation]`);
    showNotification(`Playing: ${videoTitles[videoNumber]}`);
}

// ===== INITIALIZE ALL FEATURES =====
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing features
    showSlide(0);
    calculateTotal();
    loadSavedTheme();

    // Initialize new features
    initializeSearch();
    initializeLightbox();
    updateFavoriteButtons();

    // Add favorite buttons to menu items
    document.querySelectorAll('.menu-card').forEach((card, index) => {
        const favoriteBtn = document.createElement('button');
        favoriteBtn.className = 'favorite-btn';
        favoriteBtn.dataset.pizzaId = `pizza-${index}`;
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
        favoriteBtn.onclick = () => toggleFavorite(`pizza-${index}`);

        card.appendChild(favoriteBtn);
    });

    // Add cart functionality to menu items
    document.querySelectorAll('.menu-card').forEach(card => {
        const orderBtn = card.querySelector('.btn-order-sm');
        if (orderBtn) {
            orderBtn.addEventListener('click', function() {
                const name = card.querySelector('h3').textContent;
                const priceText = card.querySelector('.menu-price').textContent;
                const price = parseFloat(priceText.replace('$', ''));

                const cartItem = {
                    id: `item-${Date.now()}`,
                    name: name,
                    price: price,
                    size: 'Medium', // Default size
                    quantity: 1,
                    image: card.querySelector('img').src
                };

                addToCart(cartItem);
            });
        }
    });

    // Close modals when clicking overlay
    document.getElementById('themeOverlay').addEventListener('click', function() {
        toggleCart();
    });

    // Close newsletter popup when clicking outside
    document.getElementById('newsletterPopup').addEventListener('click', function(e) {
        if (e.target === this) {
            closeNewsletterPopup();
        }
    });

    // Add some sample chat messages
    setTimeout(() => {
        addMessage('bot', 'Welcome to Mushka Pizza! How can I help you today?');
    }, 2000);

    // Add video section to navigation
    const navItems = document.querySelector('.navbar-nav');
    if (navItems) {
        const videosLink = document.createElement('li');
        videosLink.className = 'nav-item';
        videosLink.innerHTML = '<a class="nav-link" href="#videos">Videos</a>';
        navItems.insertBefore(videosLink, navItems.children[4]); // Insert before reviews
    }
});