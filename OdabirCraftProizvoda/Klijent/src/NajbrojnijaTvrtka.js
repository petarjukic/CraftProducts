import React, { useEffect, useState } from "react";


const NajbrojnijaTvrtka = () => {
    const [tvrtka, setTvrtka] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/api/products")
        .then((response) => response.json())
        .then((products) => { 
            const aa = products.sort((a,b) =>
            products.filter(v => v===a).length
          - products.filter(v => v===b).length
            ).pop();
            console.log(aa);
            setTvrtka(aa);
        });
    }, [])

    return(
        <div>
            <h1>{tvrtka.companyName}</h1>
        </div>
    );
}

export default NajbrojnijaTvrtka;