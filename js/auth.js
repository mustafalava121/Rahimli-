import { 
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  db,
  setDoc,
  doc
} from './firebase.js';
import { showToast } from './utils.js';

// تسجيل حساب جديد
export async function registerUser(email, password, name, phone, userType) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password, name);
    const user = userCredential.user;
    
    // حفظ بيانات المستخدم الإضافية
    await setDoc(doc(db, "users", user.uid), {
      name: name,
      email: email,
      phone: phone,
      type: userType,
      createdAt: new Date()
    });
    
    return user;
  } catch (error) {
    showToast(error.message, 'error');
    throw error;
  }
}

// تسجيل الدخول
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    showToast(error.message, 'error');
    throw error;
  }
}

// تسجيل الخروج
export async function logoutUser() {
  try {
    await signOut(auth);
    showToast('تم تسجيل الخروج بنجاح', 'success');
  } catch (error) {
    showToast(error.message, 'error');
    throw error;
  }
}

// معالجة تسجيل الدخول
export function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  
  loginUser(email, password)
    .then(() => {
      hideModal('login');
      showToast('تم تسجيل الدخول بنجاح', 'success');
    })
    .catch(error => console.error(error));
}

// معالجة التسجيل
export function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const phone = document.getElementById('register-phone').value;
  const password = document.getElementById('register-password').value;
  const userType = document.getElementById('register-type').value;
  const agreeTerms = document.getElementById('agree-terms').checked;
  
  if (!agreeTerms) {
    showToast('يجب الموافقة على الشروط والأحكام', 'error');
    return;
  }
  
  registerUser(email, password, name, phone, userType)
    .then(() => {
      hideModal('login');
      showToast('تم إنشاء الحساب بنجاح', 'success');
    })
    .catch(error => console.error(error));
}