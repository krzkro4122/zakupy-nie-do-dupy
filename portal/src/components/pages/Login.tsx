import { BorderedSection } from "../BorderedSection";
import { listCollectionAuthMethods, type AuthMethodList } from "../../utilities/authentication";
import { LoadingState } from "../LoadingState";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import { useEffect, useState } from "react";

import '../styles/login.css'
import '../styles/button.css'
import '../styles/inlineForm.css'

export const Login = () => {
    const auth = useAuth();
    const [authMethods, setAuthMethods] = useState<AuthMethodList>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            if (!authMethods && isLoading) {
                setIsLoading(false);
                setAuthMethods(await listCollectionAuthMethods('users'));
            }
        })()
    }, []);

    const handlePasswordLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        await auth.loginAction('password', { email, password });
    }

    const getLoginForm = () => {
        return isLoading ? (
            <LoadingState />
        ) : (
            authMethods ? (
                <form onSubmit={handlePasswordLoginSubmit} className="login-form">
                    <input className="login-form-input resizing-input resizing-input-bordered" type="text" name="email" placeholder="Email" />
                    <input className="login-form-input resizing-input resizing-input-bordered" type="password" name="password" placeholder="Password" />
                    <input className="login-form-button button button-bordered" type="submit" value="Log in" />
                </form>
            ) : (
                <p>No authentication methods found</p>
            )
        )
    }

    return auth.isLoggedIn ? <Navigate to={'/'} /> : (
        <BorderedSection extraClassNames="login">
            {getLoginForm()}
        </BorderedSection>
    );
};
