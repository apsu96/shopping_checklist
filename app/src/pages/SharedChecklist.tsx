import { useParams } from "react-router-dom";
import Checklist from "./Checklist";
import { useEffect } from "react";
import { getSharedChecklist } from "../api";
import store from "../store/Store";
import { observer } from "mobx-react-lite";

const SharedChecklist = () => {
  const { checklistToken } = useParams();

  // useEffect(() => {
  //   if (checklistToken && store.user && store.checklistId) {
  //     getSharedChecklist(checklistToken).then((checklist) => {
  //       store.setChecklist(
  //         checklist?.id,
  //         checklist?.name,
  //         checklist?.shopping_items
  //       );
  //     });
  //   }
  // }, [checklistToken, store.user, store.checklistId]);
  return <Checklist />;
};

export default observer(SharedChecklist);
