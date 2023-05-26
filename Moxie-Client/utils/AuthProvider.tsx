import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

import {
    getAuth,
} from 'firebase/auth';

import { getCookie, setCookie } from 'cookies-next';
import { User, doesUserExistInDb } from './authUtils';
import { GetServerSideProps } from 'next';
import firebase_app from './config';
import { useRouter } from 'next/router';

const AuthContext = createContext<authProvider>({
    user: {
        id: "",
        uid: "",
        firstName: "",
        lastName: "",
        imageUrl: "",
        dateCreated: new Date,
        dateLastModified: new Date,
        loginType: ""
    },
    userLoading: true
});



export const AuthProvider = ({ ...props }) => {
    const [userCookie, setUserCookie] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState<boolean | null>(null)

    const router = useRouter()
    //I need three states for userLoading. false, null,  true
    //

    useEffect(() => {
        //cookie is bridge to persisting data and for user to experience persistent sign on.


        getAuth(firebase_app).onAuthStateChanged(async (fbUser) => {
            if (fbUser) {
                const resp = await doesUserExistInDb(fbUser.uid)
                if (!resp.id) {
                    //Route to new user page.
                    router.push('/createuser');
                    setCookie("moxieUser", JSON.stringify(resp));
                } else {
                    // Saves the user to localstorage
                    setCookie("moxieUser", JSON.stringify(resp));
                    // Route us back to home
                    router.push('/');
                }

                setUserCookie(resp)
                setIsLoading(false)
            } else {
                setUserCookie(null);
            }
        })

    }, [])


    const value = useMemo(
        () => ({
            user: userCookie,
            userLoading: isLoading,
        }),
        [userCookie],
    );
    return <AuthContext.Provider value={value} {...props} />;
};

type authProvider = {
    user: User | null,
    userLoading: boolean | null

}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};