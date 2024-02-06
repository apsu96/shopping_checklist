import styled from "styled-components";
import { Category, ShoppingItem } from "../store/Store";
import { SmallText } from "./UIKit.styled";
import ItemLine from "./ItemLine";
import uuid from "react-uuid";

const ChecklidtCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  border-radius: 50px;
  padding: 20px 20px 30px;
  width: 100%;
  box-sizing: border-box;
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 21px;
`;

const ChecklistCategory = ({
  items,
  category,
}: {
  items: ShoppingItem[];
  category: Category;
}) => {
  return (
    <ChecklidtCategoryContainer>
      <SmallText>{category}</SmallText>
      <ItemsContainer>
        {items.map((item) => (
          <ItemLine key={uuid()} item={item} />
        ))}
      </ItemsContainer>
    </ChecklidtCategoryContainer>
  );
};

export default ChecklistCategory;
