import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getGenres, getPlatforms, addVideogame } from "../../redux/actions";
import styleCreate from './Create.module.css';
import { FaStar } from 'react-icons/fa';
import { validacion } from "./validacion";

export default function Create() {
    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);
    const platforms = useSelector((state) => state.platforms);
    const history = useHistory();

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms());
    }, [dispatch]);

    const [ videogameData, setVideogameData ] = useState({
        name: "",
        rating: "",
        platforms: [],
        genres: [],
        image: "",
        description: ""
    });

    const [ dataPlatforms, setDataPlatforms ] = useState([]);
    const [ dataGenres, setDataGenres ] = useState([]);
    const [ rating, setRating ] = useState(null);

    const [ errors, setErrors ] = useState({
        name: "",
        rating: "",
        platforms: [],
        genres: [],
        image: "",
        description: ""
    });

    const handleInputChange = (e) => {
        setVideogameData({
            ...videogameData, [e.target.name]: e.target.value,
        });

        setErrors (
            validacion({
                ...videogameData, [e.target.name]: e.target.value,
            })
        )
    };

    const handleSelectPlatforms = (selected) => {
        const opcion = selected.target.selectedOptions[0].label;

        const validar = dataPlatforms.includes(opcion);

        if(!validar) {
            setDataPlatforms([
                ...dataPlatforms, opcion,
            ]);

            setVideogameData({
                ...videogameData, ['platforms']: dataPlatforms,
            });
        }

        setErrors (
            validacion({
                ...videogameData
            })
        )
    };

    const handleSelectGenres = (selected) => {
        const opcion = selected.target.selectedOptions[0].label;

        const validar = dataGenres.includes(opcion);

        if(!validar) {
            setDataGenres([
                ...dataGenres, opcion,
            ]);

            setVideogameData({
                ...videogameData, ['genres']: dataGenres,
            });
        }

        setErrors (
            validacion({
                ...videogameData
            })
        )
    };

    const handleRating = (valor) => {
        setRating(valor);
        setVideogameData({
            ...videogameData, ['rating']: valor,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(videogameData);

        if(videogameData.name.trim() === '' || videogameData.description === '' || videogameData.rating === '' || videogameData.platforms === '' || videogameData.genres === '' || videogameData.image === '') {
            alert("Todos los Datos son requeridos, vuelva a intentarlo");
        } else {
            try {
                const newVideogame = await addVideogame(videogameData);
                alert(newVideogame.payload);
                setVideogameData ({
                    name: "",
                    description: "",
                    rating: "",
                    platforms: [],
                    genres: [],
                    image: ""
                });
                history.push("/home");
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        }
    }

    const backToHome = () => {
        history.push("/home");
    }

    return (
        <div className={styleCreate.content}>
            <button className={styleCreate.btnregresar} onClick={backToHome}>BACK TO HOME</button>
            <h1 className={styleCreate.titulo}>CREATE <span>VIDEOGAME</span>
            </h1>
            
            <div className={styleCreate.create}>
                <section className={styleCreate.formulario}> 
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name">Name: </label>
                            <input className={styleCreate.form_control} type="text" id="name" name="name" placeholder="Ingrese Nombre Pokemon" value={videogameData.name} 
                            onChange={handleInputChange} />
                            { errors.name && <p className={styleCreate.danger}>{errors.name}</p> }
                        </div>

                        {/* <p >
                            <label htmlFor="rating">Rating: </label>
                            <input type="number" className={styleCreate.form_control} id="rating" name="rating" placeholder="Ingrese Rating" 
                                value={videogameData.rating} onChange={handleInputChange} />
                            { errors.rating && <p className={styleCreate.danger}>{errors.rating}</p> }
                        </p> */}

                        <div className={styleCreate.rating}>
                            <label htmlFor="rating">Rating: </label>
                            {
                                [... Array(5)].map((estrella, index) => {
                                    const valor = index + 1;
                                    return (
                                        <label key={valor}>
                                            <input type="radio" name="rating" value={valor} onClick={() => {handleRating(valor)}} />
                                            <FaStar className={styleCreate.estrella} color={valor<=rating ? "#ffc107" : "#e4e5e9"} size={20} />
                                        </label>
                                    );
                                })
                            }
                            { errors.rating && <p className={styleCreate.danger}>{errors.rating}</p> }
                        </div>

                        <div>
                            <label>Plarforms: </label>
                            <select name="platforms"  id="platforms" onChange={handleSelectPlatforms} >
                                {
                                    platforms.map(e => { 
                                        return <option key={e.id} value={e.id }>{e.name}</option>
                                    })
                                }
                            </select>
                            {
                                dataPlatforms.length > 0 ? <p>{dataPlatforms.join(' - ')}</p> : ''
                            }
                            { errors.platforms && <p className={styleCreate.danger}>{errors.platforms}</p> }
                        </div>

                        <div>
                            <label>Genres: </label>
                            <select name="genres"  id="genres" onChange={handleSelectGenres} >
                                {
                                    genres.map(e => { 
                                        return <option key={e.id} value={e.id }>{e.name}</option>
                                    })
                                }
                            </select>
                            {
                                dataGenres.length > 0 ? <p>{dataGenres.join(' - ')}</p> : ''
                            }
                            { errors.genres && <p className={styleCreate.danger}>{errors.genres}</p> }
                        </div>

                        <div className={styleCreate.block}>
                            <label htmlFor="image">Image: </label>
                            <input type="text" className={styleCreate.form_control} id="image" name="image" placeholder="Ingrese URL de Imagen" value={videogameData.image} onChange={handleInputChange}/>
                            { errors.image && <p className={styleCreate.danger}>{errors.image}</p> }
                        </div>

                        <div className={styleCreate.block}>
                            <label htmlFor="description">Description: </label>
                            <textarea name="description" id="description" cols="30" rows="5" 
                                className={styleCreate.textarea} value={videogameData.description} 
                                onChange={handleInputChange}>
                            </textarea>
                            { errors.description && <p className={styleCreate.danger}>{errors.description}</p> }
                        </div>

                        <div className={styleCreate.block}>
                            <button type="submit">Guardar</button>
                        </div>
                    </form>
                </section>

                <section className={styleCreate.imagen}>
                </section>
            </div>
        </div>
    );
}