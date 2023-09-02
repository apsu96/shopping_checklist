import { styled } from "styled-components";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Checklist from "./pages/Checklist";
import ShoppingList from "./pages/ShoppingList";

const AppContainer = styled.div`
  min-height: 100vh;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <Routes>
        <Route path="*" element={<Checklist />} />
        <Route path="/shoppingList" element={<ShoppingList />} />
      </Routes>
    </AppContainer>
  );
}

export default App;
