import React, { useEffect } from "react";
import store from "../Store";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

const ProtectedRoute = observer(
  ({ children }: { children: React.ReactElement }) => {
    const navigate = useNavigate();
    useEffect(() => {
      if (!store.user) {
        navigate("/signin");
      }
    }, [store.user]);

    return children;
  }
);

export default ProtectedRoute;
