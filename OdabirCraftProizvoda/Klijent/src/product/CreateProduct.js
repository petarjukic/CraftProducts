import React, { useContext, useState } from "react";
import {navigate} from "@reach/router";
import { UserContext } from "../UserContext";


const CreateProduct = () => {
    const [price, setPrice] = useState("");
    const [productName, setProductName] = useState("");
    const [type, setType] = useState("");
    const [color, setColor] = useState("");
    const [alcoholPercentage, setAlcoholPercentage] = useState("");
    const [companyName, setCompanyName] = useState("");
    const {user, setUser} = useContext(UserContext);


    function onChangeType(e) {
        setType(e.target.value);
    }

    function onChangeCompanyName(e) {
        setCompanyName(e.target.value);
    }

    function onChangeColor(e) {
        setColor(e.target.value);
    }

    function onChangeProductName(e) {
        setProductName(e.target.value);
    }

    function onChangePrice(e) {
        setPrice(e.target.value);
    }

    function onChangeAlcoholPercentage(e) {
        setAlcoholPercentage(e.target.value);
    }
    
    const handleAdd = (e) => {
        e.preventDefault();
        
        fetch("http://localhost:5000/api/product", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({
                price: price,
                productName: productName,
                type: type,
                color: color,
                alcoholPercentage: alcoholPercentage,
                companyName: companyName
            }),
        })
        .then((resp) => resp.json())
        .then((data) => {
            navigate('/'); 
        })
        .catch((err) => console.log(err));
    }

    return(
        <div>
            <h2>Create Product</h2>
            <form onSubmit={(e) => handleAdd(e)}>
            <label htmlFor="price">Price</label>
            <input
                type="text"
                value={price}
                onChange={onChangePrice}
                onBlur={onChangePrice}
            ></input>
            <br/>

            <label htmlFor="productName">Product Name</label>
            <input
                type="text"
                value={productName}
                onChange={onChangeProductName}
                onBlur={onChangeProductName}
            ></input><br/>

            <label htmlFor="alcoholPercentage">Alcohol Percentage</label>
            <input
                type="text"
                value={alcoholPercentage}
                onChange={onChangeAlcoholPercentage}
                onBlur={onChangeAlcoholPercentage}
            ></input>
            <br/>

            <label htmlFor="color">Color</label>
            <input
                type="text"
                value={color}
                onChange={onChangeColor}
                onBlur={onChangeColor}
            ></input>
            <br/>

            <label htmlFor="type">Type</label>
            <input
                type="text"
                value={type}
                onChange={onChangeType}
                onBlur={onChangeType}
            ></input>
            <br/>

            <label htmlFor="companyName">Company Name</label>
            <input
                type="text"
                value={companyName}
                onChange={onChangeCompanyName}
                onBlur={onChangeCompanyName}
            ></input><br/><br/>

            <button type="submit">Insert</button>
            </form>
            <br/>
            <button onClick={() => navigate('/')}>Home</button>
        </div>
    );
}

export default CreateProduct;