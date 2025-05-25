import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../Button";
import { listCollectionAuthMethods } from "../../utilities/authentication";
import { useAuth } from "../hooks/AuthProvider";
import { BorderedSection } from "../BorderedSection";

import '../../styles/login.css'

export const Login = () => {
    const auth = useAuth();
    const [authMethodsList, setAuthMethodsList] = useState<[string, any][]>()

    useEffect(() => {
        if (!authMethodsList || authMethodsList?.length === 0) {
            (async () => {
                const authMethods = await listCollectionAuthMethods('users');
                if (authMethods) {
                    (authMethods as any).manual = { enabled: true }
                    setAuthMethodsList(Object.entries(authMethods));
                }
            })()
        }
    });

    const getAuthMethods = () => {
        if (authMethodsList) {
            return authMethodsList.map(([methodName, config]) => {
                return (
                    <li key={methodName}>
                        <Button extraClassNames="expanded-button" displayValue={methodName} disabled={!config.enabled} onClick={
                            () => {
                                if (methodName === 'manual') {
                                    auth.loginAction(methodName)
                                } else {
                                    alert(`Using ${methodName} to auth!`)
                                }
                            }
                        } ></Button>
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
