import React, {useState} from "react";
import {render} from "react-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";
import {Router} from "@reach/router";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import Products from "./Products";


//npm run dev

const App = () => {
    return(
        <div>
            <Router>            
                <SearchParams path="/" />
                <Products path="/products" />
                {/* <Details path="/:genre/details/:id"/> */}
                <Login path="/login" />
                <Register path="/register" />
                <Logout path="/logout" />
            </Router>
        </div>
    );
}

render(<App/>, document.getElementById("root"));
