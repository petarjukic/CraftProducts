import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";


const NajjacePivo = () => {
    const [piva, setPiva] = useState([]);
    const [products, setProducts] = useState([]);
    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        fetch("http://localhost:5000/api/products")
        .then((response) => response.json())
        .then((products) => { 
            const aa = Math.max.apply(Math, products.map(function(o) { return o.alcoholPercentage; }))
            console.log(aa)
            const max = products.reduce(function(prev, current) {
                return (prev.alcoholPercentage > current.alcoholPercentage) ? prev : current
            }) 
            console.log(max)
            setPiva(max)
        });
    }, [])

    return(
        <div>
            {piva.productName}
            {piva.alcoholPercentage}
        </div>
    );
}

export default NajjacePivo;