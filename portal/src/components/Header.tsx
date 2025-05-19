import { Logout } from "./Logout";

interface HeaderProps {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: React.SetStateAction<boolean>) => void
};

export const Header = ({isLoggedIn, setIsLoggedIn}: HeaderProps) => {
    return (
        <header className="border-b-1 p-2 px-4 text-2xl flex justify-between items-center">
            <h1 className="font-bold m-1 p-2">Zakupy Nie Do Dupy</h1>
            {isLoggedIn && <Logout setIsLoggedIn={setIsLoggedIn} />}
        </header>
    )
};
