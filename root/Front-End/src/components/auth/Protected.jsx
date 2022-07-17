import React, { useCallback, useContext, useState } from 'react'
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from '../../utils/user';
import MainPage from '../MainPage/MainPage';

function ProtectedRoute() {
    const user = useContext(UserContext);
    
    return user.id ? <Outlet/> : <MainPage/>;
}

export default ProtectedRoute;