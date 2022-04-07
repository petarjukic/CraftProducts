import React, { useEffect, useState } from "react";


const ProsjecnaJakost = () => {
    const [jakost, setJakost] = useState("");

    useEffect(() => {
        fetch("http://localhost:5000/api//company-products/" + "Stric")
        .then((response) => response.json())
        .then((products) => { 
            let counter = 0;
            products.map(p => counter +=1);
            let aa = 0;
            products.map(p => aa += p.alcoholPercentage);
            let rez = aa / counter;
            setJakost(rez);
        });
    }, []);

    return(
        <div>
            <h1>{jakost}</h1>
        </div>
    );
}

export default ProsjecnaJakost;