import React, { createContext, useEffect, useState } from 'react'

export const myContext = createContext({});
export default function Context(props) {

    const [userObject, setUserObject] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3001/api/user/", {credentials: 'include'}).then(res => res.json()).then(data => {
            console.log(data.user);
            setUserObject(data.user);
        })
    }, [])

    return (
        <myContext.Provider value={userObject}>{props.children}</myContext.Provider>
    )
}