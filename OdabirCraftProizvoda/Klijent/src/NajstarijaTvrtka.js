import React, { useEffect, useState } from "react";


const NajstarijaTvrtka = () => {
    const [tvrtka, setTvrtka] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/company")
        .then((response) => response.json())
        .then((companies) => {
            const max = companies.reduce(function(prev, current) {
                return (prev.establishmentYear < current.establishmentYear) ? prev : current
            })
            setTvrtka(max)
        });
    }, []);

    return(
        <div>
            <h1>{tvrtka.name} {tvrtka.establishmentYear}</h1>
        </div>
    );
}

export default NajstarijaTvrtka;