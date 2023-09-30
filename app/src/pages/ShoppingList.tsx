import {
  Title,
  ColorTitle,
  TextButton,
  HelpText,
} from "../components/UIKit.styled";
import store, { Category } from "../Store";
import uuid from "react-uuid";
import { observer } from "mobx-react-lite";

import { ButtonContainer, ShoppingListContainer } from "./ShoppingList.styled";
import ShoppingListItem from "../components/ShoppingListItem";
import { useEffect, useState } from "react";

const ShoppingList = observer(() => {
  const sortedData = {
    [Category.grocery]: store.shoppingItems.filter(
      (list) => list.category === Category.grocery && list.needToBuy
    ),
    [Category.household]: store.shoppingItems.filter(
      (list) => list.category === Category.household && list.needToBuy
    ),
  };
  return (
    <ShoppingListContainer>
      <Title>Shopping List</Title>
      <ButtonContainer>
        <TextButton onClick={() => store.clearShoppingList()}>
          Clear all
        </TextButton>
      </ButtonContainer>
      {Object.entries(sortedData).map(([key, value]) => (
        <div key={uuid()}>
          <ColorTitle>{key}</ColorTitle>
          {value.length === 0 ? (
            <HelpText>No Items</HelpText>
          ) : (
            value.map((item) => {
              return <ShoppingListItem key={uuid()} item={item} />;
            })
          )}
        </div>
      ))}
    </ShoppingListContainer>
  );
});

export default ShoppingList;
