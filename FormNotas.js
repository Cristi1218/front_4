import React, { useEffect, useRef, useState } from "react";
import Notas from "./Notas";
import { v4 as uuid } from "uuid";
import './estilo.css';

export default function FormNotas() {
    const [notas, setNotas] = useState([]);
    const [error, setError] = useState("");
    const tituloRef = useRef();
    const descripcionRef = useRef();
    const favoritoRef = useRef();


    useEffect(() => {
        localStorage.removeItem("notas-app");
    }, []);


    useEffect(() => {
        localStorage.setItem("notas-app", JSON.stringify(notas));
    }, [notas]);

    const agregarNota = () => {
        const titulo = tituloRef.current.value;
        const descripcion = descripcionRef.current.value;
        const favorito= favoritoRef.current.checked;

        if (descripcion === "") {
            setError("La descripción es obligatoria");
            return;
        };

        setError(""); 

        const nuevaNota = {
            id: uuid(),
            titulo: titulo,
            descripcion: descripcion,
            favorito: favorito
        };

        setNotas(prev => [...prev, nuevaNota]);
        tituloRef.current.value = "";
        descripcionRef.current.value = "";
        favoritoRef.current.checked = false;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', paddingTop: '50px' }}>
            <h1>NOTAS</h1>
            <div className="input-group my-3">
                <div className="titulo col-12 col-md-4"><input ref={tituloRef} className="form-control" placeholder="TITULO" /></div>
                <div className="descrip col-12 col-md-4"><input ref={descripcionRef} className="form-control" placeholder="DESCRIPCION" /></div>
                <div className="fav col-12 col-md-2">
                    <label><input ref={favoritoRef} type="checkbox" /> Favorito  </label>
                </div>
                <div className="boton col-12 col-md-3"><button onClick={agregarNota} className="btn btn-primary">Agregar</button></div>
            </div>
            {error && <div className="mensaje-error">{error}</div>}
            <div className="notas-container">
                {notas.map(nota => (
                    <Notas
                        key={nota.id}
                        titulo={nota.titulo}
                        descripcion={nota.descripcion}
                        favorito={nota.favorito}
                    />
                ))}
            </div>
        </div>
    );
}

