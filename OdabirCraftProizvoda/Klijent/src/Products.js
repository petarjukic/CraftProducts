import React, {useEffect, useState} from "react";
import { Link, navigate } from "@reach/router";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [productData, setProducts1] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/products")
        .then((response) => response.json())
        .then((products) => { 
            products = products.sort((a, b) =>(a.productName > b.productName) ? 1 : -1);
            setProducts(products) });
    },[]);

    const navigateToProductDetail = (productName) => {
        console.log("AAAAA ", productName);
    }

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
                            <Link to={"/product/details/" + p.productName}>
                            <td onClick={() => navigateToProductDetail(p.productName)} className="name">{p.productName}</td>
                            </Link>
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