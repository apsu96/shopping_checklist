import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { HeaderContainer, LinkButton } from "./Header.styled";

const Text = styled.p``;

const Header = () => {
  const [currentPage, setCurrentPage] = useState({
    checkList: true,
    shoppingList: false,
  });
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("shoppingList")) {
      setCurrentPage({
        checkList: false,
        shoppingList: true,
      });
    } else {
      setCurrentPage({
        checkList: true,
        shoppingList: false,
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
    </HeaderContainer>
  );
};

export default Header;
