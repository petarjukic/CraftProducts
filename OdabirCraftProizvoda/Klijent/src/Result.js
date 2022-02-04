import React from "react";
import Movie from "./Movie";


const Results = ({genre, movies}) =>{
    return(
        <div className="search">
           {
               movies.map((item)=>{return <Movie genre={genre} name={item.name} id={item._id}/>})
           }
        </div>
    );
}

export default Results;