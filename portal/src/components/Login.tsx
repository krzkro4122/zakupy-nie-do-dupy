import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { listCollectionAuthMethods, login } from "../utilities/authentication";
import { useEffect, useState } from "react";

interface LoginProps {
    setIsLoggedIn: (value: React.SetStateAction<boolean>) => void;
}

export const Login = ({ setIsLoggedIn }: LoginProps) => {
    const navigate = useNavigate();
    const [authMethodsList, setAuthMethodsList] = useState<[string, any][]>();

    const loginAction = async (authMethod: string) => {
        const authInformation = await login(authMethod);
        if (authInformation.isLoggedIn) {
            navigate("/");
            setIsLoggedIn(true);
        }
    }

    useEffect(() => {
        (async () => {
            const authMethods = await listCollectionAuthMethods('users');
            if (authMethods) {
                (authMethods as any).manual = {enabled: true}
                setAuthMethodsList(Object.entries(authMethods));
            }
        })()
    });

    const getAuthMethodList = () => {
        if (authMethodsList) {
            return authMethodsList.map(([methodName, config]) => {
                return (
                <li key={methodName} className="flex gap">
                    <Button className="grow" displayValue={methodName} disabled={!config.enabled} onClick={
                        () => {
                            if (methodName === 'manual') {
                                loginAction(methodName)
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

    return (
        <section className="">
            <section className="border-gray-100/50 border-1 rounded-md p-2 flex flex-col items-center">
                <h1 className="text-2xl mb-2">Log in</h1>
                {authMethodsList && (<ul className="w-60 flex flex-col gap-2">
                    {getAuthMethodList()}
                </ul>)}
            </section>
        </section>
    );
};
