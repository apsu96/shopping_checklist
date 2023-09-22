import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HeaderContainer, LinkButton } from "./Header.styled";
import { Text } from "./UIKit.styled";

const Header = () => {
  const [currentPage, setCurrentPage] = useState({
    checkList: true,
    shoppingList: false,
    signin: false,
  });
  const location = useLocation();

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
      <LinkButton to="/signin" current={currentPage.signin.toString()}>
        <Text>Sign in</Text>
      </LinkButton>
    </HeaderContainer>
  );
};

export default Header;
