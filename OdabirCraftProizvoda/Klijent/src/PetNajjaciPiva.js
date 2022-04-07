import React, { useEffect, useState } from "react";


const PetNajjaciPiva = () => {
    const [petNajjaci, setPetNajjaci] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/products")
        .then((response) => response.json())
        .then((products) => {
        products = products.sort((a, b) =>(a.alcoholPercentage < b.alcoholPercentage) ? 1 : -1);
        console.log(products);
        products.pop()
        products.pop()
        products.pop()
        products.pop()
        setPetNajjaci(products)
        });
    }, []);

    return(
        <div>
            {petNajjaci.map(pet =>
                <h1 key={pet.productName}>{pet.productName}  {pet.alcoholPercentage}</h1>
            )}
            
        </div>
    );
}

export default PetNajjaciPiva;