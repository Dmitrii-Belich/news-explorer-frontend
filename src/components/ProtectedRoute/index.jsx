import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({
  component: Component,
  isLoggedIn,
  setIsPopupOpen,
  ...props
}) {
  !isLoggedIn && setIsPopupOpen(true);
  return (
    <Route>
      {isLoggedIn ? <Component {...props} /> : <Redirect to="./sing-in" />}
    </Route>
  );
}
