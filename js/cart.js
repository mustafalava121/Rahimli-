import { 
  db,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment
} from './firebase.js';
import { showToast } from './utils.js';

// إضافة منتج إلى السلة
export async function addToCart(userId, productId, quantity = 1) {
  try {
    // الحصول على تفاصيل المنتج
    const productRef = doc(db, "products", productId);
    const productSnap = await getDoc(productRef);
    
    if (!productSnap.exists()) {
      throw new Error('المنتج غير موجود');
    }
    
    const product = productSnap.data();
    
    // تحديث سلة المستخدم
    const cartRef = doc(db, "carts", userId);
    await setDoc(cartRef, {
      items: arrayUnion({
        productId: productId,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: quantity
      })
    }, { merge: true });
    
    showToast('تمت إضافة المنتج إلى السلة', 'success');
  } catch (error) {
    showToast(error.message, 'error');
    throw error;
  }
}

// تحديث كمية المنتج في السلة
export async function updateCartItem(userId, productId, newQuantity) {
  try {
    const cartRef = doc(db, "carts", userId);
    const cartSnap = await getDoc(cartRef);
    
    if (!cartSnap.exists()) {
      throw new Error('السلة غير موجودة');
    }
    
    const cart = cartSnap.data();
    const itemIndex = cart.items.findIndex(item => item.productId === productId);
    
    if (itemIndex === -1) {
      throw new Error('المنتج غير موجود في السلة');
    }
    
    const updatedItems = [...cart.items];
    updatedItems[itemIndex].quantity = newQuantity;
    
    await updateDoc(cartRef, {
      items: updatedItems
    });
    
    showToast('تم تحديث السلة', 'success');
  } catch (error) {
    showToast(error.message, 'error');
    throw error;
  }
}

// إزالة منتج من السلة
export async function removeFromCart(userId, productId) {
  try {
    const cartRef = doc(db, "carts", userId);
    const cartSnap = await getDoc(cartRef);
    
    if (!cartSnap.exists()) {
      throw new Error('السلة غير موجودة');
    }
    
    const cart = cartSnap.data();
    const item = cart.items.find(item => item.productId === productId);
    
    if (!item) {
      throw new Error('المنتج غير موجود في السلة');
    }
    
    await updateDoc(cartRef, {
      items: arrayRemove(item)
    });
    
    showToast('تمت إزالة المنتج من السلة', 'warning');
  } catch (error) {
    showToast(error.message, 'error');
    throw error;
  }
}

// جلب محتويات السلة
export async function getCartItems(userId) {
  try {
    const cartRef = doc(db, "carts", userId);
    const cartSnap = await getDoc(cartRef);
    
    if (cartSnap.exists()) {
      return cartSnap.data().items || [];
    }
    return [];
  } catch (error) {
    showToast('حدث خطأ أثناء جلب محتويات السلة', 'error');
    throw error;
  }
}

// تفريغ السلة
export async function clearCart(userId) {
  try {
    await setDoc(doc(db, "carts", userId), {
      items: []
    });
  } catch (error) {
    showToast('حدث خطأ أثناء تفريغ السلة', 'error');
    throw error;
  }
}