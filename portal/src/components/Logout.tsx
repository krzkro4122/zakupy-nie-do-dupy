import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { logout } from "../utilities/authentication";

interface LogoutProps {
    setIsLoggedIn: (value: React.SetStateAction<boolean>) => void;
}

export const Logout = ({ setIsLoggedIn }: LogoutProps) => {
    const navigate = useNavigate();
    return (
        <>
            <Button
                onClick={() => {
                    logout()
                    setIsLoggedIn(false);
                    navigate("/login");
                }}
                displayValue="Log out"
            ></Button>
        </>
    );
};
