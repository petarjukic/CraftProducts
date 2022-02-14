import React, { useEffect, useState } from "react";
import {navigate} from "@reach/router";


const CreateCompany = () => {
    const [name, setName] = useState("");
    const [establishmentYear, setEstablishmentYear] = useState("");
    const [country, seCountry] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState("");

    // useEffect(() => {
    //     const options = {headers:{
    //         Authorization: "Bearer " + localStorage.getItem("token")
    //     }};
    //     const bearerToken = options.headers.Authorization
    //     const token = bearerToken ? bearerToken.split('Bearer ')[1] : undefined;
    //     console.log("AAAAAAAAAA ", token);
    // }, []);

    function onChangeDescription(e) {
        setDescription(e.target.value);
    }

    function onChangeLogo(e) {
        setLogo(e.target.value);
    }

    function onChangeCountry(e) {
        seCountry(e.target.value);
    }

    function onEstablishmentYear(e) {
        setEstablishmentYear(e.target.value);
    }

    function onChangeName(e) {
        setName(e.target.value);
    }
    
    const handleAdd = (e) => {
        e.preventDefault();
        
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        //const bearerToken = options.headers
        //const token = bearerToken ? bearerToken.split('Bearer ')[1] : undefined;
        fetch("http://localhost:5000/api/company", options, {
            method: "POST",
            body: JSON.stringify({
                name: name,
                establishmentYear: establishmentYear,
                country: country,
                description: description,
                logo: logo
            }),
            headers: {"Content-type": "application/json;charset=UTF-8"}
        })
        .then((resp) => resp.json())
        .then((data) => {
            navigate('/'); 
        })
        .catch((err) => console.log(err));
    }

    return(
        <div>
            <h2>Create Company</h2>
            <form onSubmit={(e) => handleAdd(e)}>

            <label htmlFor="name">Name</label>
            <input
                type="text"
                value={name}
                onChange={onChangeName}
                onBlur={onChangeName}
            ></input>
            <br/>

            <label htmlFor="establishmentYear">Establishment Year</label>
            <input
                type="text"
                value={establishmentYear}
                onChange={onEstablishmentYear}
                onBlur={onEstablishmentYear}
            ></input><br/>

            <label htmlFor="country">Country</label>
            <input
                type="text"
                value={country}
                onChange={onChangeCountry}
                onBlur={onChangeCountry}
            ></input>
            <br/>

            <label htmlFor="logo">Link for logo</label>
            <input
                type="text"
                value={logo}
                onChange={onChangeLogo}
                onBlur={onChangeLogo}
            ></input><br/>

            <label htmlFor="description">Description</label>
            <input
                type="text"
                value={description}
                onChange={onChangeDescription}
                onBlur={onChangeDescription}
            ></input>
            <br/><br/>

            <button type="submit">Insert</button>
            </form>
            <br/>
            <button onClick={() => navigate('/')}>Home</button>
        </div>
    );
}

export default CreateCompany;