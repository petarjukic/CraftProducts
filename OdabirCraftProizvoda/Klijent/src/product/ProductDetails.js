import { Link, useParams } from "@reach/router";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";


const ProductDetails = (props) => {
    const [product, setProduct] = useState([]);
    const {user, setUser} = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);


    useEffect(() => {
        fetch("http://localhost:5000/api/products/" + props.productName)
        .then((response) => response.json())
        .then((product) => { 
            check()
            setProduct(product)});
    }, []);

    function check() {
        if(user) {
            fetch("http://localhost:5000/api/check/" + user)
            .then((response) => response.json())
            .then((email) => {
                email.map((em) => {
                    console.log(em.role)
                    if(em.role == "admin") {
                        setIsAdmin(true);
                    }
                })
            })
        }
    }

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
                        {isAdmin ? <th>Actions</th> : <th></th> }
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
                                { isAdmin ? <div>
                                    <button onClick={() => deleteProduct(p.productName)}>Delete</button>
                                    <Link to={"/product/update/" + p.productName}>
                                        <button>Update</button>
                                    </Link>
                                    <Link to={"/" }>
                                        <button>Home</button>
                                    </Link>
                                </div> : 
                                <div>
                                    <Link to={"/" }>
                                        <button>Home</button>
                                    </Link>
                                </div>
                                }
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ProductDetails;