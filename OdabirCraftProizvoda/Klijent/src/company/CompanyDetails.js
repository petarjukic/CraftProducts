import { navigate, useParams, Link } from "@reach/router";
import React, { Component, useEffect, useState } from "react";


const CompanyDetails = (props) => {
    const [company, setCompany] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/company/" + props.name)
        .then((response) => response.json())
        .then((comp) => { 
            setCompany(comp)});
    }, []);

    function deleteCompany(name) {
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        const config = {
            method: "DELETE",
            headers: {
            "Content-Type": "application/json" 
            },
            body: JSON.stringify({name})
        }
        fetch("http://localhost:5000/api/company/" + name, options, config)
        .then(response => response.json())
        .then(response => {
            if (response.error) {
                alert(response.error);
              } else {
                alert(`${response} DELETED!`);
                navigate("/");
              }  
        });
    }

    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Establishment Year</th>
                        <th>country</th>
                        <th>Description</th>
                        <th>Logo</th>
                        {/* IF USER IS ADMIN */}
                        <th>Actions</th> 
                    </tr>
                </thead>
                <tbody>
                    {company && company.map(c => 
                        <tr key={c.name}>
                            <td className="name">{c.name}</td>
                            <td>{c.establishmentYear}</td>
                            <td>{c.country}</td>
                            <td>{c.description}</td>
                            <td><img key={c.logo} src={c.logo} alt={c.name} /></td>
                            <td>
                                <button onClick={() => deleteCompany(c.name)}>Delete</button>
                                <Link to={"/company/update/" + c.name}>
                                    <button>Update</button>
                                </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default CompanyDetails;