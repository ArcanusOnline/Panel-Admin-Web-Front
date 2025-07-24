import { useLocation, Link } from "react-router";
import {
  obtenerDataSoporte,
  responderSoporte,
  censurarMensajeSoporte,
} from "../../../querys/scripts";
import { useEffect, useState } from "react";
import "./style.css";

const ResponderSoporte = () => {
  let { state } = useLocation();
  const [soporte, setSoporte] = useState([]);
  const [error, setError] = useState("");
  // let responde = localStorage.getItem("token") || "Staff";
  let id = state.ID || null;
  const [fields, setFields] = useState({
    id,
    respuesta: "",
    // nombre: responde,
    // token: "",
  });
  useEffect(() => {
    /*  let selectToken = localStorage.getItem("token") || "";
    if (selectToken) {
      setFields((e) => ({ ...e, token: selectToken }));
    }*/
    async function getData() {
      let data = await obtenerDataSoporte(id);
      if (data.error) {
        setError(data.msg);
      } else {
        setSoporte(data);
      }
    }
    getData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    let data = await responderSoporte(fields);
    if (data.error === 0) {
      alert(data.message);
      setFields((prev) => ({ ...prev, respuesta: "" }));
    } else {
      alert(data.message);
    }
  }

  async function closeSupport(id) {
    try {
      const confirmar = window.confirm(
        "¿Estás seguro que deseas cerrar este soporte?"
      );
      if (!confirmar) return;
      let data = await cerrarSoporte(id);
      if (data?.error === 0) {
        navigate("/soportes");
        alert("Soporte cerrado con éxito");
      } else {
        alert(data?.msg || "No se pudo cerrar el soporte");
      }
    } catch (error) {
      alert("Error al conectar con el servidor");
    }
  }

  async function censurarMensaje(id) {
    try {
      let data = await censurarMensajeSoporte(id);
      if (data.error === 0) {
        alert("Mensaje censurado correctamente");
        return;
      } else {
        alert("Error al censurar el mensaje, vuelva a intentar");
        return;
      }
    } catch (error) {
      alert("Error al conectar con el servidor");
    }
  }

  function formatearFecha(fechaIso) {
    const fecha = new Date(fechaIso);

    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // enero = 0
    const año = fecha.getFullYear();

    const horas = String(fecha.getHours()).padStart(2, "0");
    const minutos = String(fecha.getMinutes()).padStart(2, "0");

    return `${dia}/${mes}/${año} - ${horas}:${minutos}`;
  }

  return (
    <>
      <div>
        <div>
          <Link to="/soportes" className="link-volver">
            ← Volver
          </Link>
          <button
            className="btn btn-cerrar"
            onClick={() => {
              closeSupport(id);
            }}
          >
            Cerrar
          </button>
        </div>

        {error && <p>{error}</p>}
        {soporte && Array.isArray(soporte) ? (
          <div>
            <h2>{`Ticket ID: ${state.ID}`}</h2>
            <h2>{`Soporte: ${state.asunto}`}</h2>
            <h3>{`Sector: ${state.nombre_sector}`}</h3>
            <h3>{`Nick: ${state.nick} - Email: ${soporte[0]?.email} - Cuenta: ${soporte[0]?.consultor}`}</h3>
            <form onSubmit={handleSubmit}>
              {soporte.map((elem, ind) => (
                <div
                  key={ind}
                  className={`mensaje-container ${
                    elem.tipo_usuario === "Administrador"
                      ? "mensaje-derecha"
                      : "mensaje-izquierda"
                  }`}
                >
                  <div>
                    <h3>{`${elem.responde} - ${formatearFecha(elem.fecha)} - ${
                      elem.ip_address
                    }`}</h3>
                    <p className="mensaje-texto">
                      {elem.censura === "CENSURADO" ? (
                        <>
                          <strong>(MENSAJE CENSURADO)</strong>
                          <br />
                          <span>{elem.texto}</span>
                        </>
                      ) : (
                        elem.texto
                      )}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        censurarMensaje(elem.idComentario);
                      }}
                    >
                      Censurar
                    </button>
                  </div>
                </div>
              ))}

              <div className="input-respuesta-container">
                <input
                  type="text"
                  value={fields.respuesta}
                  onChange={(e) =>
                    setFields((prev) => ({
                      ...prev,
                      respuesta: e.target.value,
                    }))
                  }
                  placeholder="Escribí tu respuesta..."
                  className="input-respuesta"
                />
                <button type="submit" className="btn-enviar">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        ) : (
          <p>Nada</p>
        )}
      </div>
    </>
  );
};

export { ResponderSoporte };
