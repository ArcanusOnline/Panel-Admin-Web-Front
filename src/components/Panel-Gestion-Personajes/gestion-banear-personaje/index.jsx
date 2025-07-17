import { useEffect, useState } from "react";
import "./style.css";
import {
  traerEstadoYPenas,
  banearSiEstaOnlinePanelGestion,
  banearPjOfflineGestion,
} from "../../../querys/scripts";

const BanearPersonajeGestion = () => {
  const [personaje, setPersonaje] = useState({
    personaje: "",
    motivo: "",
    tiempo: "",
    gm: localStorage.getItem("username") || "Administrador",
  });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!personaje.personaje || !personaje.motivo || !personaje.tiempo) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    try {
      let estado = await traerEstadoYPenas(personaje.personaje);
      if (estado.error == 0) {
        if (estado?.personaje[0]?.Online == 0) {
          let data = await banearPjOfflineGestion({
            personaje: personaje.personaje,
            motivo: personaje.motivo,
            tiempo: personaje.tiempo,
            gm: personaje.gm,
          });
          if (data.error == 0) {
            setError("Personaje baneado correctamente");
            setPersonaje((prev) => ({
              ...prev,
              personaje: "",
              motivo: "",
              tiempo: "",
            }));
          } else {
            setError(data.msg);
          }
        } else {
          let baneoOnline = await banearSiEstaOnlinePanelGestion({
            nick: personaje.personaje,
            tiempo: personaje.tiempo,
            gm: personaje.gm,
            razon: personaje.motivo,
          });
          if (baneoOnline?.status === "ok") {
            setError("Personaje baneado correctamente");
            setPersonaje((prev) => ({
              ...prev,
              personaje: "",
              motivo: "",
              tiempo: "",
            }));
            return;
          } else {
            setError("No se pudo banear al personaje.");
            return;
          }
        }
      } else {
        setError(estado?.msg);
      }
    } catch (error) {
      setError("Error de conexion con el servidor");
    }
  }

  return (
    <div className="banear-container">
      <form className="banear-form" onSubmit={handleSubmit}>
        <label htmlFor="buscarPjGestion" className="banear-label">
          Ingrese Personaje
          <input
            type="text"
            name="buscarPjGestion"
            id="buscarPjGestion"
            className="banear-input"
            value={personaje.personaje}
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
            value={personaje.motivo}
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
            value={personaje.tiempo}
            min={0}
            onChange={(e) =>
              setPersonaje((prev) => ({ ...prev, tiempo: e.target.value }))
            }
          />
        </label>
        {error && <p>{error}</p>}
        <button type="submit" className="banear-button">
          Banear
        </button>
      </form>
    </div>
  );
};

export { BanearPersonajeGestion };
