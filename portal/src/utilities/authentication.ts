import Pocketbase from 'pocketbase';

export interface UserAuthInformation {
    isLoggedIn: boolean;
}

const pbConnection = new Pocketbase('http://localhost:8090');

const LOCAL_STORAGE_TOKEN_KEY = 'provider';

export const login = async (authMethod: string, credentials?: any) => {
    let authInformation: UserAuthInformation;
    let authResponse: any;
    switch (authMethod) {
        case 'manual':
            authInformation = { isLoggedIn: true }
            break
        case 'oauth':
            authResponse = await pbConnection.collection('users').authWithOAuth2({ provider: 'google' });
            console.log(authResponse);
            authInformation = {isLoggedIn: !!pbConnection.authStore.isValid}
            break
        default:
            authResponse = await pbConnection.collection('users').authWithPassword(credentials.email, credentials.password);
            console.log(authResponse);
            authInformation = { isLoggedIn: !!pbConnection.authStore.isValid }
            break
    }
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(authInformation));
    return authInformation;
};

export const logout = () => {
    try {
        pbConnection.authStore.clear();
    } catch (e) {}
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
};

export const getUserAuthInformation = () => {
    const rawData = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (rawData) {
        const authInformation: UserAuthInformation = JSON.parse(rawData);
        return authInformation
    }
};

export const listCollectionAuthMethods = async (collectionName: string) => {
    return await pbConnection.collection(collectionName).listAuthMethods();
}
