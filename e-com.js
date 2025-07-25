document.addEventListener("DOMContentLoaded", function () {

    /* ===========================
       ✅ NAVIGATION
    ============================ */
    function openNav() {
        document.getElementById("sideNav").style.width = "65%";
        document.getElementById("overlay").style.display = "block";
    }
    function closeNav() {
        document.getElementById("sideNav").style.width = "0";
        document.getElementById("overlay").style.display = "none";
    }
    window.openNav = openNav;
    window.closeNav = closeNav;

    /* ===========================
       ✅ ANIMATED COUNTERS
    ============================ */
    function animateCounter(id, end, speed) {
        const counter = document.getElementById(id);
        if (!counter) return;
        let count = 0;
        let increment = Math.ceil(end / 100);
        const interval = setInterval(() => {
            count += increment;
            if (count >= end) {
                count = end;
                clearInterval(interval);
            }
            counter.textContent = count.toLocaleString();
        }, speed);
    }
    animateCounter("counter1", 12500, 20);
    animateCounter("counter2", 9800, 20);

    /* ===========================
       ✅ PRODUCT PAGE (LISTING)
    ============================ */
    const products = [
        { name: "Xylys Triumph Blue Dial", price: 32500, rating: 4.5, image: "Assets/swtr1.jpg", link: "triumph.html" },
        { name: "Xylys Chronograph Two Toned", price: 47000, rating: 4.0, image: "Assets/chronograph.jpg", link: "chronograph.html" },
        { name: "Titan Quartz Analog", price: 17995, rating: 4.0, image: "Assets/tqa1.jpg", link: "titanquartz.html" },
        { name: "Titan Edge Champagne", price: 12745, rating: 3.5, image: "Assets/eq1.jpg", link: "edgeq.html" },
        { name: "Xylys Multi Black", price: 16720, rating: 3.0, image: "Assets/mb1.jpg", link: "multiblack.html" },
        { name: "Xylys Triumph White Dial", price: 30000, rating: 5.0, image: "Assets/tw5.jpg", link: "triwhite.html" },
        { name: "Titan Nebula Quartz 18K", price: 685000, rating: 5.0, image: "Assets/nnq1.jpg", link: "nebulaquartz.html" },
        { name: "Xylys Integra Black Dial", price: 30000, rating: 4.0, image: "Assets/int1.jpg", link: "integra.html" },
        { name: "Titan Nebula Vintage", price: 430000, rating: 4.5, image: "Assets/nv1.jpg", link: "nebulavintage.html" },
        { name: "Titan Neo Black Strap", price: 12999, rating: 3.5, image: "Assets/nv1.jpg", link: "#" },
        { name: "Sonata Ocean Series", price: 7999, rating: 3.0, image: "Assets/mb1.jpg", link: "#" },
        { name: "Fossil Gen 6 Smartwatch", price: 22995, rating: 4.2, image: "Assets/swtr1.jpg", link: "#" },
        { name: "Seiko 5 Sports Automatic", price: 35999, rating: 4.8, image: "Assets/int1.jpg", link: "#" },
        { name: "Casio G-Shock GA-2100", price: 10495, rating: 4.1, image: "Assets/eq1.jpg", link: "#" }
    ];

    let currentPage = 1;
    const itemsPerPage = 12;
    let sortedProducts = [...products];

    function renderProducts() {
        const container = document.querySelector('.product-row');
        if (!container) return;

        container.innerHTML = '';
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const currentItems = sortedProducts.slice(start, end);

        currentItems.forEach(product => {
            container.innerHTML += `
            <div class="col-4">
                <a href="${product.link}"><img src="${product.image}" alt="${product.name}"></a>
                <h4>${product.name}</h4>
                <div class="rating">${getStars(product.rating)}</div>
                <p>Rs. ${product.price.toLocaleString()}</p>
            </div>`;
        });

        renderPagination();
    }

    function getStars(rating) {
        const full = Math.floor(rating);
        const half = rating % 1 !== 0;
        let stars = '';
        for (let i = 0; i < full; i++) stars += `<i class="fa fa-star"></i>`;
        if (half) stars += `<i class="fa fa-star-half"></i>`;
        return stars;
    }

    function renderPagination() {
        const pagination = document.querySelector('.page-btn');
        if (!pagination) return;

        const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
        pagination.innerHTML = '';
        for (let i = 1; i <= totalPages; i++) {
            pagination.innerHTML += `<span onclick="goToPage(${i})"${i === currentPage ? ' style="font-weight:bold;"' : ''}>${i}</span>`;
        }
        if (currentPage < totalPages) {
            pagination.innerHTML += `<span onclick="goToPage(${currentPage + 1})">&#8594;</span>`;
        }
    }

    window.goToPage = (pageNum) => {
        currentPage = pageNum;
        renderProducts();
    };

    function handleSort(event) {
        const value = event.target.value;
        switch (value) {
            case "Sort by Price": sortedProducts.sort((a, b) => a.price - b.price); break;
            case "Sort by rating": sortedProducts.sort((a, b) => b.rating - a.rating); break;
            case "Sort by name": sortedProducts.sort((a, b) => a.name.localeCompare(b.name)); break;
            default: sortedProducts = [...products];
        }
        currentPage = 1;
        renderProducts();
    }

    const select = document.querySelector("select");
    if (select) {
        select.innerHTML += `<option>Sort by name</option>`;
        select.addEventListener("change", handleSort);
        renderProducts();
    }

    /* ===========================
       ✅ LOGIN / REGISTER
    ============================ */
    const regForm = document.getElementById("RegForm");
    const loginForm = document.getElementById("LoginForm");
    const Indicator = document.getElementById("Indicator");

    if (regForm && loginForm) {
        window.register = () => {
            regForm.style.transform = "translateX(0)";
            loginForm.style.transform = "translateX(-300px)";
            Indicator.style.transform = "translateX(100px)";
        };

        window.login = () => {
            regForm.style.transform = "translateX(300px)";
            loginForm.style.transform = "translateX(0)";
            Indicator.style.transform = "translateX(0)";
        };

        regForm.addEventListener("submit", function (e) {
            e.preventDefault();
            let username = document.getElementById("reg-username").value;
            let email = document.getElementById("reg-email").value;
            let password = document.getElementById("reg-password").value;

            if (localStorage.getItem(username)) {
                document.getElementById("reg-error").style.display = "block";
                document.getElementById("reg-success").style.display = "none";
            } else {
                localStorage.setItem(username, JSON.stringify({ email, password }));
                document.getElementById("reg-success").style.display = "block";
                document.getElementById("reg-error").style.display = "none";
            }
        });

        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            let username = document.getElementById("login-username").value;
            let password = document.getElementById("login-password").value;

            let userData = JSON.parse(localStorage.getItem(username));
            if (userData && userData.password === password) {
                document.getElementById("login-success").style.display = "block";
                document.getElementById("login-error").style.display = "none";
            } else {
                document.getElementById("login-error").style.display = "block";
                document.getElementById("login-success").style.display = "none";
            }
        });
    }

    /* ===========================
       ✅ ADD TO CART + MINI CART POPUP
    ============================ */
    const ProductImg = document.getElementById("ProductImg");
    const SmallImg = document.querySelectorAll(".small-img");
    if (ProductImg && SmallImg.length > 0) {
        SmallImg.forEach(img => img.addEventListener("click", () => {
            ProductImg.src = img.src;
        }));
    }

    const addToCartBtn = document.getElementById("addToCartBtn");
    const miniCartPopup = document.getElementById("miniCartPopup");
    const closeMiniCart = document.querySelector(".close-mini-cart");

    if (addToCartBtn) {
        addToCartBtn.addEventListener("click", () => {
            const quantity = parseInt(document.getElementById("quantity").value) || 1;
            const product = {
                name: "Xylys Swiss Chronograph",
                price: 47000,
                image: ProductImg ? ProductImg.src : "",
                quantity: quantity
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existing = cart.find(item => item.name === product.name);
            if (existing) {
                existing.quantity += quantity;
            } else {
                cart.push(product);
            }
            localStorage.setItem("cart", JSON.stringify(cart));

            document.getElementById("miniCartImage").src = product.image;
            document.getElementById("miniCartName").textContent = product.name;
            document.getElementById("miniCartPrice").textContent = "₹" + product.price.toLocaleString();
            document.getElementById("miniCartQuantity").textContent = `Qty: ${quantity}`;
            miniCartPopup.style.display = "block";

            setTimeout(() => miniCartPopup.style.display = "none", 4000);
        });
    }
    if (closeMiniCart) {
        closeMiniCart.addEventListener("click", () => {
            miniCartPopup.style.display = "none";
        });
    }

    /* ===========================
       ✅ CART PAGE RENDER FROM LOCALSTORAGE
    ============================ */
    const cartPage = document.querySelector('.cart-page');
    if (cartPage) {
        function renderCart() {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const cartTable = cartPage.querySelector('table');
            const totalPriceContainer = document.querySelector('.total-price');

            if (cart.length === 0) {
                cartTable.innerHTML = `<tr><td colspan="3" style="text-align:center; padding:20px; font-size:18px; color:#555;">Your cart is empty.</td></tr>`;
                totalPriceContainer.style.display = "none";
                return;
            }

            let rows = `
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Subtotal</th>
                </tr>`;
            let subtotal = 0;

            cart.forEach(item => {
                const lineTotal = item.price * item.quantity;
                subtotal += lineTotal;
                rows += `
                    <tr>
                        <td>
                            <div class="cart-info">
                                <img src="${item.image}">
                                <div>
                                    <p>${item.name}</p>
                                    <small>Price: ₹${item.price.toLocaleString()}</small><br>
                                    <a href="#" class="remove-item" data-name="${item.name}">Remove</a>
                                </div>
                            </div>
                        </td>
                        <td><input type="number" value="${item.quantity}" min="1" class="update-qty" data-name="${item.name}"></td>
                        <td>₹${lineTotal.toLocaleString()}</td>
                    </tr>`;
            });

            cartTable.innerHTML = rows;
            totalPriceContainer.style.display = "block";
            totalPriceContainer.querySelector('table').innerHTML = `
                <tr><td>Subtotal</td><td>₹${subtotal.toLocaleString()}</td></tr>
                <tr><td>Tax</td><td>(INCLUDED)</td></tr>
                <tr><td>Total</td><td>₹${subtotal.toLocaleString()}</td></tr>`;

            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    const name = this.dataset.name;
                    let cart = JSON.parse(localStorage.getItem("cart")) || [];
                    cart = cart.filter(i => i.name !== name);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    renderCart();
                });
            });

            document.querySelectorAll('.update-qty').forEach(input => {
                input.addEventListener('change', function () {
                    const name = this.dataset.name;
                    let cart = JSON.parse(localStorage.getItem("cart")) || [];
                    const item = cart.find(i => i.name === name);
                    if (item) {
                        item.quantity = parseInt(this.value) || 1;
                    }
                    localStorage.setItem("cart", JSON.stringify(cart));
                    renderCart();
                });
            });
        }
        renderCart();
    }
});
