import React, { useContext, useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import { 
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import { addDoc, collection, updateDoc } from "firebase/firestore";
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
        // store photo
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
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}