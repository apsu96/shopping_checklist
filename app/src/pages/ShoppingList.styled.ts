import styled from "styled-components";
import { checklistDrawerWidth } from "../components/ChecklistDrawer.styled";
import { profileDrawerWidth } from "../components/ProfileDrawer.styled";

export const ShoppingListContainer = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: calc(100vw - ${checklistDrawerWidth} - ${profileDrawerWidth});
  margin: 50px 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-left: auto;
  gap: 24px;
  align-items: end;
  margin-bottom: 40px;
`;
