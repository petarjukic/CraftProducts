import React from "react";
import {Link} from "@reach/router";


const Movie = ({genre, name, id}) =>{
    return(
        <div className="movie">
            <Link to={`/${genre}/details/${id}`}>
            <h1>{name}</h1>
            </Link>
        </div>
    );
}

export default Movie;