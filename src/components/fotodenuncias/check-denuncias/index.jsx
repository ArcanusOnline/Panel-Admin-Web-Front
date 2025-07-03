import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router";
import "./style.css";
import {
  marcarComoLeidaFD,
  traerEstadoYPenas,
  encarcelarPersonajeWeb,
  encarcelarPersonajeOffline,
  banearSiEstaOnline,
} from "../../../querys/scripts";

const CheckeoDenuncias = () => {
  let location = useLocation();
  let state = location.state || "";
  let insultos = state.Texto.split("|@");
  let [estadoPj, setEstadoPj] = useState("");
  let [penasPj, setPenasPj] = useState([]);
  let [ban, setBan] = useState(false);
  let [tiempoBan, setTiempoBan] = useState(0);
  let [pena, setPena] = useState({
    nick: "",
    tiempo: 0,
    gm: localStorage.getItem("username").toLowerCase() || "Administracion",
    razon: "",
    numeroFD: state?.ID,
  });
  let [token, setToken] = useState("");
  let [leida, setLeida] = useState("");
  let navigate = useNavigate();

  useState(() => {
    let selectToken = localStorage.getItem("token") || "";
    if (selectToken) {
      setToken(selectToken);
    }
    if (state.estado === 1) {
      setLeida("Fotodenuncia ya revisada");
    }
  }, []);

  const handleSeleccionarNick = async (nombre) => {
    setPena((prev) => ({ ...prev, nick: nombre }));
    let traerEstado = await traerEstadoYPenas(nombre);
    if (traerEstado.error === 0) {
      setPenasPj(traerEstado.personaje[0].PenasasB.split("\r"));
      if (traerEstado.personaje[0].Online === 0) {
        setEstadoPj("Offline");
      } else {
        setEstadoPj("Online");
      }
    }
  };

  const marcarLeidaFD = async () => {
    let id = state.ID;
    let mensaje = 1;
    const confirmar = window.confirm("¿Marcar como leida esta fotodenuncia?");
    if (!confirmar) return;
    let data = await marcarComoLeidaFD({ mensaje, id });
    if (data.error === 0) {
      navigate("/inicio");
      return;
    } else {
      alert(data.msg);
      return;
    }
  };

  const penarPersonaje = async () => {
    const confirmar = window.confirm(`¿Penar al personaje ${pena.nick}?`);
    if (!confirmar) return;
    let traerEstado = await traerEstadoYPenas(pena?.nick);
    if (traerEstado.personaje[0].Online === 1) {
      try {
        if (ban === true) {
          const banear = await banearSiEstaOnline({
            nick: pena?.nick,
            tiempo: tiempoBan,
            gm: pena?.gm,
            razon: pena?.razon,
            idPena: pena?.numeroFD,
          });
          if (banear.status === "ok") {
            alert("Personaje baneado correctamente");
            navigate("/inicio");
            return;
          }
        }
        const data = await encarcelarPersonajeWeb(pena);
        if (data?.mensaje) {
          let id = state.ID;
          let mensaje = 1;
          alert(data.mensaje);
          let estadoFD = await marcarComoLeidaFD({ mensaje, id });
          navigate("/inicio");
          return;
        }
      } catch (error) {
        alert("Error al intentar encarcelar el personaje.");
      }
    } else {
      if (!pena.nick || !pena.tiempo || !pena.razon) return;
      let dataOff = await encarcelarPersonajeOffline({
        personaje: pena.nick,
        pena: {
          ...pena,
          tiempo: ban ? tiempoBan : pena.tiempo,
        },
        ban,
        token,
      });
      if (dataOff.error === 0) {
        let id = state.ID;
        let mensaje = 1;
        alert("Personaje penado correctamente");
        let estadoFD = await marcarComoLeidaFD({ mensaje, id });
        navigate("/inicio");
        return;
      } else {
        alert(dataOff?.msg);
        return;
      }
    }
  };

  return (
    <>
      <Link to="/fotodenuncias" className="admin-back-link">
        Volver
      </Link>

      <div className="panel-container">
        {state && state !== "" ? (
          <div className="insulto-list">
            {insultos.map((elem, i) => {
              let nombre = elem.split(">")[0];
              let insulto = elem.split(">")[1];

              return (
                <div key={i}>
                  <p className="insulto-item">
                    <span
                      className="nombre-clickable"
                      onClick={() => handleSeleccionarNick(nombre)}
                    >
                      {nombre}
                    </span>
                    <span>{" > "}</span>
                    <span>{insulto}</span>
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No se encontraron datos de la fotodenuncia</p>
        )}

        <div className="estado-pena">
          <label htmlFor="agresor">
            Penar a:
            <input type="text" id="agresor" value={pena.nick} disabled />
          </label>
          <label htmlFor="estado-personaje">
            Estado:
            <input
              type="text"
              id="estado-personaje"
              value={estadoPj}
              disabled
            />
          </label>
        </div>

        <p>Prontuario:</p>
        <ol>
          {penasPj && Array.isArray(penasPj) ? (
            penasPj.map((elem, i) => (
              <li key={i}>{elem !== "" ? elem : "No hay penas"}</li>
            ))
          ) : (
            <li>No hay penas</li>
          )}
        </ol>

        <div className="motivos-container">
          <div className="motivo-item">
            <input
              type="radio"
              name="motivo-pena"
              id="motivo-pena-1"
              value="Insultos a otro usuario"
              onChange={(e) =>
                setPena((prev) => ({
                  ...prev,
                  razon: e.target.value,
                  tiempo: 30,
                }))
              }
            />
            <label htmlFor="motivo-pena-1">Insultos a otro usuario</label>
          </div>

          <div className="motivo-item">
            <input
              type="radio"
              name="motivo-pena"
              id="motivo-pena-2"
              value="Vocabulario inapropiado"
              onChange={(e) =>
                setPena((prev) => ({
                  ...prev,
                  razon: e.target.value,
                  tiempo: 10,
                }))
              }
            />
            <label htmlFor="motivo-pena-2">Vocabulario inapropiado</label>
          </div>

          <div className="motivo-item personalizado">
            <input
              type="radio"
              name="motivo-pena"
              id="motivo-pena-3"
              value="personalizado"
            />
            <label htmlFor="motivo-pena-3">Motivo personalizado:</label>

            <input
              type="text"
              placeholder="Escriba el motivo"
              onChange={(e) =>
                setPena((prev) => ({ ...prev, razon: e.target.value }))
              }
            />

            <label htmlFor="tiempo-personalizado">Min:</label>
            <select
              id="tiempo-personalizado"
              onChange={(e) =>
                setPena((prev) => ({ ...prev, tiempo: Number(e.target.value) }))
              }
              defaultValue={0}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={45}>45</option>
              <option value={60}>60</option>
              <option value={90}>90</option>
            </select>

            <label htmlFor="ban-check">Ban:</label>
            <input
              type="checkbox"
              id="ban-check"
              onChange={() => setBan((prev) => !prev)}
            />
            <label htmlFor="tiempo-baneo-custom">Dias:</label>
            <input
              type="number"
              id="tiempo-baneo-custom"
              name="tiempo-baneo-custom"
              value={tiempoBan}
              onChange={(e) => {
                setTiempoBan(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="acciones-panel">
          <button onClick={() => penarPersonaje()}>Sancionar</button>
          <button onClick={marcarLeidaFD}>No sancionar</button>
        </div>
      </div>
    </>
  );
};

export { CheckeoDenuncias };
