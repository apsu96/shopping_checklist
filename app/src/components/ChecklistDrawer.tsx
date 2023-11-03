import { Drawer } from "@mui/material";
import {
  ChecklistCategoryContainer,
  ChecklistDrawerContainer,
  checklistDrawerWidth,
} from "./ChecklistDrawer.styled";
import { IconButton, Title } from "./UIKit.styled";
import { observer } from "mobx-react-lite";
import store, { Category } from "../Store";
import ChecklistCategory from "./ChecklistCategory";
import EastIcon from "@mui/icons-material/East";

const ChecklistDrawer = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Drawer
      variant="persistent"
      sx={{ width: checklistDrawerWidth }}
      anchor="right"
      open={isOpen}
    >
      <ChecklistDrawerContainer>
        <div style={{ position: "absolute", left: "30px" }}>
          <IconButton onClick={() => setIsOpen(false)}>
            <EastIcon />
          </IconButton>
        </div>
        <Title>Checklists</Title>
        <ChecklistCategoryContainer>
          <ChecklistCategory
            items={store.groceryItems}
            category={Category.grocery}
          />
          <ChecklistCategory
            items={store.householdItems}
            category={Category.household}
          />
        </ChecklistCategoryContainer>
      </ChecklistDrawerContainer>
    </Drawer>
  );
};

export default observer(ChecklistDrawer);
