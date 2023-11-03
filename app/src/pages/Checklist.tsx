import { styled } from "styled-components";
import CheckListForm from "../components/CheckListForm";
import ItemsList from "../components/ItemsList";
import ShareChecklist from "../components/ShareChecklist";
import { checklistDrawerWidth } from "../components/ChecklistDrawer.styled";
import { profileDrawerWidth } from "../components/ProfileDrawer.styled";

export const CheckListContainer = styled.div`
  width: calc(100vw - ${checklistDrawerWidth} - ${profileDrawerWidth});
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const Checklist = () => {
  return (
    <CheckListContainer>
      <CheckListForm />
      <ItemsList />
      <ShareChecklist />
    </CheckListContainer>
  );
};

export default Checklist;
