import "./style.css";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {
  obtenerSectoresSoporte,
  obtenerSoportes,
  cerrarSoporte,
} from "../../querys/scripts";

const PanelSoporte = () => {
  const [soportes, setSoportes] = useState([]);
  const [todosLosSoportes, setTodosLosSoportes] = useState([]);
  const [sectores, setSectores] = useState([]);
  const [errores, setErrores] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const soportesPorPagina = 10;
  const [busquedaId, setBusquedaId] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    async function capturarSectores() {
      let data = await obtenerSectoresSoporte();
      if (data && Array.isArray(data[0])) {
        setSectores(data[0]);
      } else {
        setErrores("No hay sectores");
        setSectores([]);
      }
    }
    capturarSectores();

    async function traerSoportes() {
      let response = await obtenerSoportes();
      if (response && Array.isArray(response[0])) {
        setSoportes(
          response[0].filter(
            (elem) => elem.estado?.trim().toLowerCase() !== "cerrado"
          )
        );
        setTodosLosSoportes(
          response[0].filter(
            (elem) => elem.estado?.trim().toLowerCase() !== "cerrado"
          )
        );
      } else {
        setErrores("No hay soportes");
        setSoportes([]);
        setTodosLosSoportes([]);
      }
    }
    traerSoportes();
  }, []);

  const filtrarResultados = (e) => {
    const valor = e.target.value;

    if (valor === "") {
      setSoportes(todosLosSoportes);
    } else {
      const filtrado = todosLosSoportes.filter(
        (elem) => elem.sector.toString() === valor
      );
      setSoportes(filtrado);
    }

    setPaginaActual(1);
  };

  const filtrarPorEstado = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      const filtrado = todosLosSoportes.filter((elem) => elem.estado === value);
      setSoportes(filtrado);
    } else {
      setSoportes(todosLosSoportes);
    }

    setPaginaActual(1);
  };

  const filtrarPorId = (e) => {
    const { value } = e.target;
    const filtradoId = todosLosSoportes.filter(
      (elem) =>
        elem.ID.toString().toLowerCase().includes(value.toLowerCase()) ||
        elem.nick.toLowerCase().includes(value.toLowerCase())
    );
    setSoportes(filtradoId);
    setPaginaActual(1);
  };

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

  const indiceUltimoSoporte = paginaActual * soportesPorPagina;
  const indicePrimerSoporte = indiceUltimoSoporte - soportesPorPagina;
  const soportesPaginados = soportes.slice(
    indicePrimerSoporte,
    indiceUltimoSoporte
  );

  const totalPaginas = Math.ceil(soportes.length / soportesPorPagina);

  const irPaginaAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  const irPaginaSiguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  return (
    <div className="panel-soporte-container">
      <div className="panel-header">
        <Link to="/inicio" className="link-volver">
          ← Volver
        </Link>
      </div>
      <div>
        <div>
          <input
            type="checkbox"
            value="Sin leer"
            name="Sin leer"
            id="sin-leer"
            onChange={filtrarPorEstado}
          />
          <label htmlFor="sin-leer">Sin Leer</label>
          <input
            type="text"
            value={busquedaId}
            name="porId"
            id="porId"
            placeholder="Filtra por Id o Usuario"
            onChange={(e) => {
              setBusquedaId(e.target.value);
              filtrarPorId(e);
            }}
          />
        </div>
        <div className="filter-container">
          <select
            onChange={filtrarResultados}
            defaultValue=""
            className="select-filter"
          >
            <option value="" disabled={false}>
              Todos los soportes
            </option>
            {sectores && sectores.length > 0 ? (
              sectores.map((elem) => (
                <option key={elem.id} value={elem.id}>
                  {elem.descripcion}
                </option>
              ))
            ) : (
              <option disabled>No hay sectores</option>
            )}
          </select>
        </div>
      </div>

      {errores && <p className="error-msg">{errores}</p>}

      <div className="table-container">
        <table className="soporte-table">
          <thead>
            <tr>
              <th>Ticket Id</th>
              <th>Usuario</th>
              <th>Asunto</th>
              <th>Sector</th>
              <th>Estado</th>
              <th>Fecha Actualización</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {soportesPaginados && soportesPaginados.length > 0 ? (
              soportesPaginados.map((elem, ind) => (
                <tr key={ind}>
                  <td>{elem.ID}</td>
                  <td>{elem.nick}</td>
                  <td>{elem.asunto}</td>
                  <td>{elem.nombre_sector}</td>
                  <td>{elem.estado}</td>
                  <td>
                    {new Date(elem.fecha_cambio_estado).toLocaleString(
                      "es-AR",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                      }
                    )}
                  </td>
                  <td className="acciones-cell">
                    <Link
                      className={
                        elem.estado === "Cerrado"
                          ? "btn-bloqueado"
                          : "btn btn-responder"
                      }
                      to="/responder-soporte"
                      state={elem}
                    >
                      Responder
                    </Link>
                    <button
                      className="btn btn-cerrar"
                      onClick={() => {
                        closeSupport(elem.ID);
                      }}
                    >
                      Cerrar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="no-data">
                  No se encontraron soportes
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div
        className="paginacion"
        style={{ marginTop: "15px", textAlign: "center" }}
      >
        <button onClick={irPaginaAnterior} disabled={paginaActual === 1}>
          ← Anterior
        </button>
        <span style={{ margin: "0 15px" }}>
          Página {paginaActual} de {totalPaginas}
        </span>
        <button
          onClick={irPaginaSiguiente}
          disabled={paginaActual === totalPaginas}
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
};

export { PanelSoporte };
