import store, { ShoppingItem } from "../Store";
import { IconButton, Text } from "./UIKit.styled";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";

export const Container = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  background-color: #f9f9f9;
  padding: 5px 10px;
  border-radius: 20px;
  margin-bottom: 10px;
  justify-content: space-between;
`;

export const TextCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ShoppingListItem = ({ item }: { item: ShoppingItem }) => {
  const [checked, setChecked] = useState(item.boughtInShoppingList);

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    setChecked(e.target.checked);
    store.changeBoughtInCheckList(item.id, e.target.checked);
  }

  return (
    <Container>
      <TextCheckboxContainer>
        <Checkbox
          checked={checked}
          onChange={handleCheckbox}
          inputProps={{ "aria-label": "controlled" }}
          color="default"
        />
        <Text>{item.description}</Text>
      </TextCheckboxContainer>
      <IconButton onClick={() => store.setNeedToBuy(item.id, false)}>
        <DeleteIcon />
      </IconButton>
    </Container>
  );
};

export default ShoppingListItem;
