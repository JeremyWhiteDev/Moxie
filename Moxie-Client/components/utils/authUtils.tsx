import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    UserCredential,
    Auth,
} from 'firebase/auth';
import './Constants';
import {
    EMAIL_REGISTER,
    EMAIL_SIGN_IN,
    GOOGLE_SIGN_IN,
    ROUTE_CONSTANTS,
} from './Constants';

type userLogin = {
    email: string,
    password: string
}


// Register New User
export const authenticate = (userObj: userLogin, navigate: CallableFunction, signInMethod: string) => {
    const auth = getAuth();
    const userAuthObj = {};
    const provider = new GoogleAuthProvider();
    registerOrSignIn(userObj, auth, provider, signInMethod)
        .then((userCredResp) => handleFirebaseResponse(userCredResp, userAuthObj))
        .then((userExistsResp) =>
            handleUserExists(userExistsResp, navigate, userAuthObj)
        )
        .catch((error) => {
            console.log('Email Register Error');
            console.log('error code', error.code);
            console.log('error message', error.message);
        });
};

// Sign out
export const authsignOut = (navigate) => {
    const auth = getAuth();
    signOut(auth)
        .then(() => {
            // Remove the user from localstorage
            localStorage.removeItem('mooch_user');
            // Navigate us back to home
            navigate('/login');
            console.log('Sign Out Success!');
        })
        .catch((error) => {
            console.log('signOut Error');
            console.log('error code', error.code);
            console.log('error message', error.message);
        });
};

const registerOrSignIn = async (userObj: userLogin, auth: Auth, provider: GoogleAuthProvider, signInMethod: string): Promise<UserCredential> => {
    switch (signInMethod) {
        case EMAIL_REGISTER:
            return createUserWithEmailAndPassword(
                auth,
                userObj.email,
                userObj.password
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
            return signInWithEmailAndPassword(auth, userObj.email, userObj.password).then((resp) => {
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

const handleFirebaseResponse = (resp, userObj) => {
    userObj.email = resp.user.email;
    userObj.uid = resp.user.uid;
    userObj.accessToken = resp.user.accessToken;
    userObj.type = 'email';
    return doesUserExistInDb(resp.user.uid);
};

//check our API to ensure that the firebase user that was just logged exists in our local SQL database
const doesUserExistInDb = (firebaseUserId) => {
    return getToken().then((token) =>
        fetch(`${ROUTE_CONSTANTS.API_URL}/UserExists/${firebaseUserId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => resp.json())
    );
};

//extract token from firebase response and return it here
export const getToken = () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    if (!currentUser) {
        throw new Error('Cannot get current user. Did you forget to login?');
    }
    return currentUser.getIdToken();
};

const handleUserExists = (resp, navigate, userAuth) => {
    if (!resp.id) {
        //navigate to new user page.
        navigate('/createuser');
        localStorage.setItem('mooch_user', JSON.stringify(userAuth));
    } else {
        userAuth.id = resp.id;
        userAuth.username = resp.username;
        userAuth.imageUrl = resp.imageUrl;
        userAuth.subscriptionLevelId = resp.subscriptionLevelId;
        // Saves the user to localstorage
        localStorage.setItem('mooch_user', JSON.stringify(userAuth));
        // Navigate us back to home
        navigate('/');
    }
};