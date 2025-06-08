interface AuthProviderInfo {
    name: string;
    displayName: string;
    state: string;
    authURL: string;
    codeVerifier: string;
    codeChallenge: string;
    codeChallengeMethod: string;
}

export interface AuthMethodInfo {
    enabled: boolean;
    duration?: number;
    identityFields?: Array<string>;
    providers?: Array<AuthProviderInfo>;
}
