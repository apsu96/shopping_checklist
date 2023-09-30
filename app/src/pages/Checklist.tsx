import { styled } from "styled-components";
import CheckListForm from "../components/CheckListForm";
import ItemsList from "../components/ItemsList";
import { useEffect } from "react";
import { getChecklists } from "../api";

export const CheckListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const Checklist = () => {
  useEffect(() => {
    getChecklists();
  }, []);
  return (
    <CheckListContainer>
      <CheckListForm />
      <ItemsList />
    </CheckListContainer>
  );
};

export default Checklist;
