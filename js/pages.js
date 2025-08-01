import { 
  getFeaturedProducts,
  getProductDetails
} from './products.js';
import { 
  getFeaturedStores,
  getStoreDetails
} from './stores.js';
import { 
  getCartItems,
  addToCart,
  removeFromCart,
  updateCartItem
} from './cart.js';
import { showToast, renderRatingStars, formatDate } from './utils.js';

// تحميل الصفحة الرئيسية
export async function loadHomePage() {
  try {
    const [featuredProducts, featuredStores] = await Promise.all([
      getFeaturedProducts(),
      getFeaturedStores()
    ]);
    
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
      <div class="home-page animate__animated animate__fadeIn">
        <!-- شريط الإعلانات المتحرك -->
        <div class="hero-slider">
          <div class="slide active">
            <img src="assets/banners/banner1.jpg" alt="عروض خاصة">
          </div>
          <div class="slide">
            <img src="assets/banners/banner2.jpg" alt="خصومات كبيرة">
          </div>
          <div class="slider-indicators">
            <span class="active"></span>
            <span></span>
          </div>
        </div>

        <!-- المنتجات المميزة -->
        <div class="section-header">
          <h2 class="section-title">المنتجات المميزة</h2>
          <a href="#" class="view-all">عرض الكل</a>
        </div>
        <div class="products-grid" id="featured-products">
          ${featuredProducts.map((product, index) => `
            <div class="product-card animate__animated animate__fadeIn" data-product-id="${product.id}" 
                 style="animation-delay: ${0.1 * index}s">
              <img src="${product.images[0]}" alt="${product.name}" class="product-image">
              <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price.toLocaleString()} IQD</p>
                <div class="product-rating">
                  <span>${product.rating || 0}</span>
                  ${renderRatingStars(product.rating || 0)}
                </div>
                <button class="add-to-cart">
                  <i class="fas fa-cart-plus"></i>
                  أضف للسلة
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
          ${featuredStores.map((store, index) => `
            <div class="store-card animate__animated animate__fadeIn" data-store-id="${store.id}" 
                 style="animation-delay: ${0.1 * index}s">
              <img src="${store.logo}" alt="${store.name}" class="store-logo">
              <div class="store-info">
                <h3>${store.name}</h3>
                <p>${store.description}</p>
                <div class="store-rating">
                  <span>${store.rating || 0}</span>
                  ${renderRatingStars(store.rating || 0)}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    // إعداد معالجات الأحداث
    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', async function() {
        const productId = this.closest('.product-card').getAttribute('data-product-id');
        try {
          await addToCart(auth.currentUser.uid, productId);
          updateCartCount();
        } catch (error) {
          console.error(error);
        }
      });
    });
    
    document.querySelectorAll('.store-card').forEach(card => {
      card.addEventListener('click', function() {
        const storeId = this.getAttribute('data-store-id');
        loadStorePage(storeId);
      });
    });
    
    startSlider();
    
  } catch (error) {
    showToast('حدث خطأ أثناء تحميل الصفحة الرئيسية', 'error');
    console.error(error);
  }
}

// تحميل صفحة المتجر
export async function loadStorePage(storeId) {
  try {
    const [store, products] = await Promise.all([
      getStoreDetails(storeId),
      getStoreProducts(storeId)
    ]);
    
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
      <div class="store-page animate__animated animate__fadeIn">
        <div class="store-header">
          <img src="${store.logo}" alt="${store.name}" class="store-logo-large">
          <h2>${store.name}</h2>
          <p class="store-description">${store.description}</p>
          <div class="store-rating">
            ${renderRatingStars(store.rating || 0)}
            <span>${store.rating || 0} (${store.reviewCount || 0} تقييم)</span>
          </div>
        </div>
        
        <div class="section-header">
          <h3 class="section-title">منتجات المتجر</h3>
        </div>
        
        <div class="products-grid">
          ${products.map(product => `
            <div class="product-card" data-product-id="${product.id}">
              <img src="${product.images[0]}" alt="${product.name}" class="product-image">
              <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price.toLocaleString()} IQD</p>
                <button class="add-to-cart">
                  <i class="fas fa-cart-plus"></i>
                  أضف للسلة
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    // تحديث عنوان الصفحة
    document.getElementById('app-title').textContent = store.name;
    
    // إعداد معالجات الأحداث
    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', async function() {
        const productId = this.closest('.product-card').getAttribute('data-product-id');
        try {
          await addToCart(auth.currentUser.uid, productId);
          updateCartCount();
        } catch (error) {
          console.error(error);
        }
      });
    });
    
  } catch (error) {
    showToast('حدث خطأ أثناء تحميل صفحة المتجر', 'error');
    console.error(error);
  }
}

// تحميل صفحة السلة
export async function loadCartPage() {
  try {
    if (!auth.currentUser) {
      showAuthRequired();
      return;
    }
    
    const cartItems = await getCartItems(auth.currentUser.uid);
    
    if (cartItems.length === 0) {
      showEmptyCart();
      return;
    }
    
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 5000; // رسوم التوصيل
    const total = subtotal + shipping;
    
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
      <div class="cart-page animate__animated animate__fadeIn">
        <div class="cart-items">
          ${cartItems.map(item => `
            <div class="cart-item" data-product-id="${item.productId}">
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
            <span>${subtotal.toLocaleString()} IQD</span>
          </div>
          <div class="summary-row">
            <span>التوصيل</span>
            <span>${shipping.toLocaleString()} IQD</span>
          </div>
          <div class="summary-row total">
            <span>المجموع الكلي</span>
            <span>${total.toLocaleString()} IQD</span>
          </div>
          <button class="btn-primary checkout-btn">
            <span>إتمام الشراء</span>
            <i class="fas fa-arrow-left"></i>
          </button>
        </div>
      </div>
    `;
    
    // إعداد معالجات الأحداث
    document.querySelectorAll('.decrease').forEach(btn => {
      btn.addEventListener('click', async function() {
        const productId = this.closest('.cart-item').getAttribute('data-product-id');
        const quantityElement = this.nextElementSibling;
        const newQuantity = parseInt(quantityElement.textContent) - 1;
        
        if (newQuantity < 1) {
          try {
            await removeFromCart(auth.currentUser.uid, productId);
            loadCartPage();
            updateCartCount();
          } catch (error) {
            console.error(error);
          }
          return;
        }
        
        try {
          await updateCartItem(auth.currentUser.uid, productId, newQuantity);
          quantityElement.textContent = newQuantity;
          updateCartTotal();
        } catch (error) {
          console.error(error);
        }
      });
    });
    
    document.querySelectorAll('.increase').forEach(btn => {
      btn.addEventListener('click', async function() {
        const productId = this.closest('.cart-item').getAttribute('data-product-id');
        const quantityElement = this.previousElementSibling;
        const newQuantity = parseInt(quantityElement.textContent) + 1;
        
        try {
          await updateCartItem(auth.currentUser.uid, productId, newQuantity);
          quantityElement.textContent = newQuantity;
          updateCartTotal();
        } catch (error) {
          console.error(error);
        }
      });
    });
    
    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', async function() {
        const productId = this.closest('.cart-item').getAttribute('data-product-id');
        try {
          await removeFromCart(auth.currentUser.uid, productId);
          loadCartPage();
          updateCartCount();
        } catch (error) {
          console.error(error);
        }
      });
    });
    
    document.querySelector('.checkout-btn').addEventListener('click', () => {
      showPaymentModal();
    });
    
  } catch (error) {
    showToast('حدث خطأ أثناء تحميل سلة التسوق', 'error');
    console.error(error);
  }
}

// تحميل صفحة الحساب
export async function loadAccountPage() {
  try {
    if (!auth.currentUser) {
      showAuthRequired();
      return;
    }
    
    const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
    const userData = userDoc.data();
    
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
      <div class="account-page animate__animated animate__fadeIn">
        <div class="user-profile-card">
          <img src="${auth.currentUser.photoURL || 'assets/images/user-avatar.jpg'}" 
               alt="صورة المستخدم" class="user-avatar-large">
          <h3>${userData.name}</h3>
          <p>${auth.currentUser.email}</p>
          <p>${userData.phone}</p>
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
    
    // إعداد معالجات الأحداث
    document.getElementById('logout-action').addEventListener('click', () => {
      logoutUser();
    });
    
    document.querySelectorAll('.account-action[data-page]').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.getAttribute('data-page');
        navigateTo(page);
      });
    });
    
  } catch (error) {
    showToast('حدث خطأ أثناء تحميل صفحة الحساب', 'error');
    console.error(error);
  }
}

// تحميل صفحة المفضلة
export async function loadFavoritesPage() {
  try {
    if (!auth.currentUser) {
      showAuthRequired();
      return;
    }
    
    const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
    const favorites = userDoc.data().favorites || [];
    
    if (favorites.length === 0) {
      showEmptyFavorites();
      return;
    }
    
    // جلب تفاصيل المنتجات المفضلة
    const productsPromises = favorites.map(productId => 
      getProductDetails(productId).catch(() => null)
    );
    const products = (await Promise.all(productsPromises)).filter(Boolean);
    
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
      <div class="favorites-page animate__animated animate__fadeIn">
        <div class="section-header">
          <h2 class="section-title">المنتجات المفضلة</h2>
        </div>
        
        <div class="products-grid">
          ${products.map(product => `
            <div class="product-card" data-product-id="${product.id}">
              <img src="${product.images[0]}" alt="${product.name}" class="product-image">
              <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price.toLocaleString()} IQD</p>
                <button class="add-to-cart">
                  <i class="fas fa-cart-plus"></i>
                  أضف للسلة
                </button>
                <button class="btn-outline remove-from-favorites">
                  <i class="fas fa-heart"></i>
                  إزالة من المفضلة
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    // إعداد معالجات الأحداث
    document.querySelectorAll('.add-to-cart').forEach(btn => {
      btn.addEventListener('click', async function() {
        const productId = this.closest('.product-card').getAttribute('data-product-id');
        try {
          await addToCart(auth.currentUser.uid, productId);
          updateCartCount();
        } catch (error) {
          console.error(error);
        }
      });
    });
    
    document.querySelectorAll('.remove-from-favorites').forEach(btn => {
      btn.addEventListener('click', async function() {
        const productId = this.closest('.product-card').getAttribute('data-product-id');
        try {
          await removeFromFavorites(auth.currentUser.uid, productId);
          loadFavoritesPage();
        } catch (error) {
          console.error(error);
        }
      });
    });
    
  } catch (error) {
    showToast('حدث خطأ أثناء تحميل المفضلة', 'error');
    console.error(error);
  }
}

// تحميل صفحة الطلبات
export async function loadOrdersPage() {
  try {
    if (!auth.currentUser) {
      showAuthRequired();
      return;
    }
    
    const ordersQuery = query(
      collection(db, "orders"),
      where("userId", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(ordersQuery);
    const orders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    if (orders.length === 0) {
      showEmptyOrders();
      return;
    }
    
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
      <div class="orders-page animate__animated animate__fadeIn">
        <div class="section-header">
          <h2 class="section-title">سجل الطلبات</h2>
        </div>
        
        ${orders.map(order => `
          <div class="order-card">
            <div class="order-header">
              <span class="order-id">طلب #${order.id.slice(0, 8)}</span>
              <span class="order-date">${formatDate(order.createdAt.toDate())}</span>
            </div>
            <div class="order-status ${order.status}">
              ${getOrderStatusText(order.status)}
            </div>
            <div class="order-products">
              ${order.items.slice(0, 5).map(item => `
                <img src="${item.image}" alt="${item.name}" class="order-product-image" 
                     title="${item.name} - ${item.quantity}x">
              `).join('')}
              ${order.items.length > 5 ? `<span class="more-items">+${order.items.length - 5}</span>` : ''}
            </div>
            <div class="order-summary">
              <span class="order-total">${order.total.toLocaleString()} IQD</span>
              <div class="order-actions">
                <button class="btn-outline view-order-details" data-order-id="${order.id}">
                  <i class="fas fa-eye"></i>
                  التفاصيل
                </button>
                ${order.status === 'delivered' ? `
                <button class="btn-outline reorder-btn" data-order-id="${order.id}">
                  <i class="fas fa-redo"></i>
                  إعادة طلب
                </button>
                ` : ''}
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    
    // إعداد معالجات الأحداث
    document.querySelectorAll('.view-order-details').forEach(btn => {
      btn.addEventListener('click', function() {
        const orderId = this.getAttribute('data-order-id');
        showOrderDetailsModal(orderId);
      });
    });
    
    document.querySelectorAll('.reorder-btn').forEach(btn => {
      btn.addEventListener('click', async function() {
        const orderId = this.getAttribute('data-order-id');
        try {
          await reorderItems(orderId);
          showToast('تمت إضافة العناصر إلى السلة', 'success');
          updateCartCount();
        } catch (error) {
          showToast('حدث خطأ أثناء إعادة الطلب', 'error');
          console.error(error);
        }
      });
    });
    
  } catch (error) {
    showToast('حدث خطأ أثناء تحميل سجل الطلبات', 'error');
    console.error(error);
  }
}

// تحميل صفحة الإشعارات
export async function loadNotificationsPage() {
  try {
    if (!auth.currentUser) {
      showAuthRequired();
      return;
    }
    
    const notificationsQuery = query(
      collection(db, "notifications"),
      where("userId", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(notificationsQuery);
    const notifications = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    if (notifications.length === 0) {
      showEmptyNotifications();
      return;
    }
    
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
      <div class="notifications-page animate__animated animate__fadeIn">
        <div class="section-header">
          <h2 class="section-title">الإشعارات</h2>
          <button class="btn-outline" id="mark-all-read">
            <i class="fas fa-check"></i>
            تعليم الكل كمقروء
          </button>
        </div>
        
        ${notifications.map(notification => `
          <div class="notification-card ${notification.read ? '' : 'unread'}">
            <div class="notification-header">
              <h3 class="notification-title">${notification.title}</h3>
              <span class="notification-time">${formatDate(notification.createdAt.toDate())}</span>
            </div>
            <p class="notification-message">${notification.message}</p>
            ${notification.link ? `
            <div class="notification-actions">
              <a href="${notification.link}" class="btn-outline">
                <i class="fas fa-eye"></i>
                عرض التفاصيل
              </a>
            </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
    
    // إعداد معالجات الأحداث
    document.getElementById('mark-all-read')?.addEventListener('click', async () => {
      try {
        const batch = writeBatch(db);
        notifications.forEach(notification => {
          if (!notification.read) {
            const notificationRef = doc(db, "notifications", notification.id);
            batch.update(notificationRef, { read: true });
          }
        });
        await batch.commit();
        loadNotificationsPage();
        showToast('تم تعليم جميع الإشعارات كمقروءة', 'success');
      } catch (error) {
        showToast('حدث خطأ أثناء تحديث الإشعارات', 'error');
        console.error(error);
      }
    });
    
  } catch (error) {
    showToast('حدث خطأ أثناء تحميل الإشعارات', 'error');
    console.error(error);
  }
}

// وظائف مساعدة للصفحات
function showAuthRequired() {
  const appContent = document.getElementById('app-content');
  appContent.innerHTML = `
    <div class="auth-required animate__animated animate__fadeIn">
      <div class="auth-icon">
        <i class="fas fa-user-lock"></i>
      </div>
      <h3>يجب تسجيل الدخول</h3>
      <p>لتتمكن من الوصول إلى هذه الصفحة، يرجى تسجيل الدخول أولاً</p>
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

function showEmptyCart() {
  const appContent = document.getElementById('app-content');
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
}

function showEmptyFavorites() {
  const appContent = document.getElementById('app-content');
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
}

function showEmptyOrders() {
  const appContent = document.getElementById('app-content');
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
}

function showEmptyNotifications() {
  const appContent = document.getElementById('app-content');
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
}

// وظائف مساعدة
function getOrderStatusText(status) {
  switch(status) {
    case 'pending': return 'قيد الانتظار';
    case 'processing': return 'قيد المعالجة';
    case 'shipped': return 'تم الشحن';
    case 'delivered': return 'تم التسليم';
    case 'cancelled': return 'ملغى';
    default: return status;
  }
}