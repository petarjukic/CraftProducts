import React, { useEffect, useState } from "react";


const Najskuplje = () => {
    const [najskuplje, setNajskuplje] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/products")
        .then((response) => response.json())
        .then((products) => { 
            products = products.sort((a, b) =>(a.price < b.price) ? 1 : -1);
            let key = 'price';
            let uniques  = [...new Map(products.map(item =>
                [item[key], item])).values()];
            setNajskuplje(uniques);
        });
    }, []);

    return(
        <div>
            {najskuplje.map(n => 
                <h2 key={n.price}>{n.productName} {n.price}<br></br></h2>    
            )}
        </div>
    );
}

export default Najskuplje;