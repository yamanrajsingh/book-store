import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
// for authrization
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

// for firestore // data
import { getFirestore, collection, addDoc, getDocs, doc, getDoc,query,where } from "firebase/firestore";
// for storege // img
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "bookstore-6d336.firebaseapp.com",
  projectId: "bookstore-6d336",
  storageBucket: "bookstore-6d336.appspot.com",
  messagingSenderId: "606539921977",
  appId: "1:606539921977:web:c55230c530cd7dd8362be8",
};

export const useFirebase = () => useContext(FirebaseContext);
// firebase app create 
const FirebaseApp = initializeApp(firebaseConfig);

// create instance of auth,store, storege
const FirebaseAuth = getAuth(FirebaseApp);
const FireStore = getFirestore(FirebaseApp);
const Storage = getStorage(FirebaseApp);

export const FirebaseProvider = (props) => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  // for SignUp
  const signupwitheEmailandPassword = (email, password) =>
    createUserWithEmailAndPassword(FirebaseAuth, email, password);

  // for SignIn
  const signinwithEmailandPass = (email, password) =>
    signInWithEmailAndPassword(FirebaseAuth, email, password);

  // signup with Google
  const googleProvider = new GoogleAuthProvider();
  const signupwithGoogle = () => signInWithPopup(FirebaseAuth, googleProvider);

  // Logout
  const logout = async () => {
    try {
      await FirebaseAuth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // create new list

  // console.log(user);

  const handleCreateNewListing = async (username,name, isbn, price, cover) => {
    
    const imgRef = ref(Storage, `uploads/images/${Date.now()}-${cover.name}`);
    const uploadResult = await uploadBytes(imgRef, cover);
    return await addDoc(collection(FireStore, "books"), {
      username,
      name,
      isbn,
      price,
      imageUrl: uploadResult.ref.fullPath,
      userID: user.uid,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
    });
  };

// get all books from firestore storege
  const listAllBook = async () => {
    return await getDocs(collection(FireStore, "books"));
  };
  // get image form firestore
  const getImgURL = (path) => {
    return getDownloadURL(ref(Storage, path));
  };
  
  // get book by id
  const getBookById= async (id)=>{
  const docRef=doc(FireStore,'books',id);
  const result = await getDoc(docRef);
  return result;
  }

  // order placed

  const placeOrder =async (bookId,qty)=>{
    const collectionRef=collection(FireStore,"books",bookId,"orders");
    const res= await addDoc(collectionRef,{
      userID: user.uid,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      qty:Number(qty)

    });
    return res;
  };

  // fetch own book 

  const fetchMyBooks= async(userId)=>{
    
   const collectionRef=collection(FireStore,"books");
   const q=query(collectionRef,where('userID','==',userId));
   const result=await getDocs(q);
   return result;
  }

  // get Order Book

  const getOrders= async (bookId)=>{
    const collectionRef=collection(FireStore,"books",bookId,"orders");
    const res= await getDocs(collectionRef);
    return res;
  }

  const isLoggedUser = user ? true : false;

  return (
    <FirebaseContext.Provider
      value={{
        signupwitheEmailandPassword,
        signinwithEmailandPass,
        signupwithGoogle,
        handleCreateNewListing,
        logout,
        listAllBook,
        getImgURL,
        getBookById,
        placeOrder,
        fetchMyBooks,
        isLoggedUser,
        getOrders,
        user
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
