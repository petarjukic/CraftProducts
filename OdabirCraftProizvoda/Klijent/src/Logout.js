import React from "react";
import { Redirect } from "@reach/router";


export const Logout = () =>{
    localStorage.removeItem("token");
    return <Redirect to="/" />;
};

export default Logout;