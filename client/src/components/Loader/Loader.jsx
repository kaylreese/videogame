import React from "react";
import styleLoader from "./Loader.module.css";

export default function Loader() {
    return (
        <div className={styleLoader.center}>
            <div className={styleLoader.ring}></div>
            <span>Loading...</span>
        </div>
    );
}