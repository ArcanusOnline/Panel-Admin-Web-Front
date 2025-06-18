import { Link, useNavigate } from "react-router";
import { useState } from "react";
import "./style.css";
import { ingresarNoticiaNueva } from "../../../querys/scripts";

const AgregarNoticia = () => {
  let [fields, setFields] = useState({
    title: "",
    descr: "",
    texto: "",
    fecha: Math.floor(Date.now() / 1000),
    autor: localStorage.getItem("username") || "Staff",
  });
  let [error, setError] = useState("");
  let navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    let data = await ingresarNoticiaNueva(fields);
    if (data.error === 0) {
      alert(data.msg);
      navigate("/noticias");
    } else {
      setError(data.msg);
    }
  }

  return (
    <div className="agregar-noticia-container">
      <Link to="/noticias" className="link-volver">
        ← Volver
      </Link>
      <h2>Agregar noticia</h2>
      <form onSubmit={handleSubmit} className="form-noticia">
        <div className="form-group">
          <label htmlFor="titulo" className="label">
            Título:
          </label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={fields.title}
            onChange={(e) =>
              setFields((prev) => ({ ...prev, title: e.target.value }))
            }
            required
            className="input-text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="resumen" className="label">
            Resumen:
          </label>
          <textarea
            id="resumen"
            name="resumen"
            rows="4"
            maxLength="150"
            placeholder="Escriba aquí un resumen (máximo 150 caracteres)"
            value={fields.descr}
            onChange={(e) =>
              setFields((prev) => ({ ...prev, descr: e.target.value }))
            }
            required
            className="textarea"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="descripcion" className="label">
            Descripción de la noticia:
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows="6"
            maxLength="2000"
            placeholder="Escriba aquí la descripción completa de la noticia (máximo 2000 caracteres)"
            value={fields.texto}
            onChange={(e) =>
              setFields((prev) => ({ ...prev, texto: e.target.value }))
            }
            required
            className="textarea"
          ></textarea>
        </div>

        <div className="form-group">
          <input type="submit" value="Agregar Noticia" className="btn-submit" />
        </div>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export { AgregarNoticia };
