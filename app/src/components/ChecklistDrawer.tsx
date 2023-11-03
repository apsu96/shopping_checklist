import { Drawer } from "@mui/material";
import {
  ChecklistCategoryContainer,
  ChecklistDrawerContainer,
  checklistDrawerWidth,
} from "./ChecklistDrawer.styled";
import { Title } from "./UIKit.styled";
import { observer } from "mobx-react-lite";
import store, { Category } from "../Store";
import ChecklistCategory from "./ChecklistCategory";

const ChecklistDrawer = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{ width: checklistDrawerWidth }}
      anchor="right"
    >
      <ChecklistDrawerContainer>
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
