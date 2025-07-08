import { useEffect, useState } from "react";
import "./style.css"

const BloquearPersonajeGestion = () => {
  const [personaje, setPersonaje] = useState({
    personaje: "",
    gm: localStorage.getItem("username") || "Administrador",
  });

  const [error, setError] = useState("");

  return (
    <div className="bloquear-container">
      <form className="bloquear-form">
        <label htmlFor="buscarPjGestion" className="bloquear-label">
          Ingrese Personaje
          <input
            type="text"
            name="buscarPjGestion"
            id="buscarPjGestion"
            className="bloquear-input"
            onChange={(e) =>
              setPersonaje((prev) => ({
                ...prev,
                personaje: e.target.value,
              }))
            }
          />
        </label>

        {error && <p className="bloquear-error">{error}</p>}

        <button type="submit" className="bloquear-button">
          Bloquear
        </button>
      </form>
    </div>
  );
};

export { BloquearPersonajeGestion };
