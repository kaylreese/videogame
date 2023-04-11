import React from "react";
import styleCard from './Card.module.css'
import Rating from "../Rating/Rating";

export default function Card(props) {
    return (
        <div className={styleCard.card}>   
            <div className={styleCard.imgBx}>
                <img src={props.image} alt="" />
            </div>
            <div className={styleCard.detalle}>
                <h2>{props.name}</h2>
                <center>
                    <Rating rating={props.rating} />
                </center>
                <div>
                    {/* <h4>Genres:</h4> */}
                    {
                        props.genres.map(elem => <span key={elem.name}>{elem.name}</span>)
                    }
                </div>
            </div>
        </div>
    );
}