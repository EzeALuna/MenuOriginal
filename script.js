const menuItems = [
    { id: 1, name: "Hamburguesa Clásica", price: 5.99, image: "/placeholder.svg?height=100&width=100&text=Clásica", description: "Deliciosa hamburguesa con carne de res, lechuga, tomate y nuestra salsa especial.", extras: [
        { name: "queso", price: 0.50 },
        { name: "bacon", price: 1.00 },
        { name: "huevo", price: 0.75 }
    ]},
    { id: 2, name: "Hamburguesa Doble", price: 7.99, image: "/placeholder.svg?height=100&width=100&text=Doble", description: "El doble de sabor con dos carnes, queso cheddar, cebolla caramelizada y pepinillos.", extras: [
        { name: "queso", price: 0.50 },
        { name: "bacon", price: 1.00 },
        { name: "huevo", price: 0.75 }
    ]},
    { id: 3, name: "Papas Fritas", price: 2.99, image: "/placeholder.svg?height=100&width=100&text=Papas", description: "Crujientes papas fritas, perfectamente sazonadas con nuestra mezcla secreta de especias.", extras: [
        { name: "queso", price: 0.50 },
        { name: "bacon", price: 1.00 }
    ]},
    { id: 4, name: "Refresco", price: 1.99, image: "/placeholder.svg?height=100&width=100&text=Refresco", description: "Refrescante bebida para acompañar tu comida. Variedad de sabores disponibles.", extras: [] }
];

        let cartItems = [];

        function displayMenu() {
            const menuContainer = document.getElementById("menu-items");
            menuItems.forEach(item => {
                const itemElement = document.createElement("div");
                itemElement.className = "menu-item";
                itemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}">
                    <div class="menu-item-content">
                        <h3>${item.name} - $${item.price.toFixed(2)}</h3>
                        <p>${item.description}</p>
                        ${item.extras.length > 0 ? `
                            <h4>Extras:</h4>
                            ${item.extras.map(extra => `
                                <label>
                                    <input type="checkbox" name="extra-${item.id}" value="${extra.name}" data-price="${extra.price}">
                                    ${extra.name} (+$${extra.price.toFixed(2)})
                                </label>
                            `).join('')}
                        ` : ''}
                        <br> <br>
                        <button onclick="addToCart(${item.id})">Agregar al Carrito</button>
                    </div>
                `;
                menuContainer.appendChild(itemElement);
            });
        }

        function addToCart(itemId) {
            const item = menuItems.find(i => i.id === itemId);
            const extras = Array.from(document.querySelectorAll(`input[name="extra-${itemId}"]:checked`))
                .map(input => ({
                    name: input.value,
                    price: parseFloat(input.dataset.price)
                }));
    
            const extrasTotal = extras.reduce((sum, extra) => sum + extra.price, 0);
            const totalPrice = item.price + extrasTotal;
    
            const cartItem = {
                ...item,
                extras: extras,
                quantity: 1,
                totalPrice: totalPrice
            };

            const existingItemIndex = cartItems.findIndex(i => 
                i.id === itemId && 
                JSON.stringify(i.extras) === JSON.stringify(extras)
            );

            if (existingItemIndex !== -1) {
                cartItems[existingItemIndex].quantity++;
                cartItems[existingItemIndex].totalPrice += totalPrice;
            } else {
                cartItems.push(cartItem);
            }

            updateCart();
        }

        function updateCart() {
            const cartContainer = document.getElementById("cart-items");
            cartContainer.innerHTML = "";
            cartItems.forEach((item, index) => {
                const itemElement = document.createElement("div");
                itemElement.className = "cart-item";
                const extrasTotal = item.extras.reduce((sum, extra) => sum + extra.price, 0);
                itemElement.innerHTML = `
                    <div class="cart-item-content">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-info">
                            <h3>${item.name}</h3>
                            <p>Precio base: $${item.price.toFixed(2)}</p>
                            ${item.extras.length > 0 ? `
                                <p>Extras: ${item.extras.map(extra => `${extra.name} (+$${extra.price.toFixed(2)})`).join(', ')}</p>
                                <p>Total extras: $${extrasTotal.toFixed(2)}</p>
                            ` : ''}
                            <p>Precio total por unidad: $${item.totalPrice.toFixed(2)}</p>
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
            } else {
                // Recalcular el precio total basado en la nueva cantidad
                const item = cartItems[index];
                const extrasTotal = item.extras.reduce((sum, extra) => sum + extra.price, 0);
                item.totalPrice = (item.price + extrasTotal) * item.quantity;
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
            const name = document.getElementById("name").value;
            const address = document.getElementById("address").value;
            const city = document.getElementById("city").value;
            const phone = document.getElementById("phone").value;

            if (!name || !address || !city || !phone) {
                alert("Por favor, complete toda la información de envío.");
                return;
            }

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
            message += "Información de Envío:%0A";
            message += `${name}%0A${address}%0A${city}%0ATeléfono: ${phone}`;

            const whatsappUrl = `https://wa.me/?text=${message}`;
            window.open(whatsappUrl, '_blank');
        }

        // Inicializar el menú al cargar la página
        displayMenu();
  