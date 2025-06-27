import "./style.css";
import { traerLogs, traerFotodenunciasPorId } from "../../../querys/scripts";
import { useEffect, useState } from "react";

const PanelLogs = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState("");

  const [modalAbierto, setModalAbierto] = useState(false);
  const [datosFD, setDatosFD] = useState(null);

  useEffect(() => {
    async function cargarDatos() {
      let data = await traerLogs();
      if (data.error === 0) {
        setLogs(data.logs);
      } else {
        setError(data.msg);
      }
    }
    cargarDatos();
  }, []);

  function formatearFecha(fechaString) {
    const fecha = new Date(fechaString);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

  const abrirModal = async (idFD) => {
    try {
      const data = await traerFotodenunciasPorId(idFD);
      setDatosFD(data);
      setModalAbierto(true);
    } catch (err) {
      console.error("Error al traer fotodenuncia:", err);
    }
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setDatosFD(null);
  };

  return (
    <>
      <div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#333", color: "white" }}>
              <th style={{ padding: "10px", border: "1px solid #555" }}>
                ID FD
              </th>
              <th style={{ padding: "10px", border: "1px solid #555" }}>GM</th>
              <th style={{ padding: "10px", border: "1px solid #555" }}>
                Acción
              </th>
              <th style={{ padding: "10px", border: "1px solid #555" }}>
                Usuario
              </th>
              <th style={{ padding: "10px", border: "1px solid #555" }}>
                Fecha
              </th>
            </tr>
          </thead>
          <tbody>
            {logs && Array.isArray(logs) ? (
              logs.map((elem, ind) => (
                <tr key={ind}>
                  <td
                    style={{
                      padding: "8px",
                      border: "1px solid #555",
                      color: "white",
                      cursor: "pointer",
                    }}
                    onClick={() => abrirModal(elem.IdFD)}
                  >
                    {elem.IdFD}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      border: "1px solid #555",
                      color: "white",
                    }}
                  >
                    {elem.Usuario}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      border: "1px solid #555",
                      color: "white",
                    }}
                  >
                    {elem.Accion}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      border: "1px solid #555",
                      color: "white",
                    }}
                  >
                    {elem.NickB || "-"}
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      border: "1px solid #555",
                      color: "white",
                    }}
                  >
                    {formatearFecha(elem.fecha) || "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ color: "white", textAlign: "center" }}>
                  {error || "No hay datos disponibles."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {modalAbierto && datosFD && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={cerrarModal}
        >
          <div
            style={{
              backgroundColor: "#222",
              padding: "20px",
              borderRadius: "8px",
              color: "white",
              minWidth: "300px",
              maxWidth: "600px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Detalles de Fotodenuncia #{datosFD.fotodenuncias[0].ID}</h3>
            <p
              style={{
                color: "white",
              }}
            >
              <strong>Usuario:</strong> {datosFD.fotodenuncias[0].Usuario}
            </p>
            <p
              style={{
                color: "white",
              }}
            >
              <strong>Texto:</strong> {datosFD.fotodenuncias[0].Texto}
            </p>
            <p
              style={{
                color: "white",
              }}
            >
              <strong>Fecha:</strong>{" "}
              {formatearFecha(datosFD.fotodenuncias[0].Fecha)}
            </p>

            <button onClick={cerrarModal} style={{ marginTop: "10px" }}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export { PanelLogs };
