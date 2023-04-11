import React from "react";
import stylePagination from './Pagination.module.css';

export default function Pagination ({ gamesPorPagina, videogames, actualPagina, setActualPagina }) {
    const totalVideogames = videogames.length;
    const numeroPaginas = [];

    for(let i=1; i<=Math.ceil(totalVideogames / gamesPorPagina ); i++) {
        numeroPaginas.push(i);
    }

    if(numeroPaginas.length === 0) {
        numeroPaginas.push(1);
    }

    const ultimonumero = numeroPaginas.slice(-1).pop();

    const atrasPagina = (actualPagina) => {
        setActualPagina(actualPagina-1);
    }

    const sigtePagina = (actualPagina) => {
        setActualPagina(actualPagina+1);
    }

    const paginaespecifica = (numero) => {
        setActualPagina(numero);
    }

    return(
        <nav>
            <ul className={stylePagination.pagination}>
                <li className={actualPagina === 1 ? stylePagination.itemdisabled : ""}>
                    <a className={stylePagination.link} onClick={() => atrasPagina(actualPagina)} href="#"> Atras </a>
                </li>
                {   
                    numeroPaginas.map(numero => {
                        return (
                            <li key={numero} className={numero === actualPagina ? stylePagination.itemactive : ""}>
                                <a className={stylePagination.link} href="#" onClick={() => paginaespecifica(numero)}>{numero}</a>
                            </li>
                        )
                    })
                }
                <li className={actualPagina === ultimonumero ? stylePagination.itemdisabled : ""}>
                    <a className={stylePagination.link} href="#" onClick={() => sigtePagina(actualPagina)}>Siguiente</a>
                </li>
            </ul>
        </nav>
    );
}