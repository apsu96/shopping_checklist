import styled from "styled-components";
import { Title, ColorTitle, Text } from "./UIKit.styled";
import store, { Category } from "../Store";
import uuid from "react-uuid";
import { observer } from "mobx-react-lite";

export const ItemsListContainer = styled.div`
  padding: 20px 40px;
  border-radius: 20px;
  background: #f9f9f9;
`;

export const ItemsCategoryContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const ItemsList = observer(() => {
  return (
    <ItemsListContainer>
      <Title>
        Review the shopping items checklist and indicate the products you need
        to purchase.
      </Title>
      <ItemsCategoryContainer>
        {Object.values(Category).map((val) => (
          <div key={uuid()}>
            <ColorTitle>{val}</ColorTitle>
            {store.checkList.map((item) => {
              if (item.category === val) {
                return (
                  <Text>
                    {item.description} {item.category} {item.period}
                  </Text>
                );
              }
            })}
          </div>
        ))}
      </ItemsCategoryContainer>
    </ItemsListContainer>
  );
});

export default ItemsList;
