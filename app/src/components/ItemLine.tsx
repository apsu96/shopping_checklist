import styled from "styled-components";
import { HelpText, SmallButton, CustomInput } from "./UIKit.styled";
import store, { ShoppingItem } from "../store/Store";
import { useState } from "react";
import React from "react";
import Menu from "../images/Menu.png";

export const ItemLineContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #e4e4e4;
  padding: 6px 15px;
  border-radius: 50px;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-left: auto;
  align-items: center;
  gap: 20px;
`;

const ItemLine = ({ item }: { item: ShoppingItem }) => {
  const [desciption, setDescription] = useState(item.description);

  function handleDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
    // if (e.target.value) store.setDescription(item.id, e.target.value);
  }
  return (
    <ItemLineContainer>
      <CustomInput value={desciption} onChange={handleDescriptionChange} />
      <HelpText>{item.period}</HelpText>
      <ButtonContainer>
        {!item.needToBuy ? (
          <SmallButton
          // onClick={() => store.setNeedToBuy(item.id, true)}
          >
            Add
          </SmallButton>
        ) : (
          <SmallButton
            // onClick={() => store.setNeedToBuy(item.id, false)}
            variant="opacity"
          >
            Added
          </SmallButton>
        )}

        <img src={Menu} width={4} height={18} />
      </ButtonContainer>
    </ItemLineContainer>
  );
};

export default ItemLine;
