import React, {
    createContext,
    useContext,
    useMemo,
} from 'react';

import { GetServerSideProps } from 'next';
import { getCookie } from 'cookies-next';
import { User } from './authUtils';

const AuthContext = createContext({
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

export const getServerSideProps: GetServerSideProps = async (context) => {

    const user = JSON.parse(getCookie('moxieUser', context) as string) as User;


    return { props: { user } };
};


export const AuthProvider = (props: any, { user }: Props) => {


    const value = useMemo(
        () => ({
            user,
            userLoading: user === null,
        }),
        [],
    );

    return <AuthContext.Provider value={value} {...props} />;
};

type Props = {
    user: User
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
