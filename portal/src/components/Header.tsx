import { useAuth } from "./hooks/AuthProvider";
import { Logout } from "./Logout";

export const Header = () => {
    const auth = useAuth();
    return (
        <header className="border-b-1 p-4 flex justify-between items-center">
            <h1 className="font-bold text-3xl p-2"><a href="/">Zakupy Nie Do Dupy</a></h1>
            {auth.isLoggedIn && <Logout />}
        </header>
    )
};
