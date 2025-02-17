const menuSections = [
    {
        name: "Destacados",
        items: [
            {
                id: 1, name: "Hamburguesa Especial", price: 8.99, image: "Img/completa.png",
                descripcion: "Medallon de carne de 120 grs, lechuga, tomate, porcion de papas y pan de papa",
                extras: [
                    { name: "queso", price: 0.50 },
                    { name: "bacon", price: 1.00 },
                    { name: "huevo", price: 0.75 }
                ]
            },
            {
                id: 2, name: "Combo del Día", price: 10.99, image: "Img/conpapas.png",
                descripcion: "Medallon de carne de 120 grs, lechuga, tomate, porcion de papas y pan de papa",
                extras: []
            }
        ]
    },
    {
        name: "Picadas",
        items: [
            {
                id: 3, name: "Nachos con Queso", price: 5.99, image: "Img/nachos.png",
                descripcion: "Nachos con Queso",
                extras: [
                    { name: "guacamole", price: 1.00 },
                    { name: "jalapeños", price: 0.50 }
                ]
            },
            {
                id: 4, name: "Alitas de Pollo", price: 7.99, image: "Img/alitas.png",
                descripcion: "Alitas de Pollo con salsa BBQ",
                extras: [
                    { name: "salsa BBQ", price: 0.50 },
                    { name: "salsa picante", price: 0.50 }
                ]
            }
        ]
    },
    {
        name: "Hamburguesas",
        items: [
            {
                id: 5, name: "Hamburguesa Clásica", price: 5.99, image: "Img/completa.png",
                descripcion: "Medallon de carne de 120 grs, lechuga, tomate, porcion de papas y pan de papa",
                extras: [
                    { name: "queso", price: 0.50 },
                    { name: "bacon", price: 1.00 },
                    { name: "huevo", price: 0.75 }
                ]
            },
            {
                id: 6, name: "Hamburguesa Doble", price: 7.99, image: "Img/conpapas.png",
                descripcion: "Medallon de carne de 120 grs, lechuga, tomate, porcion de papas y pan de papa",
                extras: [
                    { name: "queso", price: 0.50 },
                    { name: "bacon", price: 1.00 },
                    { name: "huevo", price: 0.75 }
                ]
            }
        ]
    },
    {
        name: "Gaseosas",
        items: [
            {
                id: 7, name: "Coca-Cola", price: 1.99, image: "Img/coca.png",
                descripcion: "Lata de gaseosa de 430 ml",
                extras: []
            },
            {
                id: 8, name: "Fanta", price: 1.99, image: "Img/fanta.png",
                descripcion: "Lata de gaseosa de 430 ml",
                extras: []
            }
        ]
    }
];

let cartItems = [];

// Carrusel
const carousel = document.querySelector('.carousel');
const items = carousel.querySelectorAll('.carousel-item');
const prevBtn = carousel.querySelector('.prev');
const nextBtn = carousel.querySelector('.next');
let currentIndex = 0;

function showItem(index) {
    items.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

function nextItem() {
    currentIndex = (currentIndex + 1) % items.length;
    showItem(currentIndex);
}

function prevItem() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showItem(currentIndex);
}

nextBtn.addEventListener('click', nextItem);
prevBtn.addEventListener('click', prevItem);

// Cambiar automáticamente cada 5 segundos
setInterval(nextItem, 5000);

// Horarios
const hoursButton = document.getElementById('hoursButton');
const hoursModal = document.getElementById('hoursModal');
const closeBtn = hoursModal.querySelector('.close');

function updateHoursButton() {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const isWeekend = day === 0 || day === 6;
    //se pone el horario del local
    const isOpen = (isWeekend && hour >= 19 && hour < 22) || (!isWeekend && hour >= 19 && hour < 23);

    hoursButton.textContent = isOpen ? 'Abierto' : 'Cerrado';
    hoursButton.classList.toggle('open', isOpen);
    hoursButton.classList.toggle('closed', !isOpen);
}

hoursButtons.addEventListener('click', () => {
    hoursModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    hoursModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === hoursModal) {
        hoursModal.style.display = 'none';
    }
});

// Actualizar el botón de horarios cada minuto
updateHoursButton();
setInterval(updateHoursButton, 60000);

function displayMenu() {
    const menuContainer = document.getElementById("menu-sections");
    menuSections.forEach((section, index) => {
        const sectionElement = document.createElement("div");
        sectionElement.className = "menu-section";
        sectionElement.innerHTML = `
            <div class="menu-section-header" onclick="toggleSection(${index})">
                ${section.name}
            </div>
            <div class="menu-section-content" id="section-${index}">
                ${section.items.map(item => `
                    <div class="menu-item">
                        <img src="${item.image}" alt="${item.name}" onclick="openImageModal('${item.image}', '${item.name}')">
                        <div class="menu-item-content">
                            <h3>${item.name} - $${item.price.toFixed(2)}</h3>
                            <h4>${item.descripcion}</h4>
                            ${item.extras.length > 0 ? `
                                <h3>Extras:</h3>
                                ${item.extras.map(extra => `
                                    <label>
                                        <input type="checkbox" name="extra-${item.id}" value="${extra.name}" data-price="${extra.price}">
                                        ${extra.name} (+$${extra.price.toFixed(2)})
                                    </label>
                                `).join('')}
                            ` : ''}
                            <button class="add-to-cart-btn" onclick="addToCart(${item.id})">Agregar al Carrito</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        menuContainer.appendChild(sectionElement);
    });
}

function toggleSection(index) {
    const section = document.getElementById(`section-${index}`);
    section.style.display = section.style.display === 'block' ? 'none' : 'block';
}

function addToCart(itemId) {
    const item = menuSections.flatMap(section => section.items).find(i => i.id === itemId);
    const extras = Array.from(document.querySelectorAll(`input[name="extra-${itemId}"]:checked`))
        .map(input => ({
            name: input.value,
            price: parseFloat(input.dataset.price)
        }));

    const cartItem = {
        ...item,
        extras: extras,
        quantity: 1,
        totalPrice: item.price + extras.reduce((sum, extra) => sum + extra.price, 0)
    };

    const existingItemIndex = cartItems.findIndex(i =>
        i.id === itemId &&
        JSON.stringify(i.extras) === JSON.stringify(extras)
    );

    if (existingItemIndex !== -1) {
        cartItems[existingItemIndex].quantity++;
        cartItems[existingItemIndex].totalPrice += cartItem.totalPrice;
    } else {
        cartItems.push(cartItem);
    }

    updateCart();
    showNotification(`${item.name} agregado al carrito`);
}

function updateCart() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.innerHTML = "";

    cartItems.forEach((item, index) => {
        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";
        itemElement.innerHTML = `
            <div class="cart-item-content">
                <img src="${item.image}" alt="${item.name}" onclick="openImageModal('${item.image}', '${item.name}')">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>Precio unidad: $${item.price.toFixed(2)}</p>
                    ${item.extras.length > 0 ? `
                        <p>Extras: ${item.extras.map(extra => `${extra.name} (+$${extra.price.toFixed(2)})`).join(', ')}</p>
                    ` : ''}
                    
                    <p>Subtotal: $${(item.totalPrice * item.quantity).toFixed(2)}</p>
                </div>
            </div>
            <div class="cart-item-actions">
                <div class="quantity-control">
                    <button onclick="changeQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                </div>
                <button onclick="removeFromCart(${index})">Eliminar</button>
            </div>
        `;
        cartContainer.appendChild(itemElement);
    });

    calculateTotal();
}

function changeQuantity(index, change) {
    cartItems[index].quantity += change;
    if (cartItems[index].quantity < 1) {
        cartItems.splice(index, 1);
    }
    updateCart();
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
}

function calculateTotal() {
    const total = cartItems.reduce((sum, item) => sum + item.totalPrice * item.quantity, 0);
    document.getElementById("total-price").textContent = total.toFixed(2);
}

function sendWhatsApp() {
    const orderType = document.querySelector('input[name="order-type"]:checked').value;
    let orderInfo = "";

    if(cartItems.length > 0){
    if (orderType === 'takeaway') {
        orderInfo = "Pedido para llevar";
    } else if (orderType === 'eat-in') {
        const tableNumber = document.getElementById('table-number').value;
        if (!tableNumber) {
            Swal.fire({
                title: "EN QUE MESA ESTA?",
                text: "Por favor, seleccione una mesa",
                icon: "Actualizar"
              });
            return;
        }
        orderInfo = `Comer en el local - Mesa ${tableNumber}`;
    } else if (orderType === 'delivery') {
        const name = document.getElementById("name").value;
        const address = document.getElementById("address").value;

        if (!name || !address) {
            Swal.fire({
                title: "EN QUE DIRECCION ESTA?",
                text: "Por favor, complete la información de envío.",
                icon: "Actualizar"
              });
              return;
        }
        orderInfo = `Envío a domicilio:%0A${name}%0A${address}`;
    }

    // Obtener el medio de pago seleccionado
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

    let message = "Pedido de Hamburguesas:%0A";
    message += "---------------------%0A";
    cartItems.forEach(item => {
        message += `${item.name} - $${item.totalPrice.toFixed(2)} x ${item.quantity}%0A`;
        if (item.extras.length > 0) {
            message += `  Extras: ${item.extras.map(extra => `${extra.name} (+$${extra.price.toFixed(2)})`).join(', ')}%0A`;
        }
        message += `  Subtotal: $${(item.totalPrice * item.quantity).toFixed(2)}%0A`;
    });
    message += "---------------------%0A";
    message += `Total: $${document.getElementById("total-price").textContent}%0A%0A`;
    message += `Tipo de pedido: ${orderInfo}%0A`;
    message += "%0A";
    message += `Medio de pago: ${paymentMethod}`;

    const whatsappUrl = `https://wa.me/+5491123965859/?text=${message}`;
    window.open(whatsappUrl, '_blank');
    }else{
        Swal.fire({
            title: "EL CARRITO ESTA VACIO",
            text: "Elija algo producto",
            icon: "alert"
          });
    }
}

    function showNotification(message) {
        const notification = document.getElementById("notification");
        notification.textContent = message;
        notification.style.display = "block";
        setTimeout(() => {
            notification.style.display = "none";
        }, 3000);
    }
    function openImageModal(src, alt) {
        const modal = document.getElementById("imageModal");
        const modalImg = document.getElementById("modalImage");
        modal.style.display = "block";
        modalImg.src = src;
        modalImg.alt = alt;
    }

    const imageModal = document.getElementById("imageModal");
    const modalClose = imageModal.querySelector(".modal-close");

    modalClose.onclick = function () {
        imageModal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == imageModal) {
            imageModal.style.display = "none";
        }
    }

    // Inicializar el menú al cargar la página
    displayMenu();

    function handleOrderTypeChange() {
        const orderType = document.querySelector('input[name="order-type"]:checked').value;
        const tableSelection = document.getElementById('table-selection');
        const shippingForm = document.getElementById('shipping-form');

        if (orderType === 'eat-in') {
            tableSelection.style.display = 'block';
            shippingForm.style.display = 'none';
        } else if (orderType === 'delivery') {
            tableSelection.style.display = 'none';
            shippingForm.style.display = 'block';
        } else {
            tableSelection.style.display = 'none';
            shippingForm.style.display = 'none';
        }
    }

    document.querySelectorAll('input[name="order-type"]').forEach(radio => {
        radio.addEventListener('change', handleOrderTypeChange);
    });

    // Initialize the form display
    handleOrderTypeChange();