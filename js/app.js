import { 
  auth, 
  onAuthStateChanged,
  signOut
} from './firebase.js';
import { 
  loadHomePage,
  loadStoresPage,
  loadCartPage,
  loadAccountPage,
  loadFavoritesPage,
  loadOrdersPage,
  loadNotificationsPage
} from './pages.js';
import { setupEventListeners } from './events.js';
import { showToast } from './utils.js';

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  const splashScreen = document.getElementById('splash-screen');
  const appContainer = document.getElementById('app-container');
  const progressBar = document.getElementById('progress-bar');
  
  // محاكاة تقدم التحميل
  let progress = 0;
  const loadingInterval = setInterval(() => {
    progress += Math.random() * 10 + 5;
    if (progress > 100) progress = 100;
    progressBar.style.width = `${progress}%`;
    
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
      navigator.serviceWorker.register('firebase-messaging-sw.js')
        .then(registration => {
          console.log('ServiceWorker registration successful');
        })
        .catch(err => console.error('Service Worker registration failed:', err));
    }

    // إعداد معالج الأحداث
    setupEventListeners();
    
    // تحميل الصفحة الرئيسية
    loadHomePage();
    
    // مراقبة حالة المصادقة
    onAuthStateChanged(auth, (user) => {
      if (user) {
        updateUserProfile(user);
      } else {
        updateUserProfile(null);
      }
    });
  }
});

// تحديث صورة المستخدم
function updateUserProfile(user) {
  const userAvatar = document.querySelector('.user-avatar');
  const userInfo = document.querySelector('.user-info h3');
  
  if (user) {
    userAvatar.src = user.photoURL || 'assets/images/user-avatar.jpg';
    userInfo.textContent = user.displayName || 'مستخدم جديد';
    document.querySelector('.user-info p').textContent = 'عرض الملف الشخصي';
    document.getElementById('logout-btn').style.display = 'block';
    document.getElementById('login-btn').style.display = 'none';
  } else {
    userAvatar.src = 'assets/images/user-avatar.jpg';
    userInfo.textContent = 'مرحباً بك!';
    document.querySelector('.user-info p').textContent = 'سجل الدخول للوصول إلى جميع الميزات';
    document.getElementById('logout-btn').style.display = 'none';
    document.getElementById('login-btn').style.display = 'block';
  }
}

// تصدير الدوال المطلوبة
export {
  updateUserProfile
};