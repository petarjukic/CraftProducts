import { useParams } from "@reach/router";
import React, { Component, useEffect, useState } from "react";


const CompanyDetails = (props) => {
    const [company, setCompany] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/company/" + props.name)
        .then((response) => response.json())
        .then((comp) => { 
            setCompany(comp)});
    }, [])
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
                    </tr>
                </thead>
                <tbody>
                    {company && company.map(c => 
                        <tr key={c.name}>
                            <td className="name">{c.name}</td>
                            <td>{c.establishmentYear}</td>
                            <td>{c.country}</td>
                            <td>{c.description}</td>
                            <td><image src={c.logo} alt={c.name} /></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default CompanyDetails;