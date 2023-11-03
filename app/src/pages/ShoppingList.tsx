import { Text, HelpText, SmallText, Title } from "../components/UIKit.styled";
import store, { Category } from "../Store";
import uuid from "react-uuid";
import { observer } from "mobx-react-lite";
import { ButtonContainer, ShoppingListContainer } from "./ShoppingList.styled";
import ShoppingListItem from "../components/ShoppingListItem";
import ClearAll from "../images/ClearAll.png";
import Share from "../images/Share.png";

const ShoppingList = () => {
  return (
    <ShoppingListContainer>
      <Title>Shopping List</Title>
      <ButtonContainer>
        <img src={Share} width={25} height={22} alt="share" />
        <img
          src={ClearAll}
          width={19}
          height={24}
          alt="clear all"
          onClick={() => store.clearShoppingList()}
        />
      </ButtonContainer>
      <div>
        <SmallText>{Category.grocery}</SmallText>
        {store.groceryItems.length === 0 ? (
          <HelpText>No Items</HelpText>
        ) : (
          store.groceryItems.map((item) => (
            <ShoppingListItem key={item.id} item={item} />
          ))
        )}
      </div>
      <div>
        <SmallText>{Category.household}</SmallText>
        {store.householdItems.length === 0 ? (
          <HelpText>No Items</HelpText>
        ) : (
          store.householdItems.map((item) => (
            <ShoppingListItem key={uuid()} item={item} />
          ))
        )}
      </div>
    </ShoppingListContainer>
  );
};

export default observer(ShoppingList);
