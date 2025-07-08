import { useEffect, useState } from "react";
import "./style.css"

const BuscarPersonajeGestion = () => {
  const [personaje, setPersonaje] = useState({
    personaje: "",
    gm: localStorage.getItem("username") || "Administrador",
  });

  const [error, setError] = useState("");

  return (
    <div className="buscar-container">
      <form className="buscar-form">
        <label htmlFor="buscarPjGestion" className="buscar-label">
          Ingrese Personaje
          <input
            type="text"
            name="buscarPjGestion"
            id="buscarPjGestion"
            className="buscar-input"
            onChange={(e) =>
              setPersonaje((prev) => ({
                ...prev,
                personaje: e.target.value,
              }))
            }
          />
        </label>

        {error && <p className="buscar-error">{error}</p>}

        <button type="submit" className="buscar-button">
          Buscar
        </button>
      </form>
    </div>
  );
};

export { BuscarPersonajeGestion };