import { styled } from "styled-components";
import CheckListForm from "../components/CheckListForm";

export const CheckListContainer = styled.div`
  padding: 20px 40px;
  border-radius: 20px;
  background: #f9f9f9;
`;

const Checklist = () => {
  return (
    <CheckListContainer>
      <CheckListForm />
    </CheckListContainer>
  );
};

export default Checklist;
