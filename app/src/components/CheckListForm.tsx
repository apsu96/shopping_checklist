import {
  CheckListFormContainer,
  Input,
  InputContainer,
  InputGroup,
  InputLabel,
  Select,
  Option,
} from "./CheckListForm.styled";
import { Button, Title } from "./UIKit.styled";
import { useState } from "react";
import store, { Category, Period } from "../Store";
import uuid from "react-uuid";

const CheckListForm = () => {
  const [shoppingItem, setShoppingItem] = useState<string>("");
  const [period, setPeriod] = useState<Period>(Period.weekly);
  const [category, setCategory] = useState<Category>(Category.grocery);

  function clearForm() {
    setShoppingItem("");
    setPeriod(Period.weekly);
    setCategory(Category.grocery);
  }

  function submitItem() {
    store.setShoppingList({
      id: uuid(),
      description: shoppingItem,
      period,
      category,
      needToBuy: false,
    });
    clearForm();
  }
  return (
    <CheckListFormContainer>
      <Title>
        Create your shopping checklist: Add items you need and specify how often
        you usually buy them.
      </Title>
      <InputContainer>
        <InputGroup>
          <InputLabel>Shopping item</InputLabel>
          <Input
            placeholder="e.g. Milk"
            value={shoppingItem}
            onChange={(e) => setShoppingItem(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <InputLabel>Period</InputLabel>
          <Select
            value={period}
            onChange={(e) =>
              setPeriod(
                e.target.value === Period.weekly
                  ? Period.weekly
                  : e.target.value === Period.biWeekly
                  ? Period.biWeekly
                  : Period.monthly
              )
            }
          >
            {Object.entries(Period).map(([_, val]) => (
              <Option key={uuid()} value={val}>
                {val}
              </Option>
            ))}
          </Select>
        </InputGroup>
        <InputGroup>
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value === Category.grocery
                  ? Category.grocery
                  : Category.household
              )
            }
          >
            {Object.entries(Category).map(([_, val]) => (
              <Option key={uuid()} value={val}>
                {val}
              </Option>
            ))}
          </Select>
        </InputGroup>
        <Button disabled={!shoppingItem} onClick={submitItem}>
          Add
        </Button>
      </InputContainer>
    </CheckListFormContainer>
  );
};

export default CheckListForm;
