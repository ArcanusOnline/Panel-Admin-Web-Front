import { traerFotodenuncias } from "../../querys/scripts";
import { useState, useEffect } from "react";
import { checkRoles } from "../../utils/checkRoles";
import { useNavigate, Outlet, useLocation, Link } from "react-router";
import "./style.css";

const Fotodenuncias = () => {
  let [fotodenuncias, setFotodenuncias] = useState([]);
  let [error, setError] = useState("");
  let navigate = useNavigate();
  let location = useLocation();

  let checkeo = location.pathname.endsWith("check-denuncia");

  useEffect(() => {
    let roles = checkRoles();
    if (!roles || !roles.includes(1)) {
      navigate("/inicio");
      return;
    }
    async function cargarFotodenuncias() {
      let data = await traerFotodenuncias();
      if (data.error === 1) {
        setError("Error al cargar las fotodenuncias");
        return;
      } else {
        setFotodenuncias(data.fotodenuncias);
        return;
      }
    }
    cargarFotodenuncias();
  }, []);

  const formatFecha = (fechaStr) => {
    if (!fechaStr) return "";
    const fecha = new Date(fechaStr);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  const handleRowClick = (denuncia) => {
    navigate("/fotodenuncias/check-denuncia", {
      state: { ...denuncia },
    });
  };

  return (
    <>
      {checkeo ? (
        <Outlet />
      ) : (
        <>
          <Link to="/inicio" className="admin-back-link">
            Volver
          </Link>
          <div className="tabla-contenedor">
            <table className="tabla-fotodenuncias">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Estado</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {fotodenuncias &&
                Array.isArray(fotodenuncias) &&
                fotodenuncias.length > 0 ? (
                  fotodenuncias.map((elem) => (
                    <tr
                      key={elem.ID}
                      onClick={() => handleRowClick(elem)}
                      className="tabla-fila-clickeable"
                    >
                      <td>{elem.ID}</td>
                      <td>{elem.Usuario}</td>
                      <td>{elem.estado !== 1 ? "Sin Leer" : "Leida"}</td>
                      <td>{formatFecha(elem.Fecha)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      style={{ textAlign: "center", padding: "1rem" }}
                    >
                      {error || "No hay datos para mostrar"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export { Fotodenuncias };
