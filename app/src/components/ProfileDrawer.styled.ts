import { styled } from "styled-components";

export const profileDrawerWidth = "220px";

export const DrawerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  height: 100%;
  width: ${profileDrawerWidth};
  background-color: #c69925b8;
  padding: 100px 15px;
  box-sizing: border-box;
`;

export const UsernameContainer = styled.div`
  background: #6c886f;
  border-radius: 50px;
  text-align: center;
  padding: 15px;
`;

export const LogoutButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  border-radius: 10px;
  background: linear-gradient(
    180deg,
    rgba(108, 136, 111, 0.08) 0%,
    rgba(108, 136, 111, 0) 6.25%,
    rgba(108, 136, 111, 0.29) 100%
  );
  padding: 8px 30px;
  outline: 0;
  border: none;
  cursor: pointer;
  transform: translateY(1px);
`;
