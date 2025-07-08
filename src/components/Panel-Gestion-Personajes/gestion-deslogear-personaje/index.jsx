import { useEffect, useState } from "react";
import "./style.css"

const DeslogearPersonajeGestion = () => {
  const [personaje, setPersonaje] = useState({
    personaje: "",
    gm: localStorage.getItem("username") || "Administrador",
  });

  const [error, setError] = useState("");

  return (
    <div className="deslogear-container">
      <form className="deslogear-form">
        <label htmlFor="buscarPjGestion" className="deslogear-label">
          Ingrese Personaje
          <input
            type="text"
            name="buscarPjGestion"
            id="buscarPjGestion"
            className="deslogear-input"
            onChange={(e) =>
              setPersonaje((prev) => ({
                ...prev,
                personaje: e.target.value,
              }))
            }
          />
        </label>

        {error && <p className="deslogear-error">{error}</p>}

        <button type="submit" className="deslogear-button">
          Desloguear
        </button>
      </form>
    </div>
  );
};

export { DeslogearPersonajeGestion };