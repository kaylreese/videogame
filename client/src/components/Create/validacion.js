export function validacion(videogameData) {
    let errors = {};
    
    if(!videogameData.name) {
        errors.name = 'Se requiere un nombre de Videogame.';
    } else if(!videogameData.rating) {
        errors.rating = 'Se requiere ingresar unca Calificación.';
    } else if(!videogameData.image) {
        errors.image = 'Se requiere una URL para la imagen del Videogame.';
    } else if(!videogameData.description) {
        errors.description = 'Se requiere una descripción para el Videogame.';
    }
    if(videogameData.platforms.length === 0) {
        errors.platforms = 'Se requiere seleccionar al menos 1 Plataforma.';
    }
    if(videogameData.genres.length === 0) {
        errors.genres = 'Se requiere seleccionar al menos 1 Género.';
    }
    return errors;
}