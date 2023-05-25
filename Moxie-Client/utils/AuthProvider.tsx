import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

import { getCookie } from 'cookies-next';
import { User } from './authUtils';
import { GetServerSideProps } from 'next';

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
    const [userCookie, setUserCookie] = useState<User>()

    useEffect(() => {
        //cookie is bridge to persisting data and for user to experience persistent sign on.
        const user = JSON.parse(getCookie('moxieUser') as string) as User;
        setUserCookie(user)
    }, [])


    const value = useMemo(
        () => ({
            user: userCookie,
            userLoading: userCookie === null,
        }),
        [userCookie],
    );
    return <AuthContext.Provider value={value} {...props} />;
};

type authProvider = {
    user: User | undefined,
    userLoading: boolean

}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};