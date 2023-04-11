import axios from "axios";

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAME = "GET_VIDEOGAME";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const FILTER_BY_ORIGIN = "FILTER_BY_ORIGIN";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const GET_ID_VIDEOGAME = "GET_ID_VIDEOGAME";
export const GET_NAME_VIDEOGAME = "GET_NAME_VIDEOGAME";
export const DELETE_VIDEOGAME = "DELETE_VIDEOGAME";

export const getVideogames = () => {
    return async function(dispatch) {
        const dataVideogames = await axios.get(`/videogames`);
        dispatch({
            type: GET_VIDEOGAMES,
            payload: await dataVideogames.data
        });
    };
}

export const getVideogame = (id) => {
    return async function (dispatch) {
        const videogame = await axios.get(`/videogames/${id}`);
        dispatch({ 
            type: GET_VIDEOGAME,
            payload: videogame.data
        }); 
    }
};

export const addVideogame = async (payload) => {
    const newVideogame = await axios.post(`/videogames`, payload);

    return {
        type: CREATE_VIDEOGAME,
        payload: newVideogame.data
    }
}

export const getGenres = () => {
    return async function(dispatch) {
        const dataGenres = await axios.get(`/genres`);
        dispatch({
            type: GET_GENRES,
            payload: await dataGenres.data
        });
    };
}

export const getPlatforms = () => {
    return async function(dispatch) {
        const dataPlatforms = await axios.get(`/platforms`);
        dispatch({
            type: GET_PLATFORMS,
            payload: await dataPlatforms.data
        });
    };
}

export function orderByName(option) {
    return {
        type: ORDER_BY_NAME,
        payload: option
    }
}

export function orderByRating(rating) {
    return {
        type: ORDER_BY_RATING,
        payload: rating
    }
}

export function filterByOrigin(origin) {
    return {
        type: FILTER_BY_ORIGIN,
        payload: origin
    }
}

export const FilterByGenres = (genre) => {
    return {
        type: FILTER_BY_GENRES,
        payload: genre
    };
}

export const getIdVideogame = (id) => {
    return {
        type: GET_ID_VIDEOGAME,
        payload: id
    };
}

export const getNameVideogame = (name) => {
    return {
        type: GET_NAME_VIDEOGAME,
        payload: name.toLowerCase()
    };
}

export const deleteVideogame = (id) => {
    return {
        type: DELETE_VIDEOGAME,
        payload: id
    };
}
