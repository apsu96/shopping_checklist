import { styled } from "styled-components";
import CheckListForm from "../components/CheckListForm";
import ItemsList from "../components/ItemsList";

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
    </CheckListContainer>
  );
};

export default Checklist;
