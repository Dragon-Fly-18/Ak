let cart = [];
let totalPrice = 0;

const cartLink = document.getElementById('cart-link');
const cartModal = document.getElementById('cart-modal');
const cartItemsList = document.getElementById('cart-items');
const totalPriceSpan = document.getElementById('total-price');
const checkoutButton = document.getElementById('checkout');
const closeModalButton = document.querySelector('.close');

// Function to update the cart display
function updateCart() {
    cartLink.innerHTML = `Cart (${cart.length})`;
    cartItemsList.innerHTML = "";
    totalPrice = 0;
    
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItemsList.appendChild(li);
        totalPrice += item.price;
    });
    
    totalPriceSpan.textContent = totalPrice;
}

// Add item to the cart
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const productName = button.getAttribute('data-product');
        const productPrice = parseFloat(button.getAttribute('data-price'));
        cart.push({ name: productName, price: productPrice });
        updateCart();
        alert(`${productName} added to your cart!`);
    });
});

// Show the cart modal when clicking the cart link
cartLink.addEventListener('click', function() {
    cartModal.style.display = 'block';
});

// Close the modal when clicking the close button
closeModalButton.addEventListener('click', function() {
    cartModal.style.display = 'none';
});

// Close the modal if the user clicks outside the modal content
window.addEventListener('click', function(event) {
    if (event.target === cartModal) {
        cartModal.style.display = 'none';
    }
});

// Checkout process
checkoutButton.addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        alert('Proceeding to checkout...');
        // Reset the cart after checkout
        cart = [];
        updateCart();
        cartModal.style.display = 'none';
    }
});
