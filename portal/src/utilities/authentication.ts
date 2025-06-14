import { ClientResponseError, type AuthMethodsList, type RecordAuthResponse, type RecordModel } from 'pocketbase';
import { Config } from './config';

const pbConnection = Config.getPbConnection();

export type AuthMethodList = AuthMethodsList;
export type AuthResponse = RecordAuthResponse<RecordModel>;


export const login = async (authMethod: string, credentials?: any) => {
    let authResponse: RecordAuthResponse<RecordModel>;
    switch (authMethod) {
        case 'oauth':
            authResponse = await pbConnection.collection('users').authWithOAuth2({ provider: 'google' });
            break
        default:
            authResponse = await pbConnection.collection('users').authWithPassword(credentials.email, credentials.password);
            break
    }
    return authResponse;
};

export const logout = () => {
    try {
        pbConnection.authStore.clear();
    } catch (e) {
        console.error(e);
    }
};

export const isUserLoggedIn = () => {
    if (pbConnection.authStore.isValid) {
        return true;
    }
    logout();
    return false;
};

export const listCollectionAuthMethods = async (collectionName: string) => {
    try {
        return await pbConnection.collection(collectionName).listAuthMethods();
    } catch (e) {
        if (e instanceof ClientResponseError) {
            if (!e.isAbort) {
                console.error(`Failed to list auth methods for collection: ${collectionName}`, e);
            }
        }

    }
}
