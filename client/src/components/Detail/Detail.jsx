import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getVideogame } from "../../redux/actions";
import stylesDetail from './Detail.module.css';
import Loader from "../Loader/Loader";
import Description from "../Description/Description";
import Rating from "../Rating/Rating";

export default function Detail () {
    const { id } = useParams();
    const history = useHistory();

    const dispatch = useDispatch();
    const videogame = useSelector((state) => state.videogame);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        setLoader(true);
        setTimeout(() => {
            setLoader(false);
        }, 1000);
    }, []);
    
    useEffect(() => {
        dispatch(getVideogame(id));
    }, [id]);

    const backToHome = () => {
        history.push("/home");
    }

    return (
        <>
            {
                loader ? (
                    <Loader />
                ) : (
                    <div className={stylesDetail.content}>
                        { videogame ? (
                            
                            <div className={stylesDetail.container}>
                                <div>
                                    <div className={stylesDetail.datos}>
                                        <center>
                                            <h5>
                                                {videogame.genres?.name}
                                                {
                                                    videogame.genres.map((elem) => {
                                                        return <span key={elem.name}>{elem.name}</span>
                                                    })
                                                }
                                            </h5>
                                        </center>
                                        <center><h1>({videogame.id}) {videogame.name}</h1></center>

                                        {/* <h5>Rating: {videogame.rating} (
                                            <Rating rating={videogame.rating} />
                                            )
                                        </h5> */}
                                        <center> ( <Rating rating={videogame.rating} /> ) </center>
                                        <h4>Launch Date: {videogame.released}</h4>  
                                        <p className={stylesDetail.subtitulo}>Platforms:</p> 
                                        <p>
                                            {videogame.platforms?.name}
                                                {
                                                    videogame.platforms.map((elem) => {
                                                        return <span key={elem.name}>{elem.name}</span>
                                                    })
                                                }
                                        </p> 
                                    </div>
                                    <div className={stylesDetail.image}>
                                        <img src={videogame.image} alt={videogame.image} />
                                    </div>
                                </div>
                                <div>
                                    <div className={stylesDetail.descripcion}>
                                        <h4 className={stylesDetail.subtitulo}>Description: </h4>
                                        {/* { videogame.description } */}
                                        <Description description={videogame.description} />
                                    </div>
                                    <div className={stylesDetail.btn}>
                                        <center>
                                            <button className={stylesDetail.btnregresar} onClick={backToHome}>BACK TO HOME</button>
                                        </center>
                                    </div>
                                </div>
                            </div>
                        ) : ( 
                            <h1>No hay datos para mostrar</h1>
                        )}
                    </div>
                )
            }
        </>
    );
}