import { useLocation, Link } from "react-router";
import { obtenerDataSoporte, responderSoporte } from "../../../querys/scripts";
import { useEffect, useState } from "react";
import "./style.css";

const ResponderSoporte = () => {
  let { state } = useLocation();
  const [soporte, setSoporte] = useState([]);
  const [error, setError] = useState("");
  let responde = localStorage.getItem("username") || "Staff";
  let id = state.ID || null;
  const [fields, setFields] = useState({
    id,
    respuesta: "",
    nombre: responde,
  });
  useEffect(() => {
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
                    <h3>{`${elem.responde} - ${new Date(
                      state.fecha_cambio_estado
                    ).toLocaleString("es-AR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}`}</h3>
                    <p className="mensaje-texto">
                      {elem.censura === "CENSURADO"
                        ? `(MENSAJE CENSURADO)\n${elem.texto}`
                        : elem.texto}
                    </p>
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
