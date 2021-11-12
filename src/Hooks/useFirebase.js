import { useEffect, useState } from 'react';
import initializeFirebase from '../Pages/Authentication/Login/Firebase/firebase.init';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import axios from 'axios';

initializeFirebase()

const useFirebase = () => {
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [authError, setAuthError] = useState("")
    const [admin, setAdmin] = useState(false)
    const auth = getAuth()


    const registerUser = (email, password, history, name) => {
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const newUser = { email, displayName: name }
                // console.log(newUser)
                storeUser(email, name)
                // Updating DisplayName
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                    // Profile updated!
                    // ...
                }).catch((error) => {
                    // An error occurred
                    // ...
                });
                history.replace("/");
                setAuthError("")
                // ...
            })
            .catch((error) => {
                setAuthError(error.message);
                // ..
            })
            .finally(() => setIsLoading(false))
    }

    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                console.log(result.user)
                const destination = location?.state?.from || '/';
                history.replace(destination);
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);

            } else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, [])

    const logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
            authError(error.message)
        })
            .finally(() => setIsLoading(false))
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/users/${user.email}`)
            .then(res => {
                console.log(res.data.admin)
                setAdmin(res.data.admin)
            })
    }, [user.email])
    // console.log(admin)

    const storeUser = (email, displayName) => {
        const user = { email, displayName }
        axios.post("http://localhost:5000/users", user)
            .then(data => console.log(data.data))
    }

    return {
        registerUser, admin, user, isLoading, authError, loginUser, logout
    };
};

export default useFirebase;