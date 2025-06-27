import { Link, NavLink } from "react-router";
import { useState, useEffect } from "react";
import { obtenerNoticias } from "../../../querys/scripts";
import "./style.css";

const EditarNoticia = () => {
  let [noticias, setNoticias] = useState([]);
  let [error, setError] = useState("");

  useEffect(() => {
    async function getNoticias() {
      let data = await obtenerNoticias();
      if (typeof data === "string") {
        setError(data);
      } else {
        setNoticias(data);
      }
    }
    getNoticias();
  }, []);

  return (
    <div className="editar-noticia-container">
      <Link to="/noticias" className="link-volver">
        ← Volver
      </Link>
      {noticias.length > 0 ? (
        noticias.map((elem) => (
          <div key={elem.id} className="noticia-item">
            <p className="titulo-noticia">{elem.titulo}</p>
            <NavLink
              to={`${elem.id}`}
              state={elem}
              className="link-editar"
              activeclassname="active"
            >
              Editar noticia
            </NavLink>
          </div>
        ))
      ) : (
        <p className="mensaje-error">
          {error || "No hay noticias disponibles"}
        </p>
      )}
    </div>
  );
};

export { EditarNoticia };
