import { useAuth } from "./hooks/AuthProvider";
import { Logout } from "./Logout";

import '../styles/header.css'

export const Header = () => {
    const auth = useAuth();
    return (
        <header className="header">
            <h1 className="header-title"><a className="header-link" href="/">Zakupy Nie Do Dupy</a></h1>
            {auth.isLoggedIn &&
                <>
                    <nav className="header-nav">
                        <ul className="header-nav-list">
                            <li><a className="header-link" href="/products">Products</a></li>
                    <li><a className="header-link" href="/shopping-list">Shopping List</a></li>
                </ul>
                </nav>
                    <Logout />
                </>
            }
        </header>
    )
};
