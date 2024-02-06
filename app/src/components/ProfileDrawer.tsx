import { Drawer } from "@mui/material";
import {
  CloseIconContainer,
  DrawerContainer,
  ItemLink,
  ItemLinkContainer,
  ItemsContainer,
  LogoutButton,
  UsernameContainer,
  profileDrawerWidth,
} from "./ProfileDrawer.styled";
import { IconButton, Text, Title } from "./UIKit.styled";
import { observer } from "mobx-react-lite";
import store from "../store/Store";
import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingList } from "../App";
import uuid from "react-uuid";
import AddIcon from "@mui/icons-material/Add";
import User from "../images/User.png";
import CloseIcon from "@mui/icons-material/Close";
import { createShoppingList } from "../api";

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
  const location = useLocation();

  function logUserOut() {
    store.logoutUser();
    navigate("/signin");
  }

  function closeDrawer() {
    setIsOpen(false);
  }

  return (
    <Drawer
      sx={{ width: profileDrawerWidth }}
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <DrawerContainer>
        <CloseIconContainer onClick={closeDrawer}>
          <CloseIcon />
        </CloseIconContainer>
        <UsernameContainer>
          <img src={User} alt="user" width={100} height={80} />
          <Title>{store.user || "Offline"}</Title>
        </UsernameContainer>
        <ItemsContainer>
          {shoppingLists.map((list) => (
            <ItemLinkContainer key={uuid()}>
              <ItemLink
                to={`/${list.id}`}
                onClick={() => {
                  setIsOpen(false);
                }}
                variant={
                  location.pathname.includes(list.id) ? "active" : undefined
                }
              >
                <Text>{list.name}</Text>
              </ItemLink>
            </ItemLinkContainer>
          ))}
        </ItemsContainer>
        <IconButton onClick={() => createShoppingList()}>
          <AddIcon />
        </IconButton>
        {store.user && (
          <LogoutButton onClick={logUserOut}>
            <Text>Logout</Text>
          </LogoutButton>
        )}
      </DrawerContainer>
    </Drawer>
  );
};

export default observer(ProfileDrawer);
