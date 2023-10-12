import { styled } from "styled-components";
import CheckListForm from "../components/CheckListForm";
import ItemsList from "../components/ItemsList";
import ShareChecklist from "../components/ShareChecklist";

export const CheckListContainer = styled.div`
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
