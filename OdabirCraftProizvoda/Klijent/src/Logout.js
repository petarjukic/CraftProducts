import React from "react";
import { navigate, Redirect } from "@reach/router";


export const Logout = () =>{
    localStorage.removeItem("token");
   return <Redirect to="/" />;
   //navigate("/");
};

export default Logout;