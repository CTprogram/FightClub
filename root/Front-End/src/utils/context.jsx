import React, { createContext, useEffect, useState, useCallback } from "react";
import { getExpressBaseURI } from "./constants";

export const myContext = createContext({});
export default function Context(props) {
  const [userObject, setUserObject] = useState(null);
  const [pending, setPending] = useState(true);

  const startPending = () => {
    setPending(true);
  };

  const handleCheckLogin = useCallback(() => {
    fetch(`${getExpressBaseURI()}/api/user/`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.user) {
          setUserObject(data.user);
          setPending(false);
        } else {
          setPending(false);
        }
      });
  });
  useEffect(() => {
    if (pending) {
      handleCheckLogin();
    }
  }, [pending]);

  return <myContext.Provider value={{ userObject, pending, startPending }}>{props.children}</myContext.Provider>;
}
