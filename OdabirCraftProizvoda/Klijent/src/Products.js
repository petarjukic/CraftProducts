import React, {useEffect, useState} from "react";
import { navigate } from "@reach/router";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [productData, setProducts1] = useState([]);

    useEffect(() => {
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        fetch("http://localhost:5000/api/products", options)
        .then((response) => response.json())
        .then((products) => setProducts(products));
    },[]);

    return(
        <div className="search-params">
            <div>
                <button onClick={() => navigate('/login')}>Login</button>
                <button onClick={() => navigate('/register')}>Register</button>
                <button onClick={() => navigate('/logout')}>Logout</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Product name</th>
                        <th>Color</th>
                        <th>Type</th>
                        <th>Company name</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map(p => 
                        <tr key={p.productName}>
                            <td>{p.productName}</td>
                            <td>{p.color}</td>
                            <td>{p.type}</td>
                            <td>{p.companyName}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Products;