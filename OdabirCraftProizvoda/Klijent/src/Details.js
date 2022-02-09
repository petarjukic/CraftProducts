import React from "react";
import {navigate} from "@reach/router";


class Details extends React.Component{
    constructor(props){
        super(props);
        this.state = {loading:true, showModal:false, url:"https://www.imdb.com/search/"};
        this.props = {id: props.id, genre:props.genre};
    }

    componentDidMount(){
        fetch(`http://localhost:5000/api/movies?genre=${this.props.genre}`)
        .then((response)=>response.json())
        .then((movies)=>{
            let filteredMovie = movies.filter((movie)=>(movie._id == this.props.id));
            console.log(filteredMovie[0]);
            this.setState({
                name:filteredMovie[0].name,
                id:filteredMovie[0]._id,
                images:filteredMovie[0].images,
                loading:false
            });
        }).catch((err)=>(console.log(err)));
    }


    changeModalState = () => this.setState({showModal:!this.state.showModal});
    movieImdb = () => navigate(this.state.url);

    render(){
        const {images, name, loading, showModal} = this.state;
        return(
            <div className="details">
            <div>                
                <h1>{name}</h1>
                <h1>{loading ? "loading ...": "movie loaded"}</h1>              
            </div>
            </div>
        );
    }
}

export default Details;