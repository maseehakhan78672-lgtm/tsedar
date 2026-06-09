// ============================================
// NAVIGATION & HAMBURGER MENU
// ============================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ============================================
// NAVIGATION UTILITIES
// ============================================

function navigateTo(page) {
    window.location.href = page;
}

function viewProductDetail(element) {
    window.location.href = 'product-detail.html';
}

// ============================================
// PRODUCT CART & WISHLIST
// ============================================

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function addToCart() {
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const color = document.getElementById('color')?.value || 'Default';
    const size = document.getElementById('size')?.value || 'Default';
    
    const product = {
        id: Date.now(),
        name: document.querySelector('.pdp-title')?.textContent || 'Product',
        price: parseFloat(document.querySelector('.current-price')?.textContent.replace('$', '')) || 0,
        quantity: quantity,
        color: color,
        size: size
    };
    
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    showNotification('✓ Product added to cart!', 'success');
}

function addToWishlist() {
    const product = {
        id: Date.now(),
        name: document.querySelector('.pdp-title')?.textContent || 'Product',
        price: parseFloat(document.querySelector('.current-price')?.textContent.replace('$', '')) || 0
    };
    
    wishlist.push(product);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    showNotification('♥ Product added to wishlist!', 'success');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background-color: ${type === 'success' ? '#27ae60' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 2000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// QUANTITY SELECTOR
// ============================================

const decreaseQtyBtn = document.getElementById('decreaseQty');
const increaseQtyBtn = document.getElementById('increaseQty');
const quantityInput = document.getElementById('quantity');

if (decreaseQtyBtn && quantityInput) {
    decreaseQtyBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
}

if (increaseQtyBtn && quantityInput) {
    increaseQtyBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
            quantityInput.value = currentValue + 1;
        }
    });
}

// ============================================
// PRODUCT FILTERING & SORTING
// ============================================

const categoryFilters = document.querySelectorAll('.category-filter');
const priceFilters = document.querySelectorAll('.price-filter');
const sortSelect = document.getElementById('sortSelect');

if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
        sortProducts(e.target.value);
    });
}

categoryFilters.forEach(filter => {
    filter.addEventListener('change', () => {
        filterProducts();
    });
});

priceFilters.forEach(filter => {
    filter.addEventListener('change', () => {
        filterProducts();
    });
});

function filterProducts() {
    const selectedCategories = Array.from(categoryFilters)
        .filter(f => f.checked)
        .map(f => f.value);
    
    const selectedPrices = Array.from(priceFilters)
        .filter(f => f.checked)
        .map(f => f.value);
    
    console.log('Filtering by categories:', selectedCategories);
    console.log('Filtering by prices:', selectedPrices);
    showNotification('Filters applied!', 'info');
}

function sortProducts(sortBy) {
    console.log('Sorting by:', sortBy);
    showNotification(`Sorted by ${sortBy}`, 'info');
}

// ============================================
// THUMBNAIL IMAGE SELECTION (PDP)
// ============================================

const thumbnails = document.querySelectorAll('.thumbnail');
const mainImage = document.querySelector('.main-image .placeholder-product');

thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        // Remove active class from all thumbnails
        thumbnails.forEach(t => t.style.borderColor = 'transparent');
        // Add active class to clicked thumbnail
        thumbnail.style.borderColor = '#3498db';
        
        // In a real app, this would update the main image
        console.log('Selected image:', index + 1);
    });
});

// Set first thumbnail as active
if (thumbnails.length > 0) {
    thumbnails[0].style.borderColor = '#3498db';
}

// ============================================
// FORM HANDLING (CONTACT PAGE)
// ============================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            privacy: document.getElementById('privacy').checked
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!formData.privacy) {
            showFormMessage('Please agree to the privacy policy.', 'error');
            return;
        }
        
        // Simulate form submission
        console.log('Form submitted:', formData);
        
        // Show success message
        showFormMessage('✓ Thank you! Your message has been sent successfully.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // In a real app, you would send this data to a server
    });
}

function showFormMessage(message, type) {
    if (formMessage) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
}

// ============================================
// FAQ ACCORDION
// ============================================

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        
        // Close other open items
        faqQuestions.forEach(q => {
            if (q !== question) {
                q.parentElement.classList.remove('active');
            }
        });
        
        // Toggle current item
        faqItem.classList.toggle('active');
    });
});

// ============================================
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// PAGE PAGINATION
// ============================================

const pageButtons = document.querySelectorAll('.page-btn');

pageButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Remove active class from all buttons
        pageButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        if (!e.target.classList.contains('next')) {
            e.target.classList.add('active');
        }
        
        console.log('Navigating to page:', e.target.textContent);
    });
});

// ============================================
// LAZY LOADING & ANIMATIONS
// ============================================

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all product cards and sections
document.querySelectorAll('.product-card, .value-card, .team-member').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(element);
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Get cart count
function getCartCount() {
    return cart.length;
}

// Get wishlist count
function getWishlistCount() {
    return wishlist.length;
}

// ============================================
// ANIMATIONS CSS
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// INITIALIZE PAGE
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Tsedar website loaded successfully');
    console.log('Cart items:', getCartCount());
    console.log('Wishlist items:', getWishlistCount());
});

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.message);
});

// ============================================
// RESPONSIVE IMAGE LOADING
// ============================================

function loadResponsiveImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Call on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadResponsiveImages);
} else {
    loadResponsiveImages();
}