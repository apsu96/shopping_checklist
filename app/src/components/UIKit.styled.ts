import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const Title = styled.p`
  font-size: 22px;
  margin: 0;
  color: #4b5e4e;
  font-weight: 500;
`;

export const ColorTitle = styled(Title)`
  color: #a60202;
`;

export const Text = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: #4b5e4e;
`;

export const HelpText = styled.span`
  color: #504d4d;
  font-size: 12px;
  text-transform: lowercase;
`;

export const SmallText = styled.p`
  color: black;
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
`;

export const Button = styled.button`
  padding: 15px 50px;
  border-radius: 50px;
  border: none;
  background-color: rgba(198, 153, 37, 0.72);
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  &:active {
    transform: translateY(1px);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SmallButton = styled(Button)<{ variant?: string }>`
  padding: 0;
  font-size: 18px;
  opacity: ${({ variant }: { variant?: string }) =>
    variant === "opacity" ? "0.5" : "1"};
  width: 89px;
  height: 34px;
`;

export const TextButton = styled(Button)`
  padding: 0;
  margin: 0;
  font-size: 16px;
  line-height: 16px;
  background-color: transparent;
  color: #4b5e4e;
  height: 22px;
  &:hover {
    color: #4b5e4e;
  }
`;

export const IconButton = styled(SmallButton)`
  padding: 0;
  background-color: transparent;
  color: black;
  width: unset;
  &:hover {
    color: rgba(198, 153, 37, 0.72);
  }
`;

export const CustomInput = styled.input`
  background-color: transparent;
  outline: none;
  border: none;
  font-family: "Open Sans", sans-serif;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 500;
  text-transform: capitalize;
  width: 140px;
`;

export const TextLink = styled(Link)`
  text-decoration: none;
  color: #a60202;
`;

export const ErrorText = styled(Text)`
  color: #a60202;
`;
