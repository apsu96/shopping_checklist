import store, { ShoppingItem } from "../Store";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Text } from "./UIKit.styled";
import styled from "styled-components";

export const Container = styled.div`
  width: 32px;
  display: flex;
  gap: 15px;
  align-items: center;
`;

const ShoppingListItem = ({ item }: { item: ShoppingItem }) => {
  return (
    <Container>
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
    </Container>
  );
};

export default ShoppingListItem;
