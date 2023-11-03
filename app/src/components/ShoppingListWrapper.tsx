import { useNavigate } from "react-router-dom";
import { ShoppingList } from "../App";
import { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const ShoppingListWrapper = ({
  shoppingLists,
}: {
  shoppingLists: ShoppingList[];
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (shoppingLists.length) {
      navigate(`/${shoppingLists[0].id}`);
    }
  }, [shoppingLists.length]);

  return (
    <CircularProgress
      sx={{ color: "rgba(198, 153, 37, 1)", margin: " 100px auto" }}
    />
  );
};

export default ShoppingListWrapper;
