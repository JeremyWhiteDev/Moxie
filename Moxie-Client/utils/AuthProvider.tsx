import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

import { getCookie } from 'cookies-next';
import { User } from './authUtils';

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

//TODO: get the cookie to fetch server-side
// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {

//     const user = JSON.parse(getCookie('moxieUser', { req, res }) as string) as User;


//     return { notFound: true };
// };


export const AuthProvider = ({ ...props }) => {
    const [userCookie, setUserCookie] = useState<User>()

    useEffect(() => {
        console.log(value)
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