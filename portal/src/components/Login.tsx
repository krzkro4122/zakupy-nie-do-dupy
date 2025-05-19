import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { login } from "../utilities/authentication";

interface LoginProps {
    setIsLoggedIn: (value: React.SetStateAction<boolean>) => void;
}

export const Login = ({ setIsLoggedIn }: LoginProps) => {
    const navigate = useNavigate();
    return (
        <>
            <Button
                onClick={async () => {
                    const authInformation = await login();
                    if (authInformation.isLoggedIn) {
                        navigate("/");
                        setIsLoggedIn(true);
                    }
                }}
                displayValue="Log in"
            ></Button>
        </>
    );
};
