import { Button } from "./Button";
import { listCollectionAuthMethods } from "../utilities/authentication";
import { useEffect, useState } from "react";
import { useAuth } from "./hooks/AuthProvider";
import { Navigate } from "react-router-dom";
import { BorderedSection } from "./Sections";

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
                    <li key={methodName} className="flex gap">
                        <Button className="grow" displayValue={methodName} disabled={!config.enabled} onClick={
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

    return auth.isLoggedIn ? <Navigate to={'/'}/> : (
        <BorderedSection>
            <h1 className="text-2xl mb-2">Log in</h1>
            {authMethodsList && (<ul className="w-60 flex flex-col gap-2">
                {getAuthMethods()}
            </ul>)}
        </BorderedSection>
    );
};
