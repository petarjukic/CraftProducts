import React, {useState} from "react";
import {render} from "react-dom";
import SearchParams from "./SearchParams";
import {Router} from "@reach/router";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import Products from "./product/Products";
import CreateProduct from "./product/CreateProduct";
import CreateCompany from "./company/CreateCompany";
import ProductDetails from "./product/ProductDetails";
import CompanyDetails from "./company/CompanyDetails";
import UpdateProduct from "./product/UpdateProduct";
import UpdateCompany from "./company/UpdateCompany";
import CompanyProducts from "./product/CompanyProducts";
import { UserContext } from "./UserContext";


//npm run dev

const App = () => {
    const [user, setUser] = useState("");

    return(
        <div>
            <UserContext.Provider value={{user, setUser}}>
                <Router>
                    <SearchParams path="/" />
                    <Login path="/login" />
                    <Products path="/products" />
                    <CreateProduct path="/createProduct" />
                    <CreateCompany path="/createCompany" />
                    <ProductDetails path={"/product/details/:productName"} />
                    <CompanyDetails path={"/company/details/:name"} />
                    <UpdateProduct path={"/product/update/:productName"} />
                    <UpdateCompany path={"/company/update/:name"} />
                    <CompanyProducts path={"/products/:companyName"} />
                    <Register path="/register" />
                    <Logout path="/logout" />
                </Router>
            </UserContext.Provider>
        </div>
    );
}

render(<App/>, document.getElementById("root"));
