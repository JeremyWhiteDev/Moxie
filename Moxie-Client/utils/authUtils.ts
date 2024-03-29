import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    UserCredential,
    Auth,
    UserProfile,
    User,
} from 'firebase/auth';

import {
    EMAIL_REGISTER,
    EMAIL_SIGN_IN,
    GOOGLE_SIGN_IN,
} from './constants';
import { NextRouter } from 'next/router';
import { deleteCookie, setCookie } from 'cookies-next';
import firebase_app, { routeConstants } from './config';
import { UserRegister } from '@/pages/register';
import { getApps } from 'firebase/app';



export type UserLogin = {
    email: string,
    password: string,
    uid: string,
    accessToken: string,
    loginType: string
}

export type AppUser = {
    id: string,
    uid: string,
    firstName: string,
    lastName: string,
    imageUrl: string,
    dateCreated: Date,
    dateLastModified: Date,
    loginType: string
}

// Either signin or register a user.
export const authenticate = (userLogin: UserLogin | UserRegister, router: NextRouter, signInMethod: string) => {
    const auth = getAuth(firebase_app);
    const provider = new GoogleAuthProvider();
    setCookie("moxieUser", JSON.stringify(userLogin));
    registerOrSignIn(userLogin, auth, provider, signInMethod)
        .then((userCredResp) => handleFirebaseResponse(userCredResp, userLogin as UserLogin))
        .then((userExistsResp) =>
            handleUserExists(userExistsResp, userLogin as UserRegister, router)
        )
        .catch((error) => {
            console.log('Email Register Error');
            console.log('error code', error.code);
            console.log('error message', error.message);
        });
};

// Sign out
export const authsignOut = (router: NextRouter) => {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
            // Remove the user from localstorage
            localStorage.removeItem('mooch_user');
            deleteCookie("moxieUser")
            router.push("/signin")
            // router us back to home
            console.log('Sign Out Success!');
        })
        .catch((error) => {
            console.log('signOut Error');
            console.log('error code', error.code);
            console.log('error message', error.message);
        });
};

const registerOrSignIn = async (userLogin: UserLogin | UserRegister, auth: Auth, provider: GoogleAuthProvider, signInMethod: string): Promise<UserCredential> => {
    switch (signInMethod) {
        case EMAIL_REGISTER:
            return createUserWithEmailAndPassword(
                auth,
                userLogin.email,
                userLogin.password
            );
        case GOOGLE_SIGN_IN:
            return signInWithPopup(auth, provider).then((resp) => {
                if (resp.user.email) {
                    return resp
                } else {
                    return Promise.reject(new Error(`No User found`))
                }
            });
        case EMAIL_SIGN_IN:
            return signInWithEmailAndPassword(auth, userLogin.email, userLogin.password).then((resp) => {
                if (resp.user.email) {
                    return resp
                } else {
                    return Promise.reject(new Error(`No User found`))
                }
            });
        default:
            return Promise.reject(new Error(`No User found`))
    }
};

const handleFirebaseResponse = async (resp: UserCredential, userLogin: UserLogin): Promise<AppUser> => {
    userLogin.email = resp.user.email ? resp.user.email : ""
    userLogin.uid = resp.user.uid;
    userLogin.accessToken = await resp.user.getIdToken();
    userLogin.loginType = 'email';
    return doesUserExistInDb(resp.user.uid);
};

//check our API to ensure that the firebase user that was just logged exists in our local SQL database
export const doesUserExistInDb = async (firebaseUserId: string): Promise<AppUser> => {
    return getToken().then(() =>
        fetch(`${routeConstants.apiUrl}/User?uid=${firebaseUserId}`, {
            method: 'GET',
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },
        }).then((resp) => resp.json())
            .catch((error) => {
                const auth = getAuth();
                //auth.signOut()
                console.log('Sign In Error');
                console.log('error code', error.code);
                console.log('error message', error.message);
            })
    );
};

//extract token from firebase response and return it here
//TODO: use getToken to put the currect token in any of the api responses. Move all api responses to a data access layaer or make them accessible with custom functions.
export const getToken = () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) {
        throw new Error('Cannot get current user. Did you forget to login?');
    }
    return currentUser.getIdToken();
};

export const handleUserExists = async (userResp: AppUser, userLogin: UserRegister, router: NextRouter) => {
    if (!userResp?.id) {
        const newUser = {
            firstName: userLogin.firstName,
            lastName: userLogin.lastName,
            uid: userLogin.uid,
            imageUrl: userLogin.imageUrl,
            dateCreated: new Date(),
            dateLastModified: new Date()
        } as AppUser
        const resp = await fetch(`${routeConstants.apiUrl}/User`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newUser)
        })
        if (resp.ok) {
            router.push('/skills');

        }
        //Route to new user page.
    } else {
        // Saves the user to localstorage
        setCookie("moxieUser", JSON.stringify(userResp));
        // Route us back to home
        router.push('/skills');
    }
};
