import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import { 
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { addDoc, collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { projectStorage, projectFirestore as db } from "../../firebase/config";

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}



export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState()

    function signup(photo, username, email, password, isBusiness) {
        const storageRef = ref(projectStorage, photo.name)
        uploadBytes(storageRef, photo).then(async (snapshot) => {
            const collectionRef = collection(db, 'users')
            const profilURL = await getDownloadURL(storageRef)
            const docRef = await addDoc(collectionRef, { profilURL, username, email, isBusiness })
            await updateDoc(docRef, { Id: docRef.id })
            return createUserWithEmailAndPassword(auth, email, password)
        }).catch(err => {
            console.log(err.message);
            return
        })
    }

    async function login(username, password) {
        let email = ''
        const q = query(collection(db, 'users'), where('username', '==', username))
        const querySnapshots = await getDocs(q)
        querySnapshots.forEach((snapshot) => {
            let doc = snapshot._document.data.value.mapValue.fields
            email = doc.email.stringValue
        })
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }

    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsuscribe
    }, [])

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}