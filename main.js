import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBNYqYJVYPTZRIK7pKZ4shbQ4igjseQpLM",
  authDomain: "insan-cemerlang-d724d.firebaseapp.com",
  projectId: "insan-cemerlang-d724d",
  storageBucket: "insan-cemerlang-d724d.appspot.com",
  messagingSenderId: "630693962922",
  appId: "1:630693962922:web:a9447f760b858bcf781cd3"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarPembeli() {
  const refDokumen = collection(db, "pembeli");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      alamat: dok.data().alamat,
      noTlpn: dok.data().noTlpn,
    });
  });
  
  return hasil;
}

export function formatAngka(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function  tambahPembeli(nama, alamat, noTlpn) {
  try {
    const dokRef = await addDoc(collection(db, 'pembeli'), {
      nama: nama,
      alamat: alamat,
      noTlpn: noTlpn
    });
    console.log('Berhasil menambah produk ' + dokRef.id);
  } catch (e) {
    console.log('Gagal menambah produk' + e);
  }
   }
   
   export async function hapusPembeli(docId) {
  await deleteDoc(doc(db, "pembeli", docId));
}

export async function ubahPembeli(docId, nama, alamat, noTlpn) {
  await updateDoc(doc(db, "pembeli", docId), {
    nama: nama,
    alamat: alamat,
    noTlpn: noTlpn
  });
}

export async function ambilPembeli(docId) {
  const docRef = await doc(db, "pembeli", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}

