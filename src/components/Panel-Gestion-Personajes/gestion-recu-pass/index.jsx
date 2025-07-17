import { useEffect, useState } from "react";
import "./style.css";
import { enviarEmailRecuGestion } from "../../../querys/scripts";

const RecuperarPwPersonajeGestion = () => {
  const [personaje, setPersonaje] = useState({
    personaje: "",
    gm: localStorage.getItem("token"),
  });

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      let data = await enviarEmailRecuGestion({
        nick: personaje.personaje,
        token: personaje.gm,
      });
      setError(data.message);
    } catch (error) {
      setError("Error al conectarse con el servidor");
      return;
    }
  }

  const [error, setError] = useState("");

  return (
    <div className="recuperar-container">
      <form className="recuperar-form" onSubmit={handleSubmit}>
        <label htmlFor="buscarPjGestion" className="recuperar-label">
          Ingrese Personaje
          <input
            type="text"
            name="buscarPjGestion"
            id="buscarPjGestion"
            className="recuperar-input"
            value={personaje.personaje}
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
