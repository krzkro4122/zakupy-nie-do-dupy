import Pocketbase from 'pocketbase';

interface AuthInformation {
    isLoggedIn: boolean;
}

const pbConnection = new Pocketbase('http://localhost:8090');

const LOCAL_STORAGE_TOKEN_KEY = 'provider';

export const login = async () => {
    const authData = await pbConnection.collection('users').authWithOAuth2({ provider: 'google' });
    console.log(authData);
    console.log(pbConnection.authStore.isValid);
    console.log(pbConnection.authStore.token);
    console.log(pbConnection.authStore.record?.id);
    const authInformation: AuthInformation = {
        isLoggedIn: true,
    }
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, JSON.stringify(authInformation));
    return authInformation;
};

export const logout = () => {
    pbConnection.authStore.clear();
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
};

export const getAuthInformation = () => {
    const rawData = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (rawData) {
        const authInformation: AuthInformation = JSON.parse(rawData);
        return authInformation
    }
};
