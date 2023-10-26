import { styled } from "styled-components";
import {
  Button,
  ErrorText,
  Text,
  TextButton,
  Title,
} from "../components/UIKit.styled";
import { Input, InputLabel } from "../components/CheckListForm.styled";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import store from "../Store";
import { observer } from "mobx-react-lite";

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background-color: #f9f9f9;
`;

const SignIn = () => {
  const [isRegistered, setIsRegistered] = useState(true);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  function clearForm() {
    setUserName("");
    setPassword("");
    setErrorMessage("");
  }

  async function login() {
    setErrorMessage("");
    try {
      await store.loginUser(userName, password);
      navigate("/");
    } catch (err: any) {
      setErrorMessage(JSON.stringify(err.response.data));
    }
  }

  async function signup() {
    setErrorMessage("");
    try {
      await store.signupUser(userName, password);
      navigate("/");
    } catch (err: any) {
      setErrorMessage(JSON.stringify(err.response.data));
    }
  }
  useEffect(() => {
    if (store.user) {
      navigate("/");
    }
  }, [store.user]);

  return (
    <SignInContainer>
      {isRegistered ? (
        <SignInContainer>
          <Title>Please sign in to continue:</Title>
          <div>
            <InputLabel>Login</InputLabel>
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <InputLabel>Passowrd</InputLabel>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "30px" }}>
            <Button
              disabled={userName === "" || password === ""}
              onClick={login}
            >
              Sign In
            </Button>
          </div>
          <ErrorText>{errorMessage}</ErrorText>
          <Text>
            Don't have an account?{" "}
            <TextButton
              onClick={() => {
                clearForm();
                setIsRegistered(false);
              }}
            >
              Create
            </TextButton>
          </Text>
        </SignInContainer>
      ) : (
        <SignInContainer>
          <Title>Please sign up to continue:</Title>
          <div>
            <InputLabel>Login</InputLabel>
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <InputLabel>Passowrd</InputLabel>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ marginTop: "30px" }}>
            <Button
              disabled={userName === "" || password === ""}
              onClick={signup}
            >
              Sign Up
            </Button>
          </div>
          <ErrorText>{errorMessage}</ErrorText>
          <Text>
            Already have an account?{" "}
            <TextButton
              onClick={() => {
                clearForm();
                setIsRegistered(true);
              }}
            >
              Sign in
            </TextButton>
          </Text>
        </SignInContainer>
      )}
    </SignInContainer>
  );
};

export default observer(SignIn);
