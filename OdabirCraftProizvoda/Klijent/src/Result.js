import React from "react";
import Product from "./Product";

                // company, product
const Results = ({genre, movies}) =>{
    return(
        <div className="search">
           {
               movies.map((item)=>{return <Product genre={genre} name={item.name} id={item._id}/>})
           }
        </div>
    );
}

export default Results;