import React, {useEffect, useState} from "react";
import {render} from "react-dom";
import SearchParams from "./SearchParams";
import {Router, navigate} from "@reach/router";
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
import Login from "./Login";


//npm run dev

const App = () => {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // useEffect(() => {
    //     if(window.location.pathname != "/register") {
    //         console.log("NIJEEE")
    //     }
    //     else {
    //         console.log("JEEE")
    //     }
    // }, [])

    function onChangeEmail(e) {
        setEmail(e.target.value);
    }
    
    function onChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleLogin(e) {
        e.preventDefault();
    
        fetch("http://localhost:5000/api/login", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then((resp)=>resp.json())
        .then((data)=>{
            if (data.accessToken) {
                localStorage.setItem("token", data.accessToken);
                setUser(email);
                navigate('/products');
            } else {
                console.log("Authentication error");
            }
        })
        .catch((err)=>console.log(err));
    }

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
