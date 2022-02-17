import React, { useContext, useEffect, useState } from "react";
import {navigate, useParams} from "@reach/router";
import { UserContext } from "../UserContext";


const UpdateProduct = (props) => {
    const [id, setId] = useState("");
    const [price, setPrice] = useState("");
    const [alcoholPercentage, setAlcoholPercentage] = useState("");
    const [productName, setProductName] = useState("");
    const [color, setColor] = useState("");
    const [type, setType] = useState("");
    const [companyName, setCompanyName] = useState("");

    const {user, setUser} = useContext(UserContext);

    
    useEffect(() => {
        fetch("http://localhost:5000/api/products/" + props.productName)
        .then((response) => response.json())
        .then((prod) => {
            setId(prod[0]._id)
            setPrice(prod[0].price)
            setAlcoholPercentage(prod[0].alcoholPercentage)
            setProductName(prod[0].productName)
            setColor(prod[0].color)
            setCompanyName(prod[0].companyName)
            setType(prod[0].type)});
    }, []);

    const handleUpdated = (e) => {
        e.preventDefault();
        
        fetch("http://localhost:5000/api/product/update/" + id, {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({
                price: price,
                alcoholPercentage: alcoholPercentage,
                productName: productName,
                color: color,
                type: type,
                companyName: companyName
            }),
        })
        .then((resp) => resp.json())
        .then((data) => {
            navigate('/'); 
        })
        .catch((err) => console.log(err));
    }

    function onChangeProductName(e) {
        setProductName(e.target.value);
    }

    function onChangeColor(e) {
        setColor(e.target.value);
    }

    function onChangeType(e) {
        setType(e.target.value);
    }

    function onChangeCompanyName(e) {
        setCompanyName(e.target.value);
    }

    function onChangeAlcoholPercentage(e) {
        setAlcoholPercentage(e.target.value);
    }

    function onChangePrice(e) {
        setPrice(e.target.value);
    }

    return(
        <div>
            <form onSubmit={(e) => handleUpdated(e)}>
                <label htmlFor="name">Product Name</label>
                    <input type="text"
                        value={productName}
                        onChange={onChangeProductName}>
                    </input>
                    <br/>
                    <label htmlFor="establishmentYear">Color</label>
                    <input type="text"
                        value={color}
                        onChange={onChangeColor}
                        onBlur={onChangeColor}>
                    </input>
                    <br/>
                    <label htmlFor="country">Type</label>
                    <input type="text"
                        value={type}
                        onChange={onChangeType}
                        onBlur={onChangeType}>
                    </input>
                    <br/>
                    <label htmlFor="description">Company Name</label>
                    <input type="text"
                        value={companyName}
                        onChange={onChangeCompanyName}
                        onBlur={onChangeCompanyName}>
                    </input>
                    <br/>
                    <label htmlFor="logo">Alcohol Percentage</label>
                    <input type="text"
                        value={alcoholPercentage}
                        onChange={onChangeAlcoholPercentage}
                        onBlur={onChangeAlcoholPercentage}>
                    </input><br/>
                    <label htmlFor="logo">Price</label>
                    <input type="text"
                        value={price}
                        onChange={onChangePrice}
                        onBlur={onChangePrice}>
                    </input><br/>
                <button type="submit">Update</button>
            </form>
            <button onClick={() => navigate('/')}>Home</button>
        </div>
    );
}

export default UpdateProduct;