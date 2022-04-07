import React, { useEffect, useState } from "react"; 


const TvrtkaNajjacaPiva = () => {
    const [najjaca, setNajjaca] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api//company-products/" + "Stric")
        .then((response) => response.json())
        .then((products) => { 
            const max = products.reduce(function(prev, current) {
                return (prev.alcoholPercentage > current.alcoholPercentage) ? prev : current
            })
            setNajjaca(max);
        });
    }, []);

    return(
        <div>
            <h1>{najjaca.alcoholPercentage} {najjaca.productName} </h1>
        </div>
    );
}

export default TvrtkaNajjacaPiva;