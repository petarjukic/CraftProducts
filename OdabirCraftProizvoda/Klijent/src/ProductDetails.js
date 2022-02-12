import { useParams } from "@reach/router";
import React, { Component, useEffect, useState } from "react";


const ProductDetails = (props) => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/products/" + props.productName)
        .then((response) => response.json())
        .then((product) => { 
            setProduct(product)});
    }, [])
    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product name</th>
                        <th>Color</th>
                        <th>Type</th>
                        <th>Company name</th>
                        <th>Price</th>
                        <th>Alcohol Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    {product && product.map(p => 
                        <tr key={p.productName}>
                            <td className="name">{p.productName}</td>
                            <td>{p.color}</td>
                            <td>{p.type}</td>
                            <td>{p.companyName}</td>
                            <td>${p.price}</td>
                            <td>{p.alcoholPercentage}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ProductDetails;