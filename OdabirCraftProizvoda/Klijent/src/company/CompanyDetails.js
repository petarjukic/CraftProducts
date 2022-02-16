import { navigate, useParams, Link } from "@reach/router";
import React, { Component, useContext, useEffect, useState } from "react";
import { UserContext } from "../UserContext";


const CompanyDetails = (props) => {
    const [company, setCompany] = useState([]);
    const {user, setUser} = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);


    useEffect(() => {
        if(user) {
            fetch("http://localhost:5000/api/check/" + user)
            .then((response) => response.json())
            .then((email) => {
                email.map((em) => {
                    console.log(em.role)
                    if(em.role == "admin") {
                        setIsAdmin(true);
                    }
                })
            })
        }

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

       fetch("http://localhost:5000/api/checkProduct/" + name)
        .then(response => response.json())
        .then(product => {
            if(product.error) {
                alert(product.error);
            }
            else {
                if(product.length == 0) {
                    fetch("http://localhost:5000/api/company/" + name, config)
                    .then(response => response.json())
                    .then(response => {
                        if (response.error) {
                            alert(response.error);
                        } else {
                            alert("DATA DELETED!");
                            navigate("/");
                        }  
                    });
                }
                else {
                    alert("DATA IS RELATED, UNABLE TO DELETE");
                }
            }
        })
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
                        {isAdmin ? <th>Actions</th> : <th></th> }
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
                                <Link to={"/" }>
                                    <button>Home</button>
                                </Link>
                                {isAdmin ? <div>
                                        <button onClick={() => deleteCompany(c.name)}>Delete</button>
                                        <Link to={"/company/update/" + c.name}>
                                            <button>Update</button>
                                        </Link>
                                    </div> :
                                <div>
                                </div>
                                }
                                <Link to={"/products/" + c.name}>
                                    <button>All Products</button>
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