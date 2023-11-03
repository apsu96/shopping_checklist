import { styled } from "styled-components";
import { Route, Routes } from "react-router-dom";
import ShoppingList from "./pages/ShoppingList";
import SignIn from "./pages/SignIn";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import store from "./Store";
import { observer } from "mobx-react-lite";
import SharedChecklist from "./pages/SharedChecklist";
import ProfileDrawer from "./components/ProfileDrawer";
import ChecklistDrawer from "./components/ChecklistDrawer";

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  max-width: 1440px;
  width: 100%;
  width: 100vw;
  margin: 0 auto;
`;

function App() {
  useEffect(() => {
    store.getUser().catch((err) => console.log(err));
  }, []);

  return (
    <AppContainer>
      <ProfileDrawer />
      <Routes>
        <Route element={<ProtectedRoute user={store.user} />}>
          <Route path="/" element={<ShoppingList />} />
          <Route
            path="/shared/:checklistToken/"
            element={<SharedChecklist />}
          />
        </Route>
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      <ChecklistDrawer />
    </AppContainer>
  );
}

export default observer(App);
