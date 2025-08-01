import { 
  db,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  storage,
  ref,
  uploadBytes,
  getDownloadURL
} from './firebase.js';
import { showToast } from './utils.js';

// جلب جميع المنتجات المميزة
export async function getFeaturedProducts() {
  try {
    const q = query(collection(db, "products"), where("featured", "==", true));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    showToast('حدث خطأ أثناء جلب المنتجات', 'error');
    throw error;
  }
}

// جلب منتجات متجر معين
export async function getStoreProducts(storeId) {
  try {
    const q = query(collection(db, "products"), where("storeId", "==", storeId));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    showToast('حدث خطأ أثناء جلب منتجات المتجر', 'error');
    throw error;
  }
}

// جلب تفاصيل منتج
export async function getProductDetails(productId) {
  try {
    const docRef = doc(db, "products", productId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('المنتج غير موجود');
    }
  } catch (error) {
    showToast(error.message, 'error');
    throw error;
  }
}

// إضافة منتج جديد (للتجار)
export async function addNewProduct(productData, images) {
  try {
    // رفع الصور إلى Storage أولاً
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const storageRef = ref(storage, `products/${Date.now()}_${image.name}`);
        await uploadBytes(storageRef, image);
        return await getDownloadURL(storageRef);
      })
    );
    
    // إضافة المنتج إلى Firestore
    const docRef = await addDoc(collection(db, "products"), {
      ...productData,
      images: imageUrls,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return docRef.id;
  } catch (error) {
    showToast('حدث خطأ أثناء إضافة المنتج', 'error');
    throw error;
  }
}

// تحديث منتج
export async function updateProduct(productId, productData) {
  try {
    await updateDoc(doc(db, "products", productId), {
      ...productData,
      updatedAt: new Date()
    });
  } catch (error) {
    showToast('حدث خطأ أثناء تحديث المنتج', 'error');
    throw error;
  }
}

// حذف منتج
export async function deleteProduct(productId) {
  try {
    await deleteDoc(doc(db, "products", productId));
    showToast('تم حذف المنتج بنجاح', 'success');
  } catch (error) {
    showToast('حدث خطأ أثناء حذف المنتج', 'error');
    throw error;
  }
}