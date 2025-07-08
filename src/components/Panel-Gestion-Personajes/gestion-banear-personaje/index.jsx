import { useEffect, useState } from "react";
import "./style.css"

const BanearPersonajeGestion = () => {
  const [personaje, setPersonaje] = useState({
    personaje: "",
    motivo: "",
    tiempo: "",
    gm: localStorage.getItem("username") || "Administrador",
  });

  return (
    <div className="banear-container">
      <form className="banear-form">
        <label htmlFor="buscarPjGestion" className="banear-label">
          Ingrese Personaje
          <input
            type="text"
            name="buscarPjGestion"
            id="buscarPjGestion"
            className="banear-input"
            onChange={(e) =>
              setPersonaje((prev) => ({ ...prev, personaje: e.target.value }))
            }
          />
        </label>

        <label htmlFor="motivoBanGestion" className="banear-label">
          Motivo del ban
          <input
            type="text"
            name="motivoBanGestion"
            id="motivoBanGestion"
            className="banear-input"
            onChange={(e) =>
              setPersonaje((prev) => ({ ...prev, motivo: e.target.value }))
            }
          />
        </label>

        <label htmlFor="tiempoBanGestion" className="banear-label">
          Tiempo del ban (en días)
          <input
            type="number"
            name="tiempoBanGestion"
            id="tiempoBanGestion"
            className="banear-input"
            min={0}
            onChange={(e) =>
              setPersonaje((prev) => ({ ...prev, tiempo: e.target.value }))
            }
          />
        </label>

        <button type="submit" className="banear-button">
          Banear
        </button>
      </form>
    </div>
  );
};

export { BanearPersonajeGestion };
