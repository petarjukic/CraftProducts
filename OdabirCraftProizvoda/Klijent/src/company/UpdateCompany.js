import React, { useEffect, useState } from "react";


const UpdateCompany = (props) => {
    const [company, setCompany] = useState([]);
    const [name, setName] = useState("");
    const [establishmentYear, setEstablishmentYear] = useState("");
    const [country, seCountry] = useState("");
    const [description, setDescription] = useState("");
    const [logo, setLogo] = useState("");


    useEffect(() => {
        fetch("http://localhost:5000/api/company/" + props.name)
        .then((response) => response.json())
        .then((comp) => { 
            setCompany(comp)});
    }, []);

    function onChangeDescriptio(e) {
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

    const handleUpdated = (e) => {
        e.preventDefault();
        
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};

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
            {company.map(c => <input type="text"
                                    value={c.name}
                                    onChange={onChangeName}
                                    onBlur={onChangeName}>
                                    </input>)}
             {/* <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Establishment Year</th>
                        <th>country</th>
                        <th>Description</th>
                        <th>Logo</th>
                    </tr>
                </thead>
                <tbody>
                    <form onSubmit={(e) => handleUpdated(e)}>
                        {company && company.map(c => 
                            <tr key={c.name}>
                                <td>
                                    <input type="text"
                                    value={c.name}
                                    onChange={onChangeName}
                                    onBlur={onChangeName}>
                                    </input>
                                </td>
                                <td>
                                    <input type="text"
                                        value={c.establishmentYear}
                                        onChange={onEstablishmentYear}
                                        onBlur={onEstablishmentYear}>
                                    </input> 
                                </td>
                                <td>
                                    <input type="text"
                                        value={c.country}
                                        onChange={onChangeCountry}
                                        onBlur={onChangeCountry}>
                                    </input>
                                </td>
                                <td>
                                    <input type="text"
                                        value={c.description}
                                        onChange={onChangeDescriptio}
                                        onBlur={onChangeDescriptio}>
                                    </input>
                                </td>
                                <td>
                                    <input type="text"
                                        value={c.logo}
                                        onChange={onChangeLogo}
                                        onBlur={onChangeLogo}>
                                    </input>
                                </td>
                            </tr>
                        )}
                    </form>
                </tbody>
            </table> */}
        </div>
    );
}

export default UpdateCompany;