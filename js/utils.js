// عرض إشعار
export function showToast(message, type = 'info') {
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

// عرض تقييم النجوم
export function renderRatingStars(rating) {
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

// تنسيق التاريخ
export function formatDate(date) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    timeZone: 'Asia/Baghdad'
  };
  return date.toLocaleDateString('ar-IQ', options);
}

// تنسيق التاريخ والوقت
export function formatDateTime(date) {
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Baghdad'
  };
  return date.toLocaleString('ar-IQ', options);
}

// تحديث عدد العناصر في السلة
export function updateCartCount() {
  const cartCount = document.querySelector('.cart-count');
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || [];
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  if (totalItems > 0) {
    cartCount.textContent = totalItems;
    cartCount.style.display = 'flex';
  } else {
    cartCount.style.display = 'none';
  }
}

// تشغيل سلايدر الإعلانات
export function startSlider() {
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

// تحديث المجموع الكلي للسلة
export function updateCartTotal() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5000;
  const total = subtotal + shipping;
  
  const subtotalElement = document.querySelector('.summary-row:first-child span:last-child');
  const totalElement = document.querySelector('.summary-row.total span:last-child');
  
  if (subtotalElement && totalElement) {
    subtotalElement.textContent = subtotal.toLocaleString() + ' IQD';
    totalElement.textContent = total.toLocaleString() + ' IQD';
  }
}