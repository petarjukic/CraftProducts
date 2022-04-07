import React, { useEffect, useState } from "react";


const JednaPivaJednaTvrtka = () => {
    const [pive, setPive] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/products")
        .then((response) => response.json())
        .then((products) => {
            console.log(products);
            let key = 'companyName';
            let uniques  = [...new Map(products.map(item =>
                [item[key], item])).values()];
            console.log(uniques)
            setPive(uniques);
        });
    }, []);
    
    return(
        <div>
            {pive.map(p => 
                <h2 key={p.productName}>{p.productName} {p.companyName} <br></br></h2>
            )}
        </div>
    );
}

export default JednaPivaJednaTvrtka;