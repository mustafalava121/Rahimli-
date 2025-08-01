import { 
  db,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  storage,
  ref,
  uploadBytes,
  getDownloadURL
} from './firebase.js';
import { showToast } from './utils.js';

// جلب جميع المتاجر
export async function getAllStores() {
  try {
    const q = query(collection(db, "stores"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    showToast('حدث خطأ أثناء جلب المتاجر', 'error');
    throw error;
  }
}

// جلب المتاجر المميزة
export async function getFeaturedStores() {
  try {
    const q = query(collection(db, "stores"), 
      where("featured", "==", true),
      orderBy("createdAt", "desc"),
      limit(5)
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    showToast('حدث خطأ أثناء جلب المتاجر المميزة', 'error');
    throw error;
  }
}

// جلب تفاصيل متجر
export async function getStoreDetails(storeId) {
  try {
    const docRef = doc(db, "stores", storeId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('المتجر غير موجود');
    }
  } catch (error) {
    showToast(error.message, 'error');
    throw error;
  }
}

// إنشاء متجر جديد
export async function createStore(storeData, logoFile) {
  try {
    // رفع شعار المتجر
    let logoUrl = '';
    if (logoFile) {
      const storageRef = ref(storage, `stores/${Date.now()}_${logoFile.name}`);
      await uploadBytes(storageRef, logoFile);
      logoUrl = await getDownloadURL(storageRef);
    }
    
    // إضافة المتجر إلى Firestore
    const docRef = await addDoc(collection(db, "stores"), {
      ...storeData,
      logo: logoUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
      rating: 0,
      totalSales: 0
    });
    
    return docRef.id;
  } catch (error) {
    showToast('حدث خطأ أثناء إنشاء المتجر', 'error');
    throw error;
  }
}

// تحديث متجر
export async function updateStore(storeId, storeData, logoFile) {
  try {
    let updateData = {
      ...storeData,
      updatedAt: new Date()
    };
    
    // إذا تم رفع شعار جديد
    if (logoFile) {
      const storageRef = ref(storage, `stores/${Date.now()}_${logoFile.name}`);
      await uploadBytes(storageRef, logoFile);
      updateData.logo = await getDownloadURL(storageRef);
    }
    
    await updateDoc(doc(db, "stores", storeId), updateData);
  } catch (error) {
    showToast('حدث خطأ أثناء تحديث المتجر', 'error');
    throw error;
  }
}