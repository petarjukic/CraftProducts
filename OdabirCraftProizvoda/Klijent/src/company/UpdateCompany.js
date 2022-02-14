import React, { useEffect, useState } from "react";
import {navigate, useParams} from "@reach/router";


const UpdateCompany = (props) => {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [establishmentYear, setEstablishmentYear] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState("");


    useEffect(() => {
        fetch("http://localhost:5000/api/company/" + props.name)
        .then((response) => response.json())
        .then((comp) => {
            setId(comp[0]._id)
            setName(comp[0].name)
            setEstablishmentYear(comp[0].establishmentYear)
            setCountry(comp[0].country)
            setDescription(comp[0].description)
            setLogo(comp[0].logo)});
    }, []);

    function onChangeDescription(e) {
        setDescription(e.target.value);
    }

    function onChangeLogo(e) {
        setLogo(e.target.value);
    }

    function onChangeCountry(e) {
        setCountry(e.target.value);
    }

    function onEstablishmentYear(e) {
        setEstablishmentYear(e.target.value);
    }

    function onChangeName(e) {
        setName(e.target.value);
    }

    const handleUpdated = (e) => {
        e.preventDefault();
        
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        console.log("BBBBBB ", props._id)
        fetch("http://localhost:5000/api/company/update/" + id, {
            method: "PUT",
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
            <form onSubmit={(e) => handleUpdated(e)}>
                <label htmlFor="name">Name</label>
                    <input type="text"
                        value={name}
                        onChange={onChangeName}>
                    </input>
                    <br/>
                    <label htmlFor="establishmentYear">Establishment Year</label>
                    <input type="text"
                        value={establishmentYear}
                        onChange={onEstablishmentYear}
                        onBlur={onEstablishmentYear}>
                    </input>
                    <br/>
                    <label htmlFor="country">Country</label>
                    <input type="text"
                        value={country}
                        onChange={onChangeCountry}
                        onBlur={onChangeCountry}>
                    </input>
                    <br/>
                    <label htmlFor="description">Description</label>
                    <input type="text"
                        value={description}
                        onChange={onChangeDescription}
                        onBlur={onChangeDescription}>
                    </input>
                    <br/>
                    <label htmlFor="logo">Link for logo</label>
                    <input type="text"
                        value={logo}
                        onChange={onChangeLogo}
                        onBlur={onChangeLogo}>
                    </input><br/>
                <button type="submit">Update</button>
            </form>
            <button onClick={() => navigate('/')}>Home</button>
        </div>
    );
}

export default UpdateCompany;