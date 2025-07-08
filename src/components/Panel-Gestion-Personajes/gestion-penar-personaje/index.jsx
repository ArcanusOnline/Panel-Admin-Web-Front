import { useEffect, useState } from "react";
import "./style.css";

const PenarPersonajeGestion = () => {
  const [personaje, setPersonaje] = useState({
    personaje: "",
    motivo: "",
    tiempo: "",
    gm: localStorage.getItem("username") || "Administrador",
  });

  return (
    <div className="penar-container">
      <form className="penar-form">
        <label htmlFor="buscarPjGestion" className="penar-label">
          Ingrese Personaje
          <input
            type="text"
            name="buscarPjGestion"
            id="buscarPjGestion"
            className="penar-input"
            onChange={(e) =>
              setPersonaje((prev) => ({
                ...prev,
                personaje: e.target.value,
              }))
            }
          />
        </label>

        <label htmlFor="motivoPenaGestion" className="penar-label">
          Motivo de la pena
          <input
            type="text"
            name="motivoPenaGestion"
            id="motivoPenaGestion"
            className="penar-input"
            onChange={(e) =>
              setPersonaje((prev) => ({
                ...prev,
                motivo: e.target.value,
              }))
            }
          />
        </label>

        <label htmlFor="tiempoPenaGestion" className="penar-label">
          Tiempo de cárcel (minutos)
          <input
            type="number"
            name="tiempoPenaGestion"
            id="tiempoPenaGestion"
            min={0}
            className="penar-input"
            onChange={(e) =>
              setPersonaje((prev) => ({
                ...prev,
                tiempo: e.target.value,
              }))
            }
          />
        </label>

        <button type="submit" className="penar-button">
          Penar
        </button>
      </form>
    </div>
  );
};

export { PenarPersonajeGestion };
