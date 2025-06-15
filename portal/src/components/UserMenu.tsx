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

    const getUserDetails = () => {
        if (user) {
            return (
                <div className="user-details">
                    <p className="user-details-name">{user.name}</p>
                    <hr className="user-details-separator" />
                    <p className="user-details-email"><span className="user-details-label">Email:</span> <span className="user-details-email-text">{user.email}</span></p>
                    <p className="user-details-created"><span className="user-details-label">Joined:</span> {user.created.slice(0, 16)}</p>
                    <hr className="user-details-separator" />
                </div>
            );
        }
    }

    return (
        <Menu className="user-menu" direction="left" align="start" gap={12} menuButton={
            <MenuButton>
                <img className="user-avatar" src={getUserAvatarUrl()} alt="User avatar" />
            </MenuButton>
        } transition>
            <MenuItem className="user-menu-item">{getUserDetails()}</MenuItem>
            <MenuItem className="user-menu-item user-menu-item-clickable" onClick={auth.logoutAction}>Logout</MenuItem>
        </Menu>
    );
};
