import React, { useEffect, useState } from "react";


const PivePoBoji = (props) => {
    const [pive, setPive] = useState([]);

    useEffect(() => {
        console.log(props.color);
        fetch("http://localhost:5000/api/boja/" + props.color)
        .then((response) => response.json())
        .then((products) => {

            setPive(products);
            console.log(products);
        });
    }, []);

    return(
        <div>
           {pive.length > 0 ? pive.map(p =>
                <h2>{p.productName} {p.color}</h2>
            ) : <h1>List is empty</h1>}
        </div>
    );
}

export default PivePoBoji;