import React from "react";
import { Link } from "react-router-dom";
import styleLanding from './Landing.module.css';

export default function Landing() {
    return (
        <div className={styleLanding.landing}>
            {/* <h1>Bienvenidos a ApiGAME!!</h1> */}
            <button className={styleLanding.btn}>
                <Link to='/home'>EMPEZAR</Link>
            </button>
        </div>
    );
}