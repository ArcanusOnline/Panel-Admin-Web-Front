import { Link, useNavigate } from "react-router";
import { useState, useRef } from "react";
import "./style.css";
import { ingresarNoticiaNueva } from "../../../querys/scripts";

const AgregarNoticia = () => {
  const [fields, setFields] = useState({
    title: "",
    descr: "",
    texto: "",
    fecha: Math.floor(Date.now() / 1000),
    autor: localStorage.getItem("username") || "Staff",
    token: localStorage.getItem("token") || "",
  });
  const [error, setError] = useState("");
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  const insertarEtiqueta = (etiquetaInicio, etiquetaFin) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const textoSeleccionado = fields.texto.slice(start, end);
    const nuevoTexto =
      fields.texto.slice(0, start) +
      etiquetaInicio +
      textoSeleccionado +
      etiquetaFin +
      fields.texto.slice(end);

    setFields((prev) => ({ ...prev, texto: nuevoTexto }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + etiquetaInicio.length,
        end + etiquetaInicio.length
      );
    }, 0);
  };

  const convertirLinks = (texto) => {
    const customTagRegex = /\[url=([^\]]+)\](.*?)\[\/url\]/gi;
    let textoConAnclas = texto.replace(
      customTagRegex,
      (match, url, textoVisible) => {
        const urlConProtocolo = url.match(/^https?:\/\//i)
          ? url
          : `https://${url}`;
        return `<a href="${urlConProtocolo}" target="_blank" rel="noopener noreferrer">${textoVisible}</a>`;
      }
    );

    const httpRegex = /(?<!["'>])\b(https?:\/\/[^\s<]+[^\s<.,:;"')\]\s])/gi;
    textoConAnclas = textoConAnclas.replace(httpRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });

    const wwwRegex =
      /(?<!["'=\]]|https?:\/\/)(\bwww\.[^\s<]+[^\s<.,:;"')\]\s])/gi;
    textoConAnclas = textoConAnclas.replace(wwwRegex, (url) => {
      return `<a href="https://${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });

    return textoConAnclas;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const textoConLinks = convertirLinks(fields.texto);

    const data = await ingresarNoticiaNueva({
      ...fields,
      texto: textoConLinks,
    });

    if (data.error === 0) {
      alert(data.msg);
      navigate("/noticias");
    } else {
      setError(data.msg);
    }
  };

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

          {/* Botones de formato */}
          <div className="formato-botones">
            <button
              type="button"
              onClick={() => insertarEtiqueta("<b>", "</b>")}
            >
              Negrita
            </button>
            <button
              type="button"
              onClick={() => insertarEtiqueta("<i>", "</i>")}
            >
              Cursiva
            </button>
            <button
              type="button"
              onClick={() => insertarEtiqueta("<u>", "</u>")}
            >
              Subrayado
            </button>
            <button
              type="button"
              onClick={() => {
                const url = prompt("Ingresá la URL:");
                if (url) {
                  insertarEtiqueta(`[url=${url}]`, `[/url]`);
                }
              }}
            >
              Insertar Link
            </button>
          </div>

          <textarea
            ref={textareaRef}
            id="descripcion"
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

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export { AgregarNoticia };
