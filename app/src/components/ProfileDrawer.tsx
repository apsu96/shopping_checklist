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
import React from "react";
import { ShoppingList } from "../App";
import uuid from "react-uuid";

const ProfileDrawer = ({
  isOpen,
  setIsOpen,
  shoppingLists,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  shoppingLists: ShoppingList[];
}) => {
  const navigate = useNavigate();

  function logUserOut() {
    store.logoutUser();
    navigate("/signin");
  }
  return (
    <Drawer
      sx={{ width: profileDrawerWidth }}
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <DrawerContainer>
        <UsernameContainer>
          <Text>{store.user || "Offline"}</Text>
        </UsernameContainer>
        {shoppingLists.map((list) => (
          <Text key={uuid()}>{list.name}</Text>
        ))}
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
