import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const Title = styled.p`
  font-size: 22px;
`;

export const ColorTitle = styled(Title)`
  color: #a60202;
`;

export const Text = styled.p`
  font-size: 14px;
  line-height: 14px;
`;

export const HelpText = styled.span`
  color: grey;
  font-size: 12px;
`;

export const Button = styled.button`
  padding: 16px 20px;
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

export const SmallButton = styled(Button)<{ variant?: string }>`
  padding: 10px 20px;
  font-size: 14px;
  opacity: ${({ variant }: { variant?: string }) =>
    variant === "opacity" ? "0.5" : "1"};
`;

export const TextButton = styled(Button)`
  padding: 0;
  background-color: transparent;
  color: #a60202;
  &:hover {
    color: black;
  }
`;

export const IconButton = styled(SmallButton)`
  padding: 0;
  background-color: transparent;
  color: black;
  &:hover {
    color: #a60202;
  }
`;

export const CustomInput = styled.input`
  background-color: transparent;
  outline: none;
  border: none;
  font-family: "Open Sans", sans-serif;
  text-transform: uppercase;
  text-overflow: ellipsis;
  width: 50%;
`;

export const TextLink = styled(Link)`
  text-decoration: none;
  color: #a60202;
`;

export const ErrorText = styled(Text)`
  color: #a60202;
`;
