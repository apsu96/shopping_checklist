import { Link } from "react-router-dom";
import { styled } from "styled-components";

export const Title = styled.p`
  font-size: 22px;
  margin: 0;
  color: black;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.72px;
`;

export const ColorTitle = styled(Title)`
  color: #a60202;
`;

export const Text = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: black;
  letter-spacing: 0.72px;
`;

export const HelpText = styled.span`
  color: #504d4d;
  font-size: 12px;
  letter-spacing: 0.54px;
  text-transform: lowercase;
`;

export const SmallText = styled.p`
  color: black;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.48px;
  text-transform: capitalize;
`;

export const Button = styled.button`
  padding: 16px 20px;
  border-radius: 50px;
  border: none;
  background-color: rgba(198, 153, 37, 0.72);
  color: white;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  text-transform: uppercase;
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
  padding: 0;
  font-size: 18px;
  letter-spacing: 0.6px;
  opacity: ${({ variant }: { variant?: string }) =>
    variant === "opacity" ? "0.5" : "1"};
  width: 89px;
  height: 34px;
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
  letter-spacing: 0.72px;
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
