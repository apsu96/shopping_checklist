import { Link } from "react-router-dom";
import styled from "styled-components";

export const HeaderContainer = styled.div`
  max-width: 100%;
  padding: 20px 30px;
  display: flex;
  justify-content: flex-end;
  gap: 40px;
  background-color: white;
`;

export const LinkButton = styled(Link)<{ current: string }>`
  text-decoration: none;
  color: ${({ current }: { current: string }) => {
    if (current === "true") {
      return "#A60202";
    } else return "black";
  }};
`;
