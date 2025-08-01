// البيانات الأساسية المحسنة للتطبيق
const appData = {
    currentUser: null,
    cartItems: [],
    favorites: [],
    orders: [
        {
            id: 'ORD-1001',
            date: '2023-05-15',
            status: 'completed',
            products: [
                { id: 101, name: "سماعات لاسلكية", price: 75000, image: "assets/products/wireless-headphones.jpg", quantity: 1 },
                { id: 102, name: "شاحن سريع", price: 25000, image: "assets/products/fast-charger.jpg", quantity: 2 }
            ],
            total: 125000,
            deliveryAddress: "بغداد، المنصور، شارع 14 رمضان"
        },
        {
            id: 'ORD-1002',
            date: '2023-06-20',
            status: 'processing',
            products: [
                { id: 201, name: "تيشيرت رجالي", price: 35000, image: "assets/products/men-tshirt.jpg", quantity: 3 }
            ],
            total: 105000,
            deliveryAddress: "أربيل، شارع 60 متر"
        }
    ],
    notifications: [
        {
            id: 1,
            title: "تم شحن طلبك",
            message: "تم شحن طلبك رقم ORD-1002 وسيصل خلال 2-3 أيام عمل",
            time: "2023-06-21 10:30",
            read: false
        },
        {
            id: 2,
            title: "عرض خاص",
            message: "خصم 20% على جميع منتجات الإلكترونيات لمدة 3 أيام فقط",
            time: "2023-06-18 15:45",
            read: true
        }
    ],
    stores: [
        {
            id: 1,
            name: "متجر الإلكترونيات",
            description: "أحدث الأجهزة الإلكترونية بأسعار تنافسية",
            logo: "assets/stores/electronics-store.jpg",
            rating: 4.2,
            products: [
                {
                    id: 101,
                    name: "سماعات لاسلكية",
                    price: 75000,
                    image: "assets/products/wireless-headphones.jpg",
                    description: "سماعات لاسلكية بجودة عالية مع ميكروفون",
                    rating: 4,
                    stock: 10,
                    category: "electronics"
                },
                {
                    id: 102,
                    name: "شاحن سريع",
                    price: 25000,
                    image: "assets/products/fast-charger.jpg",
                    description: "شاحن سريع 30 واط متوافق مع جميع الأجهزة",
                    rating: 3.5,
                    stock: 15,
                    category: "electronics"
                }
            ]
        },
        {
            id: 2,
            name: "متجر الملابس",
            description: "أحدث صيحات الموضة للرجال والنساء",
            logo: "assets/stores/clothing-store.jpg",
            rating: 4.5,
            products: [
                {
                    id: 201,
                    name: "تيشيرت رجالي",
                    price: 35000,
                    image: "assets/products/men-tshirt.jpg",
                    description: "تيشيرت قطن 100% بألوان متعددة",
                    rating: 4.5,
                    stock: 20,
                    category: "clothing"
                },
                {
                    id: 202,
                    name: "حقيبة نسائية",
                    price: 85000,
                    image: "assets/products/women-bag.jpg",
                    description: "حقيبة يد نسائية عالية الجودة",
                    rating: 4.3,
                    stock: 8,
                    category: "clothing"
                }
            ]
        }
    ],
    featuredProducts: [
        {
            id: 301,
            name: "هاتف ذكي",
            price: 450000,
            image: "assets/products/smartphone.jpg",
            rating: 4.8,
            storeId: 1,
            category: "electronics"
        },
        {
            id: 302,
            name: "حقيبة نسائية",
            price: 85000,
            image: "assets/products/women-bag.jpg",
            rating: 4.3,
            storeId: 2,
            category: "clothing"
        },
        {
            id: 303,
            name: "ساعة ذكية",
            price: 120000,
            image: "assets/products/smartwatch.jpg",
            rating: 4.6,
            storeId: 1,
            category: "electronics"
        },
        {
            id: 304,
            name: "أحذية رياضية",
            price: 65000,
            image: "assets/products/sneakers.jpg",
            rating: 4.2,
            storeId: 2,
            category: "clothing"
        }
    ],
    categories: [
        {
            id: "electronics",
            name: "إلكترونيات",
            icon: "fas fa-mobile-alt",
            color: "#3B82F6"
        },
        {
            id: "clothing",
            name: "ملابس",
            icon: "fas fa-tshirt",
            color: "#7C3AED"
        },
        {
            id: "home",
            name: "أثاث منزل",
            icon: "fas fa-home",
            color: "#10B981"
        },
        {
            id: "beauty",
            name: "الجمال",
            icon: "fas fa-spa",
            color: "#EC4899"
        }
    ],
    darkMode: false
};

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    const appContainer = document.getElementById('app-container');
    const progressBar = document.getElementById('progress-bar');
    
    // محاكاة تقدم التحميل مع تحسينات
    let progress = 0;
    const loadingMessages = [
        "جاري تحميل البيانات...",
        "جاري إعداد المتاجر...",
        "جاري تحميل المنتجات...",
        "جاهز تقريباً!"
    ];
    let messageIndex = 0;
    const loadingText = document.querySelector('.loading-text');
    const loadingMessage = document.querySelector('.loading-message');
    
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 10 + 5;
        if (progress > 100) progress = 100;
        progressBar.style.width = `${progress}%`;
        
        // تغيير الرسالة بناءً على تقدم التحميل
        if (progress >= 25 && messageIndex === 0) {
            loadingText.textContent = loadingMessages[0];
            loadingMessage.textContent = "نتأكد من توفر أحدث المنتجات لك";
            messageIndex++;
        } else if (progress >= 50 && messageIndex === 1) {
            loadingText.textContent = loadingMessages[1];
            loadingMessage.textContent = "نختار لك أفضل العروض والتخفيضات";
            messageIndex++;
        } else if (progress >= 75 && messageIndex === 2) {
            loadingText.textContent = loadingMessages[2];
            loadingMessage.textContent = "بضع ثوانٍ وسنكون جاهزين!";
            messageIndex++;
        } else if (progress >= 95 && messageIndex === 3) {
            loadingText.textContent = loadingMessages[3];
            loadingMessage.textContent = "مرحباً بك في Rahimli!";
            messageIndex++;
        }
        
        if (progress >= 100) {
            clearInterval(loadingInterval);
            hideSplashScreen();
        }
    }, 300);

    function hideSplashScreen() {
        splashScreen.style.opacity = '0';
        
        setTimeout(() => {
            splashScreen.style.display = 'none';
            appContainer.style.display = 'flex';
            setTimeout(() => {
                appContainer.style.opacity = '1';
                initializeApp();
            }, 50);
        }, 500);
    }

    function initializeApp() {
        // تسجيل Service Worker
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful');
                    registration.update();
                })
                .catch(err => console.error('Service Worker registration failed:', err));
        }

        // تحميل البيانات المحفوظة
        loadData();
        
        // تحميل الصفحة الرئيسية
        loadHomePage();
        
        // إعداد معالج الأحداث
        setupEventListeners();
        
        // إظهار زر الإجراء العائم بعد تأخير بسيط
        setTimeout(() => {
            const fab = document.getElementById('fab');
            fab.style.display = 'flex';
            setTimeout(() => {
                fab.classList.add('animate__pulse');
            }, 1000);
        }, 2000);
    }

    function loadHomePage() {
        const appContent = document.getElementById('app-content');
        appContent.innerHTML = `
            <div class="home-page animate__animated animate__fadeIn">
                <!-- شريط الإعلانات المتحرك -->
                <div class="hero-slider">
                    <div class="slide active">
                        <img src="assets/banners/Picsart_25-08-01_04-16-41-887.jpg" alt="عروض خاصة" class="animate__animated animate__fadeIn">
                    </div>
                    <div class="slide">
                        <img src="assets/banners/Picsart_25-08-01_04-10-51-237.jpg" alt="خصومات كبيرة" class="animate__animated animate__fadeIn">
                    </div>
                    <div class="slide">
                        <img src="assets/banners/Picsart_25-08-01_04-19-14-468.jpg" alt="منتجات جديدة" class="animate__animated animate__fadeIn">
                    </div>
                    <div class="slider-indicators">
                        <span class="active"></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <!-- الأقسام الرئيسية مع تأثيرات -->
                <div class="categories-grid">
                    ${appData.categories.map(category => `
                        <a href="#" class="category-card animate__animated animate__fadeInUp" data-category="${category.id}" style="animation-delay: ${0.1 * appData.categories.indexOf(category)}s">
                            <div class="category-icon" style="background-color: ${category.color}20; color: ${category.color}">
                                <i class="${category.icon}"></i>
                            </div>
                            <span class="category-name">${category.name}</span>
                        </a>
                    `).join('')}
                </div>

                <!-- المنتجات المميزة -->
                <div class="section-header">
                    <h2 class="section-title">المنتجات المميزة</h2>
                    <a href="#" class="view-all">عرض الكل</a>
                </div>
                <div class="products-grid" id="featured-products">
                    ${appData.featuredProducts.map((product, index) => `
                        <div class="product-card animate__animated animate__fadeIn" data-product-id="${product.id}" style="animation-delay: ${0.1 * index}s">
                            <img src="${product.image}" alt="${product.name}" class="product-image">
                            <div class="product-info">
                                <h3 class="product-title">${product.name}</h3>
                                <p class="product-price">${product.price.toLocaleString()} IQD</p>
                                <div class="product-rating">
                                    <span>${product.rating}</span>
                                    ${renderRatingStars(product.rating)}
                                </div>
                                <button class="add-to-cart">
                                    <i class="fas fa-cart-plus"></i>
                                    أضف للسلة
                                </button>
                                <button class="btn-outline add-to-favorites" style="margin-top: 8px; width: 100%; font-size: 0.8rem; padding: 5px;">
                                    <i class="far fa-heart"></i>
                                    المفضلة
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <!-- المتاجر المميزة -->
                <div class="section-header">
                    <h2 class="section-title">المتاجر المميزة</h2>
                    <a href="#" class="view-all">عرض الكل</a>
                </div>
                <div class="featured-stores">
                    ${appData.stores.slice(0, 3).map((store, index) => `
                        <div class="store-card animate__animated animate__fadeIn" data-store-id="${store.id}" style="animation-delay: ${0.1 * index}s">
                            <img src="${store.logo}" alt="${store.name}" class="store-logo">
                            <div class="store-info">
                                <h3>${store.name}</h3>
                                <p>${store.description}</p>
                                <div class="store-rating">
                                    <span>${store.rating}</span>
                                    ${renderRatingStars(store.rating)}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // بدء تشغيل السلايدر
        startSlider();
        
        // إضافة تأثيرات للبطاقات عند التمرير
        setupScrollAnimations();
    }

    // عرض تقييم النجوم
    function renderRatingStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        return stars;
    }

    // تشغيل سلايدر الإعلانات
    function startSlider() {
        const slides = document.querySelectorAll('.slide');
        const indicators = document.querySelectorAll('.slider-indicators span');
        let currentSlide = 0;

        const sliderInterval = setInterval(() => {
            slides[currentSlide].classList.remove('active');
            indicators[currentSlide].classList.remove('active');
            
            currentSlide = (currentSlide + 1) % slides.length;
            
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
        }, 5000);

        // إيقاف السلايدر عند تغيير الصفحة
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                clearInterval(sliderInterval);
            });
        });
    }

    // إعداد معالج الأحداث
    function setupEventListeners() {
        // القائمة الجانبية
        document.getElementById('menu-button').addEventListener('click', toggleSideMenu);
        document.getElementById('close-menu').addEventListener('click', toggleSideMenu);
        
        // البحث
        document.getElementById('search-button').addEventListener('click', toggleSearchBar);
        document.getElementById('close-search').addEventListener('click', toggleSearchBar);
        
        // التنقل السفلي
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const page = item.getAttribute('data-page');
                navigateTo(page);
                
                document.querySelectorAll('.nav-item').forEach(navItem => {
                    navItem.classList.remove('active');
                });
                item.classList.add('active');
            });
        });
        
        // النوافذ المنبثقة
        document.getElementById('login-btn').addEventListener('click', () => {
            showModal('login');
        });
        
        document.getElementById('close-login').addEventListener('click', () => {
            hideModal('login');
        });
        
        document.getElementById('close-privacy').addEventListener('click', () => {
            hideModal('privacy');
        });
        
        document.getElementById('close-terms').addEventListener('click', () => {
            hideModal('terms');
        });
        
        document.getElementById('close-settings').addEventListener('click', () => {
            hideModal('settings');
        });
        
        document.getElementById('close-help').addEventListener('click', () => {
            hideModal('help');
        });
        
        // تبديل علامات التبويب في النافذة المنبثقة
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabId = tab.getAttribute('data-tab');
                switchAuthTab(tabId);
            });
        });
        
        // إظهار/إخفاء كلمة المرور
        document.querySelectorAll('.toggle-password').forEach(btn => {
            btn.addEventListener('click', function() {
                togglePasswordVisibility(this);
            });
        });
        
        // قوة كلمة المرور
        document.getElementById('register-password')?.addEventListener('input', function() {
            updatePasswordStrength(this.value);
        });
        
        // تأثيرات الريبل
        document.addEventListener('click', function(e) {
            if (e.target.closest('.btn-primary, .social-btn, .store-card, .product-card')) {
                createRippleEffect(e);
            }
        });
        
        // إضافة إلى السلة
        document.addEventListener('click', function(e) {
            if (e.target.closest('.add-to-cart')) {
                const productCard = e.target.closest('.product-card');
                const productId = parseInt(productCard.getAttribute('data-product-id'));
                addToCart(productId);
            }
        });

        // إضافة إلى المفضلة
        document.addEventListener('click', function(e) {
            if (e.target.closest('.add-to-favorites')) {
                const productCard = e.target.closest('.product-card');
                const productId = parseInt(productCard.getAttribute('data-product-id'));
                addToFavorites(productId);
            }
        });

        // زر العودة
        document.getElementById('back-button').addEventListener('click', () => {
            navigateTo('home');
        });

        // زر الإجراء العائم
        document.getElementById('fab').addEventListener('click', () => {
            showToast('هذا زر للإجراءات السريعة', 'info');
        });
        
        // الوضع الداكن
        document.getElementById('dark-mode-toggle').addEventListener('change', function() {
            toggleDarkMode(this.checked);
        });
        
        // تسجيل الدخول
        document.getElementById('login-form').addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
        
        // تسجيل حساب جديد
        document.getElementById('register-form').addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegister();
        });
        
        // تسجيل الخروج
        document.getElementById('logout-btn').addEventListener('click', logoutUser);
        
        // الشروط والأحكام
        document.querySelectorAll('[data-page="terms"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showModal('terms');
            });
        });
        
        // سياسة الخصوصية
        document.querySelectorAll('[data-page="privacy"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showModal('privacy');
            });
        });
        
        // الإعدادات
        document.querySelectorAll('[data-page="settings"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showModal('settings');
            });
        });
        
        // المساعدة
        document.querySelectorAll('[data-page="help"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showModal('help');
            });
        });
        
        // الموافقة على الشروط
        document.getElementById('agree-terms-btn').addEventListener('click', function(e) {
            e.preventDefault();
            hideModal('terms');
            showToast('تمت الموافقة على الشروط والأحكام', 'success');
        });
        
        // الموافقة على الخصوصية
        document.getElementById('agree-privacy').addEventListener('click', function(e) {
            e.preventDefault();
            hideModal('privacy');
            showToast('تمت الموافقة على سياسة الخصوصية', 'success');
        });
        
        // حفظ الإعدادات
        document.getElementById('save-settings').addEventListener('click', function(e) {
            e.preventDefault();
            hideModal('settings');
            showToast('تم حفظ الإعدادات بنجاح', 'success');
        });
        
        // أسئلة المساعدة
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('question')) {
                const answer = e.target.nextElementSibling;
                e.target.classList.toggle('active');
                answer.classList.toggle('show');
            }
        });
        
        // تصنيفات المساعدة
        document.querySelectorAll('.help-category').forEach(category => {
            category.addEventListener('click', function() {
                const categoryId = this.getAttribute('data-category');
                switchHelpCategory(categoryId);
            });
        });
    }

    // تبديل القائمة الجانبية
    function toggleSideMenu() {
        const sideMenu = document.getElementById('side-menu');
        sideMenu.style.right = sideMenu.style.right === '0px' ? '-100%' : '0';
    }

    // تبديل شريط البحث
    function toggleSearchBar() {
        const searchBar = document.getElementById('search-bar');
        const headerContent = document.querySelector('.header-content');
        
        if (searchBar.style.display === 'block') {
            searchBar.style.display = 'none';
            headerContent.style.display = 'flex';
        } else {
            searchBar.style.display = 'block';
            headerContent.style.display = 'none';
            document.getElementById('search-input').focus();
        }
    }

    // التنقل بين الصفحات
    function navigateTo(page) {
        const appTitle = document.getElementById('app-title');
        const backButton = document.getElementById('back-button');
        
        switch(page) {
            case 'home':
                appTitle.textContent = 'Rahimli';
                backButton.style.display = 'none';
                loadHomePage();
                break;
            case 'stores':
                appTitle.textContent = 'المتاجر';
                backButton.style.display = 'block';
                loadStoresPage();
                break;
            case 'cart':
                appTitle.textContent = 'سلة التسوق';
                backButton.style.display = 'block';
                loadCartPage();
                break;
            case 'account':
                appTitle.textContent = 'حسابي';
                backButton.style.display = 'block';
                loadAccountPage();
                break;
            case 'favorites':
                appTitle.textContent = 'المفضلة';
                backButton.style.display = 'block';
                loadFavoritesPage();
                break;
            case 'orders':
                appTitle.textContent = 'سجل الطلبات';
                backButton.style.display = 'block';
                loadOrdersPage();
                break;
            case 'notifications':
                appTitle.textContent = 'الإشعارات';
                backButton.style.display = 'block';
                loadNotificationsPage();
                break;
            case 'settings':
                showModal('settings');
                break;
            case 'help':
                showModal('help');
                break;
            case 'terms':
                showModal('terms');
                break;
            case 'privacy':
                showModal('privacy');
                break;
        }
    }

    // تحميل صفحة المتاجر
    function loadStoresPage() {
        const appContent = document.getElementById('app-content');
        appContent.innerHTML = `
            <div class="stores-page animate__animated animate__fadeIn">
                <div class="search-container">
                    <input type="text" placeholder="ابحث عن متجر..." id="store-search">
                    <i class="fas fa-search"></i>
                </div>
                
                <div class="section-header">
                    <h2 class="section-title">جميع المتاجر</h2>
                </div>
                
                <div class="stores-list">
                    ${appData.stores.map(store => `
                        <div class="store-card" data-store-id="${store.id}">
                            <img src="${store.logo}" alt="${store.name}" class="store-logo">
                            <div class="store-info">
                                <h3>${store.name}</h3>
                                <p>${store.description}</p>
                                <div class="store-rating">
                                    <span>${store.rating}</span>
                                    ${renderRatingStars(store.rating)}
                                </div>
                            </div>
                            <button class="btn-outline visit-store">
                                <i class="fas fa-store"></i> زيارة المتجر
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        // إعداد معالج البحث
        document.getElementById('store-search').addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            document.querySelectorAll('.store-card').forEach(card => {
                const storeName = card.querySelector('h3').textContent.toLowerCase();
                card.style.display = storeName.includes(searchTerm) ? 'flex' : 'none';
            });
        });

        // إعداد معالج زيارة المتجر
        document.querySelectorAll('.visit-store').forEach(btn => {
            btn.addEventListener('click', function() {
                const storeId = this.closest('.store-card').getAttribute('data-store-id');
                showToast(`سيتم فتح متجر ${storeId}`, 'info');
            });
        });
    }

    // تحميل صفحة السلة
    function loadCartPage() {
        const appContent = document.getElementById('app-content');
        
        if (appData.cartItems.length === 0) {
            appContent.innerHTML = `
                <div class="empty-cart animate__animated animate__fadeIn">
                    <div class="empty-icon">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <h3>سلة التسوق فارغة</h3>
                    <p>لم تقم بإضافة أي منتجات إلى سلة التسوق بعد</p>
                    <button class="btn-primary" id="continue-shopping">
                        <i class="fas fa-arrow-left"></i>
                        <span>مواصلة التسوق</span>
                    </button>
                </div>
            `;
            
            document.getElementById('continue-shopping').addEventListener('click', () => {
                navigateTo('home');
            });
        } else {
            appContent.innerHTML = `
                <div class="cart-page animate__animated animate__fadeIn">
                    <div class="cart-items">
                        ${appData.cartItems.map(item => `
                            <div class="cart-item" data-product-id="${item.id}">
                                <img src="${item.image}" alt="${item.name}" class="item-image">
                                <div class="item-info">
                                    <h3 class="item-title">${item.name}</h3>
                                    <p class="item-price">${item.price.toLocaleString()} IQD</p>
                                    <div class="item-quantity">
                                        <button class="quantity-btn decrease"><i class="fas fa-minus"></i></button>
                                        <span class="quantity">${item.quantity}</span>
                                        <button class="quantity-btn increase"><i class="fas fa-plus"></i></button>
                                    </div>
                                </div>
                                <button class="remove-item"><i class="fas fa-trash"></i></button>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="cart-summary">
                        <div class="summary-row">
                            <span>المجموع الفرعي</span>
                            <span>${calculateSubtotal().toLocaleString()} IQD</span>
                        </div>
                        <div class="summary-row">
                            <span>التوصيل</span>
                            <span>5,000 IQD</span>
                        </div>
                        <div class="summary-row total">
                            <span>المجموع الكلي</span>
                            <span>${(calculateSubtotal() + 5000).toLocaleString()} IQD</span>
                        </div>
                        <button class="btn-primary checkout-btn">
                            <span>إتمام الشراء</span>
                            <i class="fas fa-arrow-left"></i>
                        </button>
                    </div>
                </div>
            `;

            // إعداد معالجات الأحداث للكمية
            document.querySelectorAll('.decrease').forEach(btn => {
                btn.addEventListener('click', function() {
                    updateQuantity(this, -1);
                });
            });

            document.querySelectorAll('.increase').forEach(btn => {
                btn.addEventListener('click', function() {
                    updateQuantity(this, 1);
                });
            });

            // إعداد معالج إزالة العنصر
            document.querySelectorAll('.remove-item').forEach(btn => {
                btn.addEventListener('click', function() {
                    removeItem(this);
                });
            });

            // إعداد معالج إتمام الشراء
            document.querySelector('.checkout-btn').addEventListener('click', () => {
                showToast('سيتم توجيهك إلى صفحة الدفع', 'info');
            });
        }
    }

    // تحميل صفحة الحساب
    function loadAccountPage() {
        const appContent = document.getElementById('app-content');
        
        if (appData.currentUser) {
            appContent.innerHTML = `
                <div class="account-page animate__animated animate__fadeIn">
                    <div class="user-profile-card">
                        <img src="${appData.currentUser.avatar || 'assets/user-avatar.jpg'}" alt="صورة المستخدم" class="user-avatar-large">
                        <h3>${appData.currentUser.name}</h3>
                        <p>${appData.currentUser.email || 'لا يوجد بريد إلكتروني'}</p>
                        <p>${appData.currentUser.phone}</p>
                    </div>
                    
                    <div class="account-actions">
                        <a href="#" class="account-action" data-page="orders">
                            <i class="fas fa-history"></i>
                            <span>سجل الطلبات</span>
                            <i class="fas fa-arrow-left"></i>
                        </a>
                        <a href="#" class="account-action" data-page="favorites">
                            <i class="fas fa-heart"></i>
                            <span>المفضلة</span>
                            <i class="fas fa-arrow-left"></i>
                        </a>
                        <a href="#" class="account-action">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>عناوين التوصيل</span>
                            <i class="fas fa-arrow-left"></i>
                        </a>
                        <a href="#" class="account-action" data-page="settings">
                            <i class="fas fa-cog"></i>
                            <span>الإعدادات</span>
                            <i class="fas fa-arrow-left"></i>
                        </a>
                        <button class="account-action" id="logout-action">
                            <i class="fas fa-sign-out-alt"></i>
                            <span>تسجيل الخروج</span>
                            <i class="fas fa-arrow-left"></i>
                        </button>
                    </div>
                </div>
            `;

            document.getElementById('logout-action').addEventListener('click', () => {
                logoutUser();
            });
            
            // إعداد معالجات الأحداث لروابط الحساب
            document.querySelectorAll('.account-action[data-page]').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const page = this.getAttribute('data-page');
                    navigateTo(page);
                });
            });
        } else {
            appContent.innerHTML = `
                <div class="auth-required animate__animated animate__fadeIn">
                    <div class="auth-icon">
                        <i class="fas fa-user-lock"></i>
                    </div>
                    <h3>يجب تسجيل الدخول</h3>
                    <p>لتتمكن من الوصول إلى صفحة حسابك، يرجى تسجيل الدخول أولاً</p>
                    <button class="btn-primary" id="login-redirect">
                        <span>تسجيل الدخول</span>
                        <i class="fas fa-arrow-left"></i>
                    </button>
                </div>
            `;

            document.getElementById('login-redirect').addEventListener('click', () => {
                showModal('login');
            });
        }
    }

    // تحميل صفحة المفضلة
    function loadFavoritesPage() {
        const appContent = document.getElementById('app-content');
        
        if (appData.favorites.length === 0) {
            appContent.innerHTML = `
                <div class="empty-favorites animate__animated animate__fadeIn">
                    <div class="empty-favorites-icon">
                        <i class="fas fa-heart"></i>
                    </div>
                    <h3>لا توجد منتجات في المفضلة</h3>
                    <p>يمكنك إضافة منتجات إلى المفضلة بالنقر على زر القلب في صفحة المنتجات</p>
                    <button class="btn-primary" id="continue-shopping">
                        <span>تصفح المتاجر</span>
                        <i class="fas fa-arrow-left"></i>
                    </button>
                </div>
            `;
            
            document.getElementById('continue-shopping').addEventListener('click', () => {
                navigateTo('home');
            });
        } else {
            appContent.innerHTML = `
                <div class="favorites-page animate__animated animate__fadeIn">
                    <div class="section-header">
                        <h2 class="section-title">المنتجات المفضلة</h2>
                    </div>
                    
                    <div class="products-grid">
                        ${appData.favorites.map(productId => {
                            const product = [...appData.featuredProducts, ...appData.stores.flatMap(store => store.products)]
                                .find(p => p.id === productId);
                            if (!product) return '';
                            
                            return `
                                <div class="product-card" data-product-id="${product.id}">
                                    <img src="${product.image}" alt="${product.name}" class="product-image">
                                    <div class="product-info">
                                        <h3 class="product-title">${product.name}</h3>
                                        <p class="product-price">${product.price.toLocaleString()} IQD</p>
                                        <div class="product-rating">
                                            <span>${product.rating}</span>
                                            ${renderRatingStars(product.rating)}
                                        </div>
                                        <button class="add-to-cart">
                                            <i class="fas fa-cart-plus"></i>
                                            أضف للسلة
                                        </button>
                                        <button class="btn-outline remove-from-favorites" style="margin-top: 8px; width: 100%; font-size: 0.8rem; padding: 5px;">
                                            <i class="fas fa-heart"></i>
                                            إزالة من المفضلة
                                        </button>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
            
            // إعداد معالج إضافة إلى السلة
            document.querySelectorAll('.add-to-cart').forEach(btn => {
                btn.addEventListener('click', function() {
                    const productCard = this.closest('.product-card');
                    const productId = parseInt(productCard.getAttribute('data-product-id'));
                    addToCart(productId);
                });
            });
            
            // إعداد معالج إزالة من المفضلة
            document.querySelectorAll('.remove-from-favorites').forEach(btn => {
                btn.addEventListener('click', function() {
                    const productCard = this.closest('.product-card');
                    const productId = parseInt(productCard.getAttribute('data-product-id'));
                    removeFromFavorites(productId);
                });
            });
        }
    }

    // تحميل صفحة الطلبات
    function loadOrdersPage() {
        const appContent = document.getElementById('app-content');
        
        if (appData.orders.length === 0) {
            appContent.innerHTML = `
                <div class="empty-orders animate__animated animate__fadeIn">
                    <div class="empty-orders-icon">
                        <i class="fas fa-shopping-bag"></i>
                    </div>
                    <h3>لا توجد طلبات سابقة</h3>
                    <p>عندما تقوم بعمل طلب، ستظهر هنا تفاصيل الطلب ومتابعة الشحن</p>
                    <button class="btn-primary" id="continue-shopping">
                        <span>تصفح المتاجر</span>
                        <i class="fas fa-arrow-left"></i>
                    </button>
                </div>
            `;
            
            document.getElementById('continue-shopping').addEventListener('click', () => {
                navigateTo('home');
            });
        } else {
            appContent.innerHTML = `
                <div class="orders-page animate__animated animate__fadeIn">
                    <div class="section-header">
                        <h2 class="section-title">سجل الطلبات</h2>
                    </div>
                    
                    ${appData.orders.map(order => `
                        <div class="order-card">
                            <div class="order-header">
                                <span class="order-id">${order.id}</span>
                                <span class="order-date">${formatDate(order.date)}</span>
                            </div>
                            <div class="order-status ${getStatusClass(order.status)}">
                                ${getStatusText(order.status)}
                            </div>
                            <div class="order-products">
                                ${order.products.map(product => `
                                    <img src="${product.image}" alt="${product.name}" class="order-product-image" title="${product.name} - ${product.quantity}x">
                                `).join('')}
                            </div>
                            <div class="order-summary">
                                <span class="order-total">${order.total.toLocaleString()} IQD</span>
                                <div class="order-actions">
                                    <button class="btn-outline">
                                        <i class="fas fa-eye"></i>
                                        التفاصيل
                                    </button>
                                    <button class="btn-outline">
                                        <i class="fas fa-redo"></i>
                                        إعادة طلب
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    // تحميل صفحة الإشعارات
    function loadNotificationsPage() {
        const appContent = document.getElementById('app-content');
        
        if (appData.notifications.length === 0) {
            appContent.innerHTML = `
                <div class="empty-notifications animate__animated animate__fadeIn">
                    <div class="empty-notifications-icon">
                        <i class="fas fa-bell"></i>
                    </div>
                    <h3>لا توجد إشعارات</h3>
                    <p>عندما تتوفر إشعارات جديدة، ستظهر هنا</p>
                    <button class="btn-primary" id="continue-shopping">
                        <span>تصفح المتاجر</span>
                        <i class="fas fa-arrow-left"></i>
                    </button>
                </div>
            `;
            
            document.getElementById('continue-shopping').addEventListener('click', () => {
                navigateTo('home');
            });
        } else {
            appContent.innerHTML = `
                <div class="notifications-page animate__animated animate__fadeIn">
                    <div class="section-header">
                        <h2 class="section-title">الإشعارات</h2>
                        <button class="btn-outline" id="mark-all-read">
                            <i class="fas fa-check"></i>
                            تعليم الكل كمقروء
                        </button>
                    </div>
                    
                    ${appData.notifications.map(notification => `
                        <div class="notification-card ${notification.read ? '' : 'unread'}">
                            <div class="notification-header">
                                <h3 class="notification-title">${notification.title}</h3>
                                <span class="notification-time">${formatDateTime(notification.time)}</span>
                            </div>
                            <p class="notification-message">${notification.message}</p>
                            <div class="notification-actions">
                                <button class="btn-outline">
                                    <i class="fas fa-eye"></i>
                                    عرض التفاصيل
                                </button>
                                <button class="btn-outline delete-notification" data-notification-id="${notification.id}">
                                    <i class="fas fa-trash"></i>
                                    حذف
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            // إعداد معالج تعليم الكل كمقروء
            document.getElementById('mark-all-read')?.addEventListener('click', () => {
                appData.notifications.forEach(notification => notification.read = true);
                saveData();
                loadNotificationsPage();
                showToast('تم تعليم جميع الإشعارات كمقروءة', 'success');
            });
            
            // إعداد معالج حذف الإشعار
            document.querySelectorAll('.delete-notification').forEach(btn => {
                btn.addEventListener('click', function() {
                    const notificationId = parseInt(this.getAttribute('data-notification-id'));
                    deleteNotification(notificationId);
                });
            });
        }
    }

    // حساب المجموع الفرعي
    function calculateSubtotal() {
        return appData.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // تحديث كمية المنتج
    function updateQuantity(button, change) {
        const quantityElement = button.parentElement.querySelector('.quantity');
        const productId = parseInt(button.closest('.cart-item').getAttribute('data-product-id'));
        const cartItem = appData.cartItems.find(item => item.id === productId);
        
        if (cartItem) {
            const newQuantity = cartItem.quantity + change;
            
            if (newQuantity < 1) {
                removeItem(button);
                return;
            }
            
            cartItem.quantity = newQuantity;
            quantityElement.textContent = newQuantity;
            
            saveData();
            updateCartCount();
            updateCartTotal();
        }
    }

    // تحديث المجموع الكلي للسلة
    function updateCartTotal() {
        const subtotalElement = document.querySelector('.summary-row:first-child span:last-child');
        const totalElement = document.querySelector('.summary-row.total span:last-child');
        
        if (subtotalElement && totalElement) {
            subtotalElement.textContent = calculateSubtotal().toLocaleString() + ' IQD';
            totalElement.textContent = (calculateSubtotal() + 5000).toLocaleString() + ' IQD';
        }
    }

    // إزالة منتج من السلة
    function removeItem(button) {
        const productId = parseInt(button.closest('.cart-item').getAttribute('data-product-id'));
        appData.cartItems = appData.cartItems.filter(item => item.id !== productId);
        
        saveData();
        updateCartCount();
        loadCartPage();
        
        showToast('تم إزالة المنتج من السلة', 'warning');
    }

    // تسجيل دخول المستخدم
    function handleLogin() {
        const phone = document.getElementById('login-phone').value;
        const password = document.getElementById('login-password').value;
        
        // محاكاة تسجيل الدخول
        if (phone && password) {
            appData.currentUser = {
                name: "محمد أحمد",
                phone: phone,
                email: "mohamed@example.com",
                avatar: "assets/user-avatar.jpg"
            };
            
            saveData();
            updateUserProfile();
            hideModal('login');
            showToast('تم تسجيل الدخول بنجاح', 'success');
            
            // تحديث الصفحة الحالية إذا كانت صفحة الحساب
            if (document.getElementById('app-title').textContent === 'حسابي') {
                loadAccountPage();
            }
        } else {
            showToast('الرجاء إدخال جميع البيانات المطلوبة', 'error');
        }
    }

    // تسجيل حساب جديد
    function handleRegister() {
        const name = document.getElementById('register-name').value;
        const phone = document.getElementById('register-phone').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const type = document.getElementById('register-type').value;
        const agreeTerms = document.getElementById('agree-terms').checked;
        
        if (!name || !phone || !password || !agreeTerms) {
            showToast('الرجاء إدخال جميع البيانات المطلوبة والموافقة على الشروط', 'error');
            return;
        }
        
        appData.currentUser = {
            name: name,
            phone: phone,
            email: email || null,
            type: type,
            avatar: "assets/user-avatar.jpg"
        };
        
        saveData();
        updateUserProfile();
        hideModal('login');
        showToast('تم إنشاء الحساب بنجاح', 'success');
        
        // تحديث الصفحة الحالية إذا كانت صفحة الحساب
        if (document.getElementById('app-title').textContent === 'حسابي') {
            loadAccountPage();
        }
    }

    // تسجيل خروج المستخدم
    function logoutUser() {
        appData.currentUser = null;
        saveData();
        updateUserProfile();
        loadAccountPage();
        showToast('تم تسجيل الخروج بنجاح', 'info');
    }

    // إضافة منتج إلى السلة
    function addToCart(productId) {
        const product = [...appData.featuredProducts, ...appData.stores.flatMap(store => store.products)]
            .find(p => p.id === productId);
        
        if (!product) return;
        
        const existingItem = appData.cartItems.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            appData.cartItems.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        saveData();
        updateCartCount();
        
        // تأثير إضافي عند الإضافة للسلة
        const cartIcon = document.querySelector('.nav-item[data-page="cart"] .nav-icon');
        cartIcon.classList.add('animate__animated', 'animate__tada');
        setTimeout(() => {
            cartIcon.classList.remove('animate__animated', 'animate__tada');
        }, 1000);
        
        showToast('تمت إضافة المنتج إلى السلة', 'success');
    }

    // إضافة منتج إلى المفضلة
    function addToFavorites(productId) {
        if (!appData.favorites.includes(productId)) {
            appData.favorites.push(productId);
            saveData();
            showToast('تمت إضافة المنتج إلى المفضلة', 'success');
        } else {
            showToast('المنتج موجود بالفعل في المفضلة', 'info');
        }
    }

    // إزالة منتج من المفضلة
    function removeFromFavorites(productId) {
        appData.favorites = appData.favorites.filter(id => id !== productId);
        saveData();
        loadFavoritesPage();
        showToast('تمت إزالة المنتج من المفضلة', 'warning');
    }

    // حذف إشعار
    function deleteNotification(notificationId) {
        appData.notifications = appData.notifications.filter(n => n.id !== notificationId);
        saveData();
        loadNotificationsPage();
        showToast('تم حذف الإشعار', 'warning');
    }

    // عرض/إخفاء النوافذ المنبثقة
    function showModal(modalId) {
        document.getElementById(`${modalId}-modal`).style.display = 'flex';
    }

    function hideModal(modalId) {
        document.getElementById(`${modalId}-modal`).style.display = 'none';
    }

    // تبديل علامات تبويب المصادقة
    function switchAuthTab(tabId) {
        document.querySelectorAll('.tab-btn').forEach(t => {
            t.classList.remove('active');
        });
        document.querySelector(`.tab-btn[data-tab="${tabId}"]`).classList.add('active');
        
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });
        document.getElementById(`${tabId}-form`).classList.add('active');
    }

    // تبديل تصنيفات المساعدة
    function switchHelpCategory(categoryId) {
        document.querySelectorAll('.help-category').forEach(cat => {
            cat.classList.remove('active');
        });
        document.querySelector(`.help-category[data-category="${categoryId}"]`).classList.add('active');
        
        document.querySelectorAll('.help-questions').forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(`${categoryId}-questions`).style.display = 'block';
    }

    // إظهار/إخفاء كلمة المرور
    function togglePasswordVisibility(button) {
        const input = button.previousElementSibling;
        const icon = button.querySelector('i');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            input.type = 'password';
            icon.classList.replace('fa-eye-slash', 'fa-eye');
        }
    }

    // تحديث قوة كلمة المرور
    function updatePasswordStrength(password) {
        const strengthBar = document.querySelector('.strength-bar');
        const strengthText = document.querySelector('.strength-text');
        let strength = 0;
        
        if (password.length > 0) strength++;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        strengthBar.style.width = `${strength * 20}%`;
        
        if (strength <= 1) {
            strengthBar.style.backgroundColor = 'var(--danger-color)';
            strengthText.textContent = 'ضعيفة';
        } else if (strength <= 3) {
            strengthBar.style.backgroundColor = 'var(--warning-color)';
            strengthText.textContent = 'متوسطة';
        } else {
            strengthBar.style.backgroundColor = 'var(--accent-color)';
            strengthText.textContent = 'قوية';
        }
    }

    // تبديل الوضع الداكن
    function toggleDarkMode(enable) {
        appData.darkMode = enable;
        saveData();
        
        if (enable) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    }

    // تأثير الريبل
    function createRippleEffect(event) {
        const button = event.target.closest('.btn-primary, .social-btn, .store-card, .product-card');
        if (!button) return;
        
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('div');
        ripple.className = 'ripple-effect';
        ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
        ripple.style.left = (event.clientX - rect.left - Math.max(rect.width, rect.height) / 2) + 'px';
        ripple.style.top = (event.clientY - rect.top - Math.max(rect.width, rect.height) / 2) + 'px';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // عرض إشعار
    function showToast(message, type = 'info') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = 'toast ' + type;
        toast.style.display = 'block';
        
        setTimeout(() => {
            toast.style.animation = 'toastOut 0.3s ease forwards';
            setTimeout(() => {
                toast.style.display = 'none';
                toast.style.animation = '';
            }, 300);
        }, 3000);
    }

    // تحميل البيانات من LocalStorage
    function loadData() {
        const savedUser = localStorage.getItem('rahimli_user');
        const savedCart = localStorage.getItem('rahimli_cart');
        const savedFavorites = localStorage.getItem('rahimli_favorites');
        const savedDarkMode = localStorage.getItem('rahimli_darkMode');
        
        if (savedUser) {
            appData.currentUser = JSON.parse(savedUser);
            updateUserProfile();
        }
        
        if (savedCart) {
            appData.cartItems = JSON.parse(savedCart);
            updateCartCount();
        }
        
        if (savedFavorites) {
            appData.favorites = JSON.parse(savedFavorites);
        }
        
        if (savedDarkMode) {
            appData.darkMode = JSON.parse(savedDarkMode);
            document.getElementById('dark-mode-toggle').checked = appData.darkMode;
            toggleDarkMode(appData.darkMode);
        }
    }

    // حفظ البيانات في LocalStorage
    function saveData() {
        if (appData.currentUser) {
            localStorage.setItem('rahimli_user', JSON.stringify(appData.currentUser));
        }
        localStorage.setItem('rahimli_cart', JSON.stringify(appData.cartItems));
        localStorage.setItem('rahimli_favorites', JSON.stringify(appData.favorites));
        localStorage.setItem('rahimli_darkMode', JSON.stringify(appData.darkMode));
    }

    // تحديث صورة المستخدم
    function updateUserProfile() {
        if (appData.currentUser) {
            const userAvatar = document.querySelector('.user-avatar');
            const userInfo = document.querySelector('.user-info h3');
            
            userAvatar.src = appData.currentUser.avatar || 'assets/user-avatar.jpg';
            userInfo.textContent = appData.currentUser.name;
            document.querySelector('.user-info p').textContent = 'عرض الملف الشخصي';
            document.getElementById('logout-btn').style.display = 'block';
            document.getElementById('login-btn').style.display = 'none';
        } else {
            document.querySelector('.user-avatar').src = 'assets/user-avatar.jpg';
            document.querySelector('.user-info h3').textContent = 'مرحباً بك!';
            document.querySelector('.user-info p').textContent = 'سجل الدخول للوصول إلى جميع الميزات';
            document.getElementById('logout-btn').style.display = 'none';
            document.getElementById('login-btn').style.display = 'block';
        }
    }

    // تحديث عدد العناصر في السلة
    function updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        const totalItems = appData.cartItems.reduce((total, item) => total + item.quantity, 0);
        
        if (totalItems > 0) {
            cartCount.textContent = totalItems;
            cartCount.style.display = 'flex';
        } else {
            cartCount.style.display = 'none';
        }
    }

    // دالة جديدة لإضافة تأثيرات التمرير
    function setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__fadeInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.product-card, .store-card, .category-card').forEach(card => {
            observer.observe(card);
        });
    }

    // تنسيق التاريخ
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-IQ', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // تنسيق التاريخ والوقت
    function formatDateTime(dateTimeString) {
        const date = new Date(dateTimeString);
        return date.toLocaleString('ar-IQ', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // الحصول على نص حالة الطلب
    function getStatusText(status) {
        switch(status) {
            case 'pending': return 'قيد الانتظار';
            case 'processing': return 'قيد المعالجة';
            case 'completed': return 'مكتمل';
            case 'cancelled': return 'ملغى';
            default: return status;
        }
    }

    // الحصول على كلاس حالة الطلب
    function getStatusClass(status) {
        switch(status) {
            case 'pending': return 'status-pending';
            case 'processing': return 'status-processing';
            case 'completed': return 'status-completed';
            case 'cancelled': return 'status-cancelled';
            default: return '';
        }
    }
});