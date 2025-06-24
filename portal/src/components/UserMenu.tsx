import { getUser } from "../utilities/authentication";

import { useAuth } from "./hooks/AuthProvider";
import { Config } from "../utilities/config";
import { Menu, MenuButton, MenuDivider, MenuHeader, MenuItem, type ClickEvent, type EventHandler } from "@szhsin/react-menu";

const pbConnection = Config.getPbConnection();

export const UserMenu = () => {
    const auth = useAuth();
    const user = getUser();
    const getUserAvatarUrl = () => {
        if (user) {
            return pbConnection.files.getURL(user, user.avatar);
        }
    }

    const keepOpenClickHandler = (e: ClickEvent) => {
      e.stopPropagation = true;
      e.keepOpen = true;
    }

    return (
        <Menu className="user-menu" direction="left" align="start" gap={12}  menuButton={
            <MenuButton>
                <img className="user-avatar" src={getUserAvatarUrl()} alt="User avatar" />
            </MenuButton>
        }>
            {user && (
                <>
                    <MenuHeader className="user-menu-item user-details-name">{user.name}</MenuHeader>
                    <MenuDivider className="user-menu-divider" />
                    <MenuItem onClick={keepOpenClickHandler} className="user-menu-item user-details-email"><span className="user-details-label">Email: </span><span className="user-details-email-text">{user.email}</span></MenuItem>
                    <MenuItem onClick={keepOpenClickHandler} className="user-menu-item user-details-created"><span className="user-details-label">Joined: </span>{user.created.slice(0, 16)}</MenuItem>
                </>
            )}
            <MenuItem className="user-menu-item user-menu-item-clickable" onClick={auth.logoutAction}>Logout</MenuItem>
        </Menu>
    );
};
