import { useEffect, useState } from "react";
import "./style.css"

const RecuperarPwPersonajeGestion = () => {
  const [personaje, setPersonaje] = useState({
    personaje: "",
    gm: localStorage.getItem("username") || "Administrador",
  });

  const [error, setError] = useState("");

  return (
    <div className="recuperar-container">
      <form className="recuperar-form">
        <label htmlFor="buscarPjGestion" className="recuperar-label">
          Ingrese Personaje
          <input
            type="text"
            name="buscarPjGestion"
            id="buscarPjGestion"
            className="recuperar-input"
            onChange={(e) =>
              setPersonaje((prev) => ({
                ...prev,
                personaje: e.target.value,
              }))
            }
          />
        </label>

        {error && <p className="recuperar-error">{error}</p>}

        <button type="submit" className="recuperar-button">
          Recuperar
        </button>
      </form>
    </div>
  );
};

export { RecuperarPwPersonajeGestion };