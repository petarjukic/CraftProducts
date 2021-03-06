import React, {useState, useEffect, useContext} from "react";
import { Link, navigate } from "@reach/router";
import { UserContext } from "./UserContext";


const SearchParams = () => {
    const [companies, setCompanies] = useState([]);
    const {user, setUser} = useContext(UserContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const [boja, setBoja] = useState("");
    const [nesto, setNesto] = useState("");

    
    useEffect(() => {
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};

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

        fetch("http://localhost:5000/api/company", options)
        .then((response) => response.json())
        .then((companies) => {
            console.log("OVO JE EMAIL ", user);
            companies = companies.sort((a, b) =>(a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1);
            setCompanies(companies)
        });
    },[]);

    function handleBoja(e) {
        e.preventDefault();
    }

    function onChangeBoja(e) {
        setBoja(e.target.value);
    }

    return(
        <div className="search-params">
            {user ? 
                <button onClick={() => navigate('/logout')}>Logout</button> : 
                <div>
                    <button onClick={() => navigate('/login')}>Login</button>
                    <button onClick={() => navigate('/register')}>Register</button>
                </div>
            }
            {isAdmin ? <div>
                    <button onClick={() => navigate('/createProduct')}>Insert Product</button>
                    <button onClick={() => navigate('/createCompany')}>Insert Company</button>
                </div> : 
                <div>        
                </div>
            }
            <button onClick={() => navigate('/products')}>Products</button><br/>

            <button onClick={() => navigate('/najjacePivo')}>Najjace Pivo</button>
            <button onClick={() => navigate('/najbrojnija')}>Najbrojnija</button>
            <button onClick={() => navigate('/pet')}>pet najjaci</button>
            <button onClick={() => navigate('/najstarija')}>Najstarija</button>
            <button onClick={() => navigate('/prosjek')}>Prosjecna jakost</button>
            <button onClick={() => navigate('/odSvake')}>Tvrtka Najjaca</button>
            <button onClick={() => navigate('/poJedna')}>Jedna piva 1 Tvrtka</button>
            <button onClick={() => navigate('/najskuplje')}>5 Najskuplje</button>
            <button onClick={() => navigate('/najbrojnije')}>5 Najbrojnije</button>

            <form onSubmit={(e) => {handleBoja(e);}}>
            <label htmlFor="boja">Boja</label>
            <input
                type="text"
                value={boja}
                onChange={onChangeBoja}
                onBlur={onChangeBoja}
            ></input>
            <button onClick={() => navigate('/boja/' + boja)}>Bojaa</button>
            </form>

            <select 
                onChange={(e) => {
                    setNesto(e.target.value)
                }}
                >
                    <option value="">NESTO</option>
                    {companies.map((comp) => 
                        <option key={comp.name} value={comp.name}>{comp.name}</option>     
                    )}
                </select>

  
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