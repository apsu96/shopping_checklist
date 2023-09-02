import styled from "styled-components";
import { IconButton, HelpText, SmallButton, Text } from "./UIKit.styled";
import store, { ShoppingItem } from "../Store";
import DeleteIcon from "@mui/icons-material/Delete";

export const ItemLineContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f3ecec;
  padding: 5px 10px;
  border-radius: 20px;
  margin-bottom: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  gap: 20px;
`;

const ItemLine = ({ item }: { item: ShoppingItem }) => {
  return (
    <ItemLineContainer>
      <Text>
        {item.description} &nbsp;
        <HelpText>({item.period})</HelpText>
      </Text>
      <ButtonContainer>
        {!item.needToBuy ? (
          <SmallButton onClick={() => store.setNeedToBuy(item.id, true)}>
            Need to buy
          </SmallButton>
        ) : (
          <SmallButton
            onClick={() => store.setNeedToBuy(item.id, false)}
            variant="opacity"
          >
            In your list
          </SmallButton>
        )}
        <IconButton onClick={() => store.deleteItem(item.id)}>
          <DeleteIcon />
        </IconButton>
      </ButtonContainer>
    </ItemLineContainer>
  );
};

export default ItemLine;
