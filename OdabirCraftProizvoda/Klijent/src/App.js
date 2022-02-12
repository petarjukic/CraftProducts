import React, {useState} from "react";
import {render} from "react-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";
import {Router} from "@reach/router";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import Products from "./Products";
import CreateProduct from "./CreateProduct";
import CreateCompany from "./CreateCompany";
import ProductDetails from "./ProductDetails";
import { Route, Routes } from "react-router-dom";
import CompanyDetails from "./CompanyDetails";


//npm run dev

const App = () => {
    return(
        <div>
            <Router>            
                <SearchParams path="/" />
                <Products path="/products" />
                <CreateProduct path="/createProduct" />
                <CreateCompany path="/createCompany" />
                <ProductDetails path={"/product/details/:productName"} />
                <CompanyDetails path={"/company/details/:name"} />
                <Login path="/login" />
                <Register path="/register" />
                <Logout path="/logout" />
            </Router>
        </div>
    );
}

render(<App/>, document.getElementById("root"));
