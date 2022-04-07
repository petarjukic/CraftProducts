import React, { useEffect, useState } from "react";


const NajbrojnijeTvrtke = () => {
    const [najbrojnije, setNajbrojnije] = useState([]);
    let tvrtke = {};
    let tvrtkeArr1 = [];
    

    useEffect(() => {
        fetch("http://localhost:5000/api/products")
        .then((response) => response.json())
        .then((products) => {
            setNajbrojnije(products)
        });
    }, []);

    function izbroji() {
        let te = []
        let neki = {}
        let br = 0;

        najbrojnije.map(prod => {
            tvrtke.ime = prod.companyName;
            tvrtke.brojac = 0;
            neki.ime = prod.companyName;
            neki.brojac = 0;
            prod.brojac = 0;
            br = 0;
            najbrojnije.map(prod1 => {
                if(prod.companyName == prod1.companyName) {
                    br += 1;
                    tvrtke.brojac += 1;
                    prod.brojac += 1
                }
            })
            te.push(br)
            tvrtkeArr1.push(tvrtke);
        })
    }

    return(
        <div>
            <button onClick={izbroji}>Dohvati</button>
            {/* {najbrojnije.map(na => 
                <h2>{na.ime}</h2>    
            )} */}
            {/* {najbrojnije.ime} */}
        </div>
    );
}

export default NajbrojnijeTvrtke;