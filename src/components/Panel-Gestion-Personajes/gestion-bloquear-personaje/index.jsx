import { useEffect, useState } from "react";
import "./style.css";
import { bloquearPersonaje } from "../../../querys/scripts";

const BloquearPersonajeGestion = () => {
  const [personaje, setPersonaje] = useState({
    personaje: "",
    gm: localStorage.getItem("token"),
  });

  const [error, setError] = useState("");

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      let bloquear = 1;
      let data = await bloquearPersonaje({
        usuario: personaje.personaje,
        status: bloquear,
        token: personaje.gm,
      });
      if (data.error === 0) {
        setError("Personaje bloqueado correctamente");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Error al conectar con el servidor");
      return;
    }
  }

  return (
    <div className="bloquear-container">
      <form className="bloquear-form" onSubmit={handleSubmit}>
        <label htmlFor="buscarPjGestion" className="bloquear-label">
          Ingrese Personaje
          <input
            type="text"
            name="buscarPjGestion"
            id="buscarPjGestion"
            className="bloquear-input"
            value={personaje.personaje}
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
