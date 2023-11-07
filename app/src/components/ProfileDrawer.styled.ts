import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const profileDrawerWidth = "220px";

export const DrawerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: ${profileDrawerWidth};
  background-color: rgba(198, 153, 37, 0.73);
  padding: 50px 15px;
  box-sizing: border-box;
`;

export const CloseIconContainer = styled.div`
  margin-left: auto;
  cursor: pointer;
  padding: 0;
  &:hover {
    opacity: 0.5;
  }
`;
export const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-top: 1px solid black;
  padding: 20px;
  margin-top: 30px;
`;

export const ItemLinkContainer = styled.div``;

export const ItemLink = styled(Link)<{ variant?: string }>`
  text-decoration: none;
  cursor: pointer;
  opacity: ${({ variant }: { variant?: string }) =>
    variant === "active" ? "1" : "0.5"};
`;

export const UsernameContainer = styled.div`
  text-align: center;
`;

export const LogoutButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  border-radius: 10px;
  background: transparent;
  padding: 8px 30px;
  outline: 0;
  border: none;
  cursor: pointer;
  transform: translateY(1px);
  margin-top: auto;
`;
