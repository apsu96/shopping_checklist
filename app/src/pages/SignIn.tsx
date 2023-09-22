import { styled } from "styled-components";
import { Button, ErrorText, Title } from "../components/UIKit.styled";
import { Input, InputLabel } from "../components/CheckListForm.styled";
import { useEffect, useState } from "react";
import { getCSRFToken, signIn } from "../api";

export const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  background-color: #f9f9f9;
`;

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function login() {
    setErrorMessage("");
    try {
      const res = await signIn(userName, password);
      console.log(res);
    } catch (err: any) {
      setErrorMessage(err.response.data);
    }
  }

  useEffect(() => {
    getCSRFToken();
  }, []);

  return (
    <SignInContainer>
      <Title>Please sign in to continue:</Title>
      <div>
        <InputLabel>Login</InputLabel>
        <Input value={userName} onChange={(e) => setUserName(e.target.value)} />
      </div>
      <div>
        <InputLabel>Passowrd</InputLabel>
        <Input value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div style={{ marginTop: "30px" }}>
        <Button disabled={userName === "" || password === ""} onClick={login}>
          Sign In
        </Button>
      </div>
      <ErrorText>{errorMessage}</ErrorText>
    </SignInContainer>
  );
};

export default SignIn;
