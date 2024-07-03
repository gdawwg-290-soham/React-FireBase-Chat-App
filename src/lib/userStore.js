import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const useUserStore = create((set) => ({
    currentUser: null, //initially user is none
    isLoading: true, // when state changes it is going to show false, intilly true
    fetchUserInfo: async (uid) => { //fetchUserInfo operation of uid(user.uid)from app.js
      if (!uid) return set({ currentUser: null, isLoading: false });
  
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          set({ currentUser: docSnap.data(), isLoading: false });
        } else {
          set({ currentUser: null, isLoading: false });
        }
      } catch (err) {
        console.log(err); 
        return set({ currentUser: null, isLoading: false });
      }
    },
  }));