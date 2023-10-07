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

const ShoppingList = () => {
  const [groceryItems, setGroceryItems] = useState(
    store.shoppingItems.filter(
      (list) => list.category === Category.grocery && list.needToBuy
    )
  );
  const [houseHoldItems, setHouseholdItems] = useState(
    store.shoppingItems.filter(
      (list) => list.category === Category.household && list.needToBuy
    )
  );

  useEffect(() => {
    const grocery = store.shoppingItems.filter(
      (list) => list.category === Category.grocery && list.needToBuy
    );
    setGroceryItems(grocery);
    const household = store.shoppingItems.filter(
      (list) => list.category === Category.household && list.needToBuy
    );
    setHouseholdItems(household);
  }, [store.shoppingItems]);

  useEffect(() => {
    store.getChecklist();
  }, []);

  return (
    <ShoppingListContainer>
      <Title>Shopping List</Title>
      <ButtonContainer>
        <TextButton onClick={() => store.clearShoppingList()}>
          Clear all
        </TextButton>
      </ButtonContainer>
      <div>
        <ColorTitle>{Category.grocery}</ColorTitle>
        {groceryItems.length === 0 ? (
          <HelpText>No Items</HelpText>
        ) : (
          groceryItems.map((item) => (
            <ShoppingListItem key={item.id} item={item} />
          ))
        )}
      </div>
      <div>
        <ColorTitle>{Category.household}</ColorTitle>
        {houseHoldItems.length === 0 ? (
          <HelpText>No Items</HelpText>
        ) : (
          houseHoldItems.map((item) => (
            <ShoppingListItem key={uuid()} item={item} />
          ))
        )}
      </div>
    </ShoppingListContainer>
  );
};

export default observer(ShoppingList);
