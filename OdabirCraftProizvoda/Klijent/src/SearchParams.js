import React, {useState, useEffect, useContext} from "react";
import { Link, navigate } from "@reach/router";
import { UserContext } from "./UserContext";


const SearchParams = () => {
    const [companies, setCompanies] = useState([]);
    const {user, setUser} = useContext(UserContext);


    useEffect(() => {
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};

        fetch("http://localhost:5000/api/company", options)
        .then((response) => response.json())
        .then((companies) => {
            console.log("OVO JE EMAIL ", user);
            companies = companies.sort((a, b) =>(a.name > b.name) ? 1 : -1);
            setCompanies(companies)
        });
    },[]);

    return(
        <div className="search-params">
            {user ? 
                <button onClick={() => navigate('/logout')}>Logout</button> : 
                <div> 
                    <button onClick={() => navigate('/login')}>Login</button>
                    <button onClick={() => navigate('/register')}>Register</button>
                </div>
            }

            <button onClick={() => navigate('/products')}>Products</button>
            <button onClick={() => navigate('/createProduct')}>Insert Product</button>
            <button onClick={() => navigate('/createCompany')}>Insert Company</button>
            
            <table>
                <thead>
                    <tr>
                        <th>Company name</th>
                        <th>Country</th>
                        <th>Establishment year</th>
                    </tr>
                </thead>
                <tbody>
                    {companies && companies.map(comp => 
                        <tr key={comp.name}>
                            <Link to={"/company/details/" + comp.name}>
                                <td className="name">{comp.name}</td>
                            </Link>
                            <td>{comp.country}</td>
                            <td>{comp.establishmentYear}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default SearchParams;