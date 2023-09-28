import { styled } from "styled-components";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Checklist from "./pages/Checklist";
import ShoppingList from "./pages/ShoppingList";
import SignIn from "./pages/SignIn";
import { useEffect } from "react";
import { getUser } from "./api";
import ProtectedRoute from "./components/ProtectedRoute";

const AppContainer = styled.div`
  min-height: 100vh;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`;

function App() {
  useEffect(() => {
    getUser();
  }, []);
  return (
    <AppContainer>
      <Header />
      <Routes>
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Checklist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shoppingList"
          element={
            <ProtectedRoute>
              <ShoppingList />
            </ProtectedRoute>
          }
        />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
