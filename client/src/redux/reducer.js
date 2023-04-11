import { 
    CREATE_VIDEOGAME, GET_VIDEOGAMES, GET_VIDEOGAME, FILTER_BY_GENRES, FILTER_BY_ORIGIN, 
    GET_GENRES, ORDER_BY_NAME, ORDER_BY_RATING, GET_PLATFORMS, GET_ID_VIDEOGAME, GET_NAME_VIDEOGAME
} from "./actions";

const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    platforms: []
}

const rootReducer = (state=initialState, action) => {
    switch(action.type) {
        case GET_VIDEOGAMES: 
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            }

        case GET_VIDEOGAME:
            return {
                ...state,
                videogame: action.payload
            }

        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }

        case GET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload
            }
        
        case CREATE_VIDEOGAME:
            return {
                ...state, 
                newVideogame: action.payload
            }
        
        case ORDER_BY_NAME:
            let orderGames = [ ...state.allVideogames ];

            if (action.payload === '') {
                orderGames = state.allVideogames;
            } else if (action.payload === 'desc') {
                orderGames = state.videogames.sort(function(a,b) {
                    if (a.name < b.name) return 1
                    if (a.name > b.name) return -1
                    return 0
                });
            } else {
                orderGames = state.videogames.sort(function(a, b) {
                    if (a.name < b.name) return -1
                    if (a.name > b.name) return 1
                    return 0
                });
            }

            return {
                ...state,
                videogames: [...orderGames]
            }
            
            case ORDER_BY_RATING:
                let orderRating = [...state.allVideogames];
                console.log(action.payload);
                console.log(orderRating);
                if (action.payload === '') {
                    orderRating = state.allVideogames;
                } else if (action.payload === 'asc') {
                    orderRating = state.videogames.sort(function(a,b) {
                        if (a.rating < b.rating) return -1
                        if (a.rating > b.rating) return 1
                        return 0
                    });
                } else if (action.payload === 'desc') {
                    orderRating = state.videogames.sort(function(a, b) {
                        if (a.rating < b.rating) return 1
                        if (a.rating > b.rating) return -1
                        return 0
                    });
                }
                console.log(orderRating);
                return {
                    ...state,
                    videogames: [...orderRating]
                }
            
            case FILTER_BY_ORIGIN: 
                let games = state.allVideogames;
                let filterGames = '';
                if (action.payload === 'todos') {
                    filterGames = games;
                } else if (action.payload === 'db') {
                    filterGames = games.filter(g => g.createDB === true);
                } else {
                    filterGames = games.filter(g => g.createDB !== true);
                }
                return {
                    ...state, 
                    videogames: filterGames
                }

            case FILTER_BY_GENRES:
                let dataVideogames = state.allVideogames;
    
                let filterVideogames = action.payload === 'todos' ?
                    dataVideogames : 
                    dataVideogames.filter((e) => { 
                        return e.genres.some((g) => g.name === action.payload)
                    })

                return {
                    ...state,
                    videogames: filterVideogames
                }

            case GET_ID_VIDEOGAME:
                let dataGamesId = state.allVideogames;
                let idGame = action.payload.length > 20 ? action.payload : parseInt(action.payload);
                let videogameId = dataGamesId.filter(g => g.id === idGame)
                return {
                    ...state,
                    videogames: videogameId 
                }

            case GET_NAME_VIDEOGAME:
                let dataGames = state.allVideogames;
                const videogameName = dataGames.filter(e => e.name.toLowerCase().includes(action.payload));

                const resultVideogame = videogameName.filter((videogame, index) => { 
                    if(index<15) {
                        return videogame.name.toLowerCase().includes(action.payload)
                    }
                });

                return {
                    ...state,
                    videogames: resultVideogame 
                }

        default: return state ;
    }
}

export default rootReducer;