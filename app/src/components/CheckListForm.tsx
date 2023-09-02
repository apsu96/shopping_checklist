import { TextField } from "@mui/material";
import {
  CheckListFormContainer,
  Input,
  InputContainer,
  InputGroup,
  InputLabel,
  Select,
  Option,
  Button,
} from "./CheckListForm.styled";
import { Title } from "./UIKit.styled";

const CheckListForm = () => {
  return (
    <CheckListFormContainer>
      <Title>
        Create your shopping checklist: Add items you need and specify how often
        you usually buy them.
      </Title>
      <InputContainer>
        <InputGroup>
          <InputLabel>Shopping item</InputLabel>
          <Input placeholder="e.g. Milk" />
        </InputGroup>
        <InputGroup>
          <InputLabel>Period</InputLabel>
          <Select>
            <Option>Once a week</Option>
            <Option>Once in 2 weeks</Option>
            <Option>Once a month</Option>
          </Select>
        </InputGroup>
        <InputGroup>
          <InputLabel>Category</InputLabel>
          <Select>
            <Option value="grocery">Grocery</Option>
            <Option value="household">Household Essentials</Option>
          </Select>
        </InputGroup>
        <Button>Add</Button>
      </InputContainer>
    </CheckListFormContainer>
  );
};

export default CheckListForm;
