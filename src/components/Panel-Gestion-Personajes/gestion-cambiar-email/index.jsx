import { useEffect, useState } from "react";
import "./style.css"

const CambiarEmailPersonajeGestion = () => {
  const [personaje, setPersonaje] = useState({
    personaje: "",
    emailNuevo: "",
    gm: localStorage.getItem("username") || "Administrador",
  });

  return (
    <div className="cambiar-email-container">
      <form className="cambiar-email-form">
        <label htmlFor="buscarPjGestion" className="cambiar-email-label">
          Ingrese Personaje
          <input
            type="text"
            name="buscarPjGestion"
            id="buscarPjGestion"
            className="cambiar-email-input"
            onChange={(e) =>
              setPersonaje((prev) => ({
                ...prev,
                personaje: e.target.value,
              }))
            }
          />
        </label>

        <label htmlFor="emailNuevo" className="cambiar-email-label">
          Email nuevo
          <input
            type="email"
            name="emailNuevo"
            id="emailNuevo"
            className="cambiar-email-input"
            onChange={(e) =>
              setPersonaje((prev) => ({
                ...prev,
                emailNuevo: e.target.value,
              }))
            }
          />
        </label>

        <button type="submit" className="cambiar-email-button">
          Cambiar Email
        </button>
      </form>
    </div>
  );
};

export { CambiarEmailPersonajeGestion };
