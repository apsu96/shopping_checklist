import { styled } from "styled-components";

export const Title = styled.p`
  font-size: 22px;
`;

export const ColorTitle = styled(Title)`
  color: #a60202;
`;

export const Text = styled.p``;

export const Button = styled.button`
  padding: 10px;
  height: 50%;
  border-radius: 20px;
  border: none;
  background-color: #a60202;
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  &:active {
    transform: translateY(1px);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;
