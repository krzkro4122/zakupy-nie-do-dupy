import { useAuth } from "./hooks/AuthProvider";
import { UserMenu } from "./UserMenu";

import './styles/header.css'

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
                            <li><a className="header-link" href="/cart">Cart</a></li>
                        </ul>
                    </nav>
                    <UserMenu />
                </>
            }
        </header>
    )
};
