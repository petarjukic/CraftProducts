import React from "react";
import {Link} from "@reach/router";


const Product = ({genre, name, id}) =>{
    return(
        <div className="product">
            <Link to={`/${genre}/details/${id}`}> {/* FIX */}
            <h1>{name}</h1>
            </Link>
        </div>
    );
}

export default Product;