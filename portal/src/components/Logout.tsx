import { Button } from "./Button";
import { useAuth } from "./hooks/AuthProvider";

export const Logout = () => {
    const auth = useAuth();
    return (
        <>
            <Button
                onClick={auth.logoutAction}
                displayValue="Log out"
            ></Button>
        </>
    );
};
