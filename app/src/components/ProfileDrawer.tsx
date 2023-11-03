import { Drawer } from "@mui/material";
import {
  DrawerContainer,
  LogoutButton,
  UsernameContainer,
  profileDrawerWidth,
} from "./ProfileDrawer.styled";
import { Text } from "./UIKit.styled";
import { observer } from "mobx-react-lite";
import store from "../Store";
import logout from "../images/Logout.png";
import { useNavigate } from "react-router-dom";
const ProfileDrawer = () => {
  const navigate = useNavigate();

  function logUserOut() {
    store.logoutUser();
    navigate("/signin");
  }
  return (
    <Drawer variant="permanent" sx={{ width: profileDrawerWidth }}>
      <DrawerContainer>
        <UsernameContainer>
          <Text>{store.user || "Offline"}</Text>
        </UsernameContainer>
        {store.user && (
          <LogoutButton onClick={logUserOut}>
            <Text>Logout</Text>
            <img src={logout} alt="logout" width={16} height={20} />
          </LogoutButton>
        )}
      </DrawerContainer>
    </Drawer>
  );
};

export default observer(ProfileDrawer);
