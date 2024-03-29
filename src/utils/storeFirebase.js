import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// const firebaseConfig = {
//     apiKey: "AIzaSyBG54IYXYm9VXQeLVUF-a4Z7PjRhB-qMGw",
//     authDomain: "sbux-partners.firebaseapp.com",
//     projectId: "sbux-partners",
//     storageBucket: "sbux-partners.appspot.com",
//     messagingSenderId: "855233900597",
//     appId: "1:855233900597:web:3e02d55313eace6ec7817c",
//     measurementId: "G-LY060SYC7Q"
//   };
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
console.log(analytics)
async function storeMessage(message) {
    try {
      const feedbacksCollection = collection(db, "preinscripcion");
      const docRef = await addDoc(feedbacksCollection, {
        message: message,
        timestamp: new Date().toISOString() 
      });
      console.log("Document written with ID: ", docRef);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


export { db, storeMessage };
