import store, { ShoppingItem } from "../Store";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IconButton, Text } from "./UIKit.styled";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";

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
  return (
    <Container>
      <TextCheckboxContainer>
        {item.boughtInChecklist ? (
          <CheckCircleIcon
            onClick={() => store.setBoughtInCheckList(item.id, false)}
          />
        ) : (
          <RadioButtonUncheckedIcon
            onClick={() => {
              store.setBoughtInCheckList(item.id, true);
              store.setLastBought(item.id, new Date());
            }}
          />
        )}
        <Text>{item.description}</Text>
      </TextCheckboxContainer>
      <IconButton onClick={() => store.setNeedToBuy(item.id, false)}>
        <DeleteIcon />
      </IconButton>
    </Container>
  );
};

export default ShoppingListItem;
