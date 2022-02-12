import React, {useState, useEffect, useContext} from "react";
import Results from "./Result";
import { Link, navigate } from "@reach/router";


const SearchParams = () => {
    const [companies, setCompanies] = useState([]);
    const [company, setCompany] = useState("");
    const [productData, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/company")
        .then((response) => response.json())
        .then((companies) => {
            companies = companies.sort((a, b) =>(a.name > b.name) ? 1 : -1);
            setCompanies(companies)
        });
    },[]);

    return(
        <div className="search-params">
            {/* check how to hide buttons */}
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/register')}>Register</button>
            <button onClick={() => navigate('/logout')}>Logout</button>
            
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