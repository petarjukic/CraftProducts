import React, {useState, useEffect, useContext} from "react";
import Results from "./Result";


const SearchParams = () =>{
    const [location, setLocation] = useState("Split");
    const [genres, setGenres] = useState([]);
    const [genre, setGenre] = useState("British");
    const [moviesData, setMovies] = useState([]);
    const [theme, setTheme] = useContext(ThemeContext);

    useEffect(()=>{
        const options = {headers:{
            Authorization: "Bearer " + localStorage.getItem("token")
        }};
        fetch("http://localhost:4000/api/genres", options)
        .then((response)=>response.json())
        .then((genres)=>setGenres(genres));
    },
    
    []);

    function getMovies(){
        fetch(`http://localhost:4000/api/movies?genre=${genre}`)
        .then((response)=> response.json())
        .then((movies)=>(setMovies(movies)));
    }

    return(
        <div className="search-params">
            {/* 
            <form onSubmit={
        (e)=>{e.preventDefault();
            getMovies();}
            }>
                <select id="genre" onChange={(e)=>setGenre(e.target.value)}>
    {genres.map((item)=>{return <option value={item}>{item}</option>})}
            </select>
            <button style={{backgroundColor:theme}}>Klikni!</button>
            </form>
            <Results genre={genre} movies={moviesData}/>
                 */}
        </div>
    );
}

export default SearchParams;