import { ClientResponseError, type AuthMethodsList, type RecordAuthResponse, type RecordModel } from 'pocketbase';
import { Config } from './config';

const pbConnection = Config.getPbConnection();

export type AuthMethodList = AuthMethodsList;
export type AuthResponse = RecordAuthResponse<RecordModel> | undefined;
export type AuthError = ClientResponseError | undefined;
export type AuthResult = {
    data: AuthResponse;
    error: AuthError;
};

export const login = async (authMethod: string, credentials?: any): Promise<AuthResult | undefined> => {
    try {
        switch (authMethod) {
            case 'oauth':
                return { data: await pbConnection.collection('users').authWithOAuth2({ provider: 'google' }), error: undefined };
            default:
                return { data: await pbConnection.collection('users').authWithPassword(credentials.email, credentials.password), error: undefined };
        }
    } catch (error) {
        if (error instanceof ClientResponseError) {
            if (!error.isAbort) {
                console.error(`Failed to login with auth method: ${authMethod}`, error);
            }
            return { data: undefined, error };
        }}
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



export const getUser = () => {
    if (pbConnection.authStore.isValid) {
        return pbConnection.authStore.record;
    }
    logout();
    return undefined;
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
