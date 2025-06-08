import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../Button";
import { listCollectionAuthMethods } from "../../utilities/authentication";
import { useAuth } from "../hooks/AuthProvider";
import { BorderedSection } from "../BorderedSection";
import { type AuthMethodInfo } from "../../../../shared/types/authentication";

import '../../styles/login.css'

type AuthMethodName = 'mfa' | 'otp' | 'password' | 'oauth2' | 'manual';

export const Login = () => {
    const auth = useAuth();
    const [authMethodsList, setAuthMethodsList] = useState<[AuthMethodName, AuthMethodInfo][]>()

    useEffect(() => {
        if (!authMethodsList || authMethodsList?.length === 0) {
            (async () => {
                let authMethodsList: [AuthMethodName, AuthMethodInfo][] = [];
                const authMethods = await listCollectionAuthMethods('users');
                if (authMethods) {
                    authMethodsList.push(...Object.entries(authMethods) as [AuthMethodName, AuthMethodInfo][]);
                }
                authMethodsList.push(['manual', { enabled: true }]);
                setAuthMethodsList(authMethodsList);
            })()
        }
    });

    const getAuthMethods = () => {
        if (authMethodsList) {
            return authMethodsList.map(([methodName, config]) => {
                return (
                    <li key={methodName}>
                        <Button
                            extraClassNames="button-bordered button-expanded"
                            displayValue={methodName}
                            disabled={!config.enabled}
                            onClick={() =>  auth.loginAction(methodName)}
                        >
                        </Button>
                    </li>
                )
            });
        }
    }

    return auth.isLoggedIn ? <Navigate to={'/'} /> : (
        <BorderedSection extraClassNames="login">
            <h1>Log in</h1>
            {authMethodsList && (<ul>
                {getAuthMethods()}
            </ul>)}
        </BorderedSection>
    );
};
