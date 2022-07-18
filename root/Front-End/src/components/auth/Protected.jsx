import React, { useCallback, useContext, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { myContext } from "../../utils/context";
import MainPage from "../MainPage/MainPage";
import Waiting from "../game/gameUI/waiting-animation/Waiting";

function ProtectedRoute() {
  const ctx = useContext(myContext);
  const pending = ctx.pending;
  const user = ctx.userObject;
  console.log(pending + "user " + user);
  return (
    <div>
      {pending && <Waiting loading={true} />}
      {!pending && (user ? <Outlet /> : <Navigate to="login" />)}
    </div>
  );
}

export default ProtectedRoute;
