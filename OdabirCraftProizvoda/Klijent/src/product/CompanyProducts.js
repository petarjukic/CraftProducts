import React, { useEffect, useState } from "react";
import {navigate, Link} from "@reach/router";


const CompanyProducts = (props) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/company-products/" + props.companyName)
        .then((response) => response.json())
        .then((prod) => {
            setProducts(prod)});
    }, []);

    return(
        <div>
            <h2>Products for {props.companyName}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product name</th>
                        <th>Color</th>
                        <th>Type</th>
                        <th>Company name</th>
                        <th>Price</th>
                        <th>Alcohol Percentage</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map(p => 
                        <tr key={p.productName}>
                            <td className="name">{p.productName}</td>
                            <td>{p.color}</td>
                            <td>{p.type}</td>
                            <td>{p.companyName}</td>
                            <td>${p.price}</td>
                            <td>{p.alcoholPercentage}</td>
                            <td>
                                <button onClick={() => deleteProduct(p.productName)}>Delete</button>
                                <Link to={"/product/update/" + p.productName}>
                                    <button>Update</button>
                                </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button onClick={() => navigate('/')}>Home</button>
        </div>
    );
}

export default CompanyProducts;