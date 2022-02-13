import { Link, useParams } from "@reach/router";
import React, { useEffect, useState } from "react";


const ProductDetails = (props) => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/products/" + props.productName)
        .then((response) => response.json())
        .then((product) => { 
            setProduct(product)});
    }, []);

    function deleteProduct(productName) {
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        const config = {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json" 
            },
            body: JSON.stringify({productName})
        }
        fetch("http://localhost:5000/api/product/" + productName, options, config)
        .then(response => response.json())
        .then(response => {
            if (response.error) {
                alert(response.error);
              } else {
                alert(`${response} DELETED!`);
                navigate("/");
              }  
        });
    }

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
                        <th>Actions</th>
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
        </div>
    );
}

export default ProductDetails;