import React, { createContext, useEffect, useState } from "react";

export const myContext = createContext({});
export default function Context(props) {
  const [userObject, setUserObject] = useState(null);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/user/", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUserObject(data.user);
          setPending(false);
        } else {
          setPending(false);
        }
      });
  }, []);

  return <myContext.Provider value={{ userObject, pending }}>{props.children}</myContext.Provider>;
}
