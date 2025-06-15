import { getUser } from "../utilities/authentication";

import { useAuth } from "./hooks/AuthProvider";
import { Config } from "../utilities/config";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";

const pbConnection = Config.getPbConnection();

export const UserMenu = () => {
    const auth = useAuth();
    const user = getUser();
    const getUserAvatarUrl = () => {
        if (user) {
            return pbConnection.files.getURL(user, user.avatar);
        }
    }

    return (
        <Menu className="user-menu" direction="left" align="start" gap={12} menuButton={
            <MenuButton>
                <img className="user-avatar" src={getUserAvatarUrl()} alt="User avatar" />
            </MenuButton>
        } transition>
            <MenuItem className="user-menu-item" onClick={auth.logoutAction}>Logout</MenuItem>
        </Menu>
    );
};
