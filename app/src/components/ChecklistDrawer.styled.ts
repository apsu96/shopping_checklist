import { styled } from "styled-components";

export const checklistDrawerWidth = "500px";

export const ChecklistDrawerContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${checklistDrawerWidth};
  height: 100vh;
  background: rgba(108, 136, 111, 0.38);
  padding: 50px 20px;
  box-sizing: border-box;
  overflow-y: scroll;
`;

export const ChecklistCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 40px;
  box-sizing: border-box;
`;
