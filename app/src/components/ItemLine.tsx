import styled from "styled-components";
import { IconButton, HelpText, SmallButton, CustomInput } from "./UIKit.styled";
import store, { ShoppingItem } from "../Store";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import React from "react";

export const ItemLineContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #f3ecec;
  padding: 5px 10px;
  border-radius: 20px;
  margin-bottom: 10px;
  gap: 5px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  gap: 20px;
`;

const ItemLine = ({ item, index }: { item: ShoppingItem; index: number }) => {
  const [desciption, setDescription] = useState(item.description);

  function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
    if (e.target.value) store.setDescription(item.id, e.target.value);
  }
  return (
    <ItemLineContainer>
      <CustomInput value={desciption} onChange={handleDescriptionChange} />
      <HelpText>({item.period})</HelpText>
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
