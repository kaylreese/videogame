import { FaStar, FaStarHalfAlt } from "react-icons/fa";  
import { AiOutlineStar } from "react-icons/ai"; 

export default function Rating({ rating }) {
    return (
        [...new Array(5)].map((estrella, index) => {
            let numero = index + 0.5;
            return (
                rating >= index + 1 
                ? <FaStar key={index} color="#ffc107"/> 
                : rating >= numero 
                ? <FaStarHalfAlt key={index} color="#ffc107" /> 
                : <AiOutlineStar key={index}/>
            )
        })
    );
}