import { styled } from "styled-components";
import { Route, Routes } from "react-router-dom";
import ShoppingList from "./pages/ShoppingList";
import SignIn from "./pages/SignIn";
import { useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import store from "./Store";
import { observer } from "mobx-react-lite";
import SharedChecklist from "./pages/SharedChecklist";
import ProfileDrawer from "./components/ProfileDrawer";
import ChecklistDrawer from "./components/ChecklistDrawer";
import ProfileSideBar from "./components/ProfileSideBar";
import BookIcon from "@mui/icons-material/Book";
import { IconButton } from "./components/UIKit.styled";

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  max-width: 1440px;
  width: 100%;
  width: 100vw;
  margin: 0 auto;
`;

function App() {
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [isChecklistDrawerOpen, setIsChecklistDrawerOpen] = useState(false);

  useEffect(() => {
    store.getUser().catch((err) => console.log(err));
  }, []);

  return (
    <AppContainer>
      <ProfileDrawer
        isOpen={isProfileDrawerOpen}
        setIsOpen={setIsProfileDrawerOpen}
      />
      <ProfileSideBar setIsOpen={setIsProfileDrawerOpen} />
      <Routes>
        <Route element={<ProtectedRoute user={store.user} />}>
          <Route path="/" element={<ShoppingList />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
      </Routes>
      <div style={{ marginTop: "80px" }}>
        <IconButton onClick={() => setIsChecklistDrawerOpen(true)}>
          <BookIcon />
        </IconButton>
      </div>
      <ChecklistDrawer
        isOpen={isChecklistDrawerOpen}
        setIsOpen={setIsChecklistDrawerOpen}
      />
    </AppContainer>
  );
}

export default observer(App);
