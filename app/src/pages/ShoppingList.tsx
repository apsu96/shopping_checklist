import styled from "styled-components";
import {
  Title,
  ColorTitle,
  Text,
  TextButton,
} from "../components/UIKit.styled";
import store, { Category } from "../Store";
import uuid from "react-uuid";
import { observer } from "mobx-react-lite";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const ShoppingListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ShoppingList = observer(() => {
  return (
    <ShoppingListContainer>
      <Title>Shopping List</Title>
      <div style={{ marginLeft: "auto" }}>
        <TextButton onClick={() => store.clearShoppingList()}>
          Clear all
        </TextButton>
      </div>
      {Object.values(Category).map((category) => (
        <div key={uuid()}>
          <ColorTitle>{category}</ColorTitle>
          {store.checkList.map((list) => {
            if (list.needToBuy) {
              if (list.category === category) {
                return (
                  <div
                    key={uuid()}
                    style={{
                      width: "32px",
                      display: "flex",
                      gap: "15px",
                      alignItems: "center",
                    }}
                  >
                    {list.boughtInChecklist ? (
                      <CheckCircleIcon
                        onClick={() =>
                          store.setBoughtInCheckList(list.id, false)
                        }
                      />
                    ) : (
                      <RadioButtonUncheckedIcon
                        onClick={() => {
                          store.setBoughtInCheckList(list.id, true);
                          store.setLastBought(list.id, new Date());
                        }}
                      />
                    )}
                    <Text>{list.description}</Text>
                  </div>
                );
              } else {
                return null;
              }
            } else return null;
          })}
        </div>
      ))}
    </ShoppingListContainer>
  );
});

export default ShoppingList;
