import { useAuth } from "./hooks/AuthProvider";
import { Logout } from "./Logout";

import '../styles/header.css'

export const Header = () => {
    const auth = useAuth();
    return (
        <header>
            <h1><a href="/">Zakupy Nie Do Dupy</a></h1>
            {auth.isLoggedIn && <Logout />}
        </header>
    )
};
