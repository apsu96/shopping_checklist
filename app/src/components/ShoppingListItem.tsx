import store, { ShoppingItem } from "../Store";
import { IconButton, Text } from "./UIKit.styled";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #e4e4e4;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
  padding: 0px 15px;
  border-radius: 50px;
  margin-bottom: 21px;
  justify-content: space-between;
  box-sizing: border-box;
`;

export const TextCheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
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
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<RadioButtonCheckedIcon />}
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
