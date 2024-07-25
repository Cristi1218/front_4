import React from "react";
import './estilo.css';

export default function Notas(props) {
    return (
        <div className={`nota ${props.favorito ? 'favorito' : ''}`}>
            <h3>{props.titulo}</h3>
            <p>{props.descripcion}</p>
        </div>
    );
}
