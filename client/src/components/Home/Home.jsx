import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogames, getGenres, orderByName, orderByRating, filterByOrigin, FilterByGenres, getIdVideogame, getNameVideogame} from '../../redux/actions';
import Card from "../Card/Card";
import Loader from "../Loader/Loader";
import Pagination from "../Pagination/Pagination";
import styleHome from './Home.module.css';

export default function Home() {
    // Traer videogames y genres
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);
    const genres = useSelector((state) => state.genres);
    // estado local para ordenamiento por nombre
    const [order, setOrder] = useState('');
    const [loader, setLoader] = useState(false);

    // PAGINACIÓN
    // estado local para el paginado
    const [actualPagina, setActualPagina] = useState(1);
    const [gamesPorPagina, setGamesPorPagina] = useState(12);
    const indexLast = actualPagina * gamesPorPagina;  // = 5
    const indexFirst = indexLast - gamesPorPagina; // 5 - 5 = 0
    const mostrarVideogames = allVideogames.slice(indexFirst, indexLast); 

    const [ dataSearch, setDataSearch ] = useState({
        searchInput: "",
        searchType: ""
    });

    useEffect(() => {
        setLoader(true);
        setTimeout(() => {
            setLoader(false);
        }, 6000);
    }, []);

    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch]);

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch]);

    function handleRefresh(e){
        e.preventDefault();
        dispatch(getVideogames());
        dispatch(getGenres());
    }

    const handleOrdenarName = (e) => {
        console.log(e.target.value);
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setActualPagina(1);
    }

    function handleOrdenarRating (e) {
        console.log(e.target.value);
        e.preventDefault();
        dispatch(orderByRating(e.target.value));
        setActualPagina(1);
    }

    const handleOrigin = (e) => {
        e.preventDefault();
        dispatch(filterByOrigin(e.target.value));
        setActualPagina(1);
    }

    const handleFilter = (e) => {
        e.preventDefault();
        dispatch(FilterByGenres(e.target.value));
        setActualPagina(1);
    }

    const handleInputChange = (e) => {
        setDataSearch({
            ...dataSearch, [e.target.name]: e.target.value,
        });
    };

    const handleSearchType = (e) => {
        setDataSearch({
            ...dataSearch, ['searchType']: e.target.value,
        })
    }

    const handleSearch = (e) => {
        e.preventDefault();
        if (dataSearch.searchType === '') {
            alert("Seleccionar un Tipo de Búsqueda");
        } else if (dataSearch.searchInput === '') {
            alert("Ingresar un Nombre o ID de VideGame");
        } else {
            dataSearch.searchType === 'id' ? dispatch(getIdVideogame(dataSearch.searchInput)) : dispatch(getNameVideogame(dataSearch.searchInput));
            setActualPagina(1);
            setDataSearch ({
                searchInput: ""
            });
        }
    }

    return (
        <>
            {
                loader ? (
                    <Loader />
                ) : (
                    <div className={styleHome.home}>
                        <div className={styleHome.titulo}>
                            <span>API</span>GAME - PI <span> HENRY!! </span>
                            
                        </div>
                        <div className={styleHome.acciones}>
                            <div className={styleHome.alfabetico}>
                                <label>Order Name:</label><br/>
                                <select onChange={handleOrdenarName} >
                                    <option value=''>Elegir</option>
                                    <option value='asc'>Ascendente</option>
                                    <option value='desc'>Descendente</option>
                                </select>
                            </div>
                            <div className={styleHome.rating}>
                                <label>Order Rating:</label><br/>
                                <select onChange={e => handleOrdenarRating(e)}>
                                    <option value=''>Elegir</option>
                                    <option value='asc'>Ascendente</option>
                                    <option value='desc'>Descendente</option>
                                </select>
                            </div>
                            <div className={styleHome.origen}>
                                <label>Origen:</label><br/>
                                <select onChange={handleOrigin}>
                                    <option value='todos'>Todos</option>  
                                    <option value='api'>Existente</option>
                                    <option value='db'>Creado</option>
                                </select>
                            </div>
                            <div className={styleHome.genres} >
                                <label>Genres:</label><br/>
                                <select onChange={handleFilter}>
                                    <option value='todos'>Todos</option>
                                    {
                                        genres && genres.map(g => <option key={g.id} value={g.name}>{g.name}</option> )
                                    }
                                </select>
                            </div>
                            <div className={styleHome.buscar}>
                                <label>Search:</label><br/>
                                <select onChange={handleSearchType}>
                                    <option value=''>Select</option>  
                                    <option value='id'>ID</option>
                                    <option value='name'>Name</option>
                                </select>
                                <input type="text" name="searchInput" id="searchInput" placeholder="Ingresar ID o Name" value={dataSearch.searchInput} onChange={handleInputChange}/>
                                <button className={styleHome.btn} onClick={handleSearch}>Buscar</button>
                            </div>
                            <div className={styleHome.create}>
                                <label> </label><br/>
                                <Link to={`/create`}>
                                    <button className={styleHome.btn}>Create</button>
                                </Link>
                            </div>
                            <div className={styleHome.create}>
                                <label> </label><br/>
                                <button onClick={(e) => handleRefresh(e)} className={styleHome.btn}>Refresh</button>
                            </div>
                        </div>
                        <div className={styleHome.cards}>
                            { 
                                mostrarVideogames.length > 0 ? ( 
                                    mostrarVideogames.map(game => {
                                        return (
                                            <Link to={`/detail/${game.id}`} key={game.id}>
                                                <Card 
                                                    key={game.id}
                                                    id={game.id}
                                                    name={game.name}
                                                    rating={game.rating}
                                                    image={game.image}
                                                    genres={game.genres}
                                                />
                                            </Link>
                                        );
                                    })
                                ) : (
                                    <div>
                                        <h1>Ningun Resultado para mostrar.</h1>
                                    </div>
                                ) 
                                
                            }
                        </div>
                        <div className={styleHome.paginado}>
                            <Pagination 
                                gamesPorPagina={gamesPorPagina}
                                videogames={allVideogames}
                                actualPagina={actualPagina}
                                setActualPagina={setActualPagina}
                            />
                        </div>
                    </div>
                )
            }
        </>
    );
}