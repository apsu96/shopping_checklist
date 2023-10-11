import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HeaderContainer, LinkButton } from "./Header.styled";
import { Text } from "./UIKit.styled";
import { observer } from "mobx-react-lite";
import store from "../Store";
import { TextButton } from "./UIKit.styled";

const Header = observer(() => {
  const [currentPage, setCurrentPage] = useState({
    checkList: true,
    shoppingList: false,
    signin: false,
  });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname.includes("shoppingList")) {
      setCurrentPage({
        checkList: false,
        shoppingList: true,
        signin: false,
      });
    } else if (location.pathname.includes("signin")) {
      setCurrentPage({
        checkList: false,
        shoppingList: false,
        signin: true,
      });
    } else {
      setCurrentPage({
        checkList: true,
        shoppingList: false,
        signin: false,
      });
    }
  }, [location.pathname]);
  return (
    <HeaderContainer>
      <LinkButton to="/" current={currentPage.checkList.toString()}>
        <Text>Checklist</Text>
      </LinkButton>
      <LinkButton
        to="/shoppingList"
        current={currentPage.shoppingList.toString()}
      >
        <Text>Shopping List</Text>
      </LinkButton>
      {!store.user ? (
        <LinkButton to="/signin" current={currentPage.signin.toString()}>
          <Text>Sign in</Text>
        </LinkButton>
      ) : (
        <>
          <Text>{store.user}</Text>
          <TextButton
            onClick={() => {
              store.logoutUser();
              navigate("/signin");
            }}
          >
            Log out
          </TextButton>
        </>
      )}
    </HeaderContainer>
  );
});

export default Header;
