import "./style.css";
import { checkUsername } from "../../utils/checkUsernameToken";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { obtenerRangosCuenta } from "../../querys/scripts";

const PanelInicio = () => {
  const [username, setUsername] = useState("");
  const [rangos, setRangos] = useState([]);
  const [error, setError] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    async function cargarRangos() {
      let usuario = checkUsername();
      if (usuario === null) {
        navigate("/");
      }
      setUsername(usuario);
      let rangos = await obtenerRangosCuenta(usuario);
      if (rangos.hasOwnProperty("error") === true) {
        setError(rangos.msg);
      }
      setRangos(rangos);
    }
    cargarRangos();
  }, []);

  function cerrarSesion() {
    localStorage.setItem("token", "");
    localStorage.setItem("username", "");
    navigate("/");
  }

  return (
    <div className="panel-container">
      <h1 className="panel-title">Panel de {username}</h1>
      <div className="panel-links">
        {Array.isArray(rangos) && rangos.length > 0 ? (
          rangos.map((elem, ind) => {
            if (elem.Descripcion !== "Panel Administrador") {
              return (
                <div key={ind} className="panel-link-item">
                  <Link
                    className="panel-link"
                    to={`/${elem.Descripcion.replaceAll(
                      " ",
                      "-"
                    ).toLowerCase()}`}
                  >
                    {elem.Descripcion}
                  </Link>
                </div>
              );
            }
          })
        ) : (
          <h3 className="panel-error">{error}</h3>
        )}
      </div>
      <button className="panel-logout-button" onClick={cerrarSesion}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export { PanelInicio };
