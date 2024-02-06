import { styled } from "styled-components";

export const CheckListFormContainer = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  background: #f9f9f9;
  padding: 20px 40px;
  border-radius: 20px;
`;

export const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 0.5fr;
  grid-template-rows: 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  align-items: end;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const InputLabel = styled.p`
  font-size: 14px;
  line-height: 14px;
  color: #6c886f;
`;
export const Input = styled.input`
  /* background: rgba(198, 153, 37, 0.09); */
  background: #f9f9f9;
  box-sizing: border-box;
  outline: none;
  padding: 15px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  width: 100%;
  margin: 0;
`;

export const Select = styled.select`
  padding: 15px;
  font-size: 16px;
  outline: none;
  border: none;
  border-radius: 20px;
  width: auto;
`;

export const Option = styled.option`
  font-size: 12px;
  background: white;
  padding: 10px;
`;
