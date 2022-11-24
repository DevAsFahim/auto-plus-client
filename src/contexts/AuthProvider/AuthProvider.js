import React from 'react';
import { createContext } from 'react';
import { 
    createUserWithEmailAndPassword, 
    getAuth, 
    GithubAuthProvider, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut, 
    updateProfile 
} from 'firebase/auth'
import { useState } from 'react';
import { useEffect } from 'react';
import app from '../../firebase/firebase.config';

export const AuthContext = createContext();


const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // create new user with email and password
    const createUser = (email, password) => {
        setLoading(false)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // add user profile picture and name
    const updateUserProfile = (profile) => {
        setLoading(false)
        return updateProfile(auth.currentUser, profile)
    }

    // load user information
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        });

        return () => {
            unsubscribe()
        }
    }, [])

    // user login
    const userLogIn = (email, password) => {
        setLoading(false)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // login with google 
    const createUserWithGoogle = () => {
        setLoading(false)
        return signInWithPopup(auth, googleProvider)
    }

    // login with github
    const createUserWithGithub = () => {
        setLoading(false)
        return signInWithPopup(auth, githubProvider)
    }

    // log out user
    const logOut = () => {
        setLoading(false)
        return signOut(auth)
    }

    const authInfo = { 
        user,
        createUser, 
        createUserWithGoogle, 
        logOut, 
        userLogIn, 
        createUserWithGithub, 
        updateUserProfile,
        loading,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;