import React from "react";

export default function Description ({ description }) {
    
    function createMarkup(description) {
        return {__html: description};
    }

    return (
        // dangerouslySetInnerHTML es el reemplazo de React por usar innerHTML en el navegador DOM
        <div dangerouslySetInnerHTML={createMarkup(description)}></div>
    );
}