import React, {useState, useEffect, useContext} from "react";
import Results from "./Result";
import { navigate } from "@reach/router";


const SearchParams = () => {
    const [companies, setCompanies] = useState([]);
    const [company, setCompany] = useState("");
    const [productData, setProducts] = useState([]);

    useEffect(() => {
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        fetch("http://localhost:5000/api/company", options)
        .then((response) => response.json())
        .then((companies) => {
            companies = companies.sort((a, b) =>(a.name > b.name) ? 1 : -1);
            setCompanies(companies)
        });
    },[]);

    // function getProducts(){
    //     fetch(`http://localhost:5000/api/products?company=${company}`) ///CHECK
    //     .then((response) => response.json())
    //     .then((movies) => (setProducts(movies)));
    // }

    function navigateToCompanyDetail(companyName) {
        console.log("RAAADIIIII", companyName);
    }

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
                            <td onClick={() => navigateToCompanyDetail(comp.name)} className="name">{comp.name}</td>
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