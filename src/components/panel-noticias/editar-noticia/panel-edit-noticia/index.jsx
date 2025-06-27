import { Link, useLocation, useNavigate } from "react-router";
import { useState, useRef } from "react";
import "./style.css";
import { actualizarNoticia } from "../../../../querys/scripts";

const PanelEditNoticia = () => {
  const location = useLocation();
  const datos = location.state || null;
  const navigate = useNavigate();
  const textareaRef = useRef(null);

  const [noticia, setNoticia] = useState({
    id: datos?.id,
    name: datos?.name || "",
    msg: datos?.msg || "",
    date: datos?.date || "",
    completa: datos?.completa || "",
    titulo: datos?.titulo || "",
    comentario_id: datos?.comentario_id || "",
  });

  if (!datos) {
    return (
      <div className="no-datos-container">
        <p>No hay datos de la noticia seleccionada.</p>
        <Link to="/noticias" className="link-volver">
          ← Volver
        </Link>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoticia((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const insertarEtiqueta = (etiquetaInicio, etiquetaFin) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const textoSeleccionado = noticia.completa.slice(start, end);

    const nuevoTexto =
      noticia.completa.slice(0, start) +
      etiquetaInicio +
      textoSeleccionado +
      etiquetaFin +
      noticia.completa.slice(end);

    setNoticia((prev) => ({ ...prev, completa: nuevoTexto }));

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + etiquetaInicio.length,
        end + etiquetaInicio.length
      );
    }, 0);
  };

  const convertirTextoFinal = (texto) => {
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

    const textoFinal = convertirTextoFinal(noticia.completa);

    try {
      const data = await actualizarNoticia(noticia.id, {
        msg: noticia.msg,
        titulo: noticia.titulo,
        completa: textoFinal,
      });

      if (data.error === 0) {
        alert(data.msg);
        navigate("/noticias");
      } else {
        alert(data.msg);
      }
    } catch (err) {
      console.error("Error al guardar la noticia:", err);
      alert("Ocurrió un error al editar la noticia.");
    }
  };

  return (
    <div className="panel-edit-noticia-container">
      <Link to="/noticias" className="link-volver">
        ← Volver
      </Link>
      <h2 className="titulo-principal">Editar Noticia #{noticia.id}</h2>
      <form onSubmit={handleSubmit} className="form-editar-noticia">
        <div className="form-group">
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={noticia.titulo}
            onChange={handleChange}
            required
            className="input-text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="msg">Mensaje:</label>
          <textarea
            id="msg"
            name="msg"
            value={noticia.msg}
            onChange={handleChange}
            rows={5}
            className="input-textarea"
          />
        </div>

        <div className="form-group">
          <label htmlFor="completa">Completa:</label>

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
            id="completa"
            name="completa"
            value={noticia.completa}
            onChange={handleChange}
            rows={6}
            className="input-textarea"
          />
        </div>

        <div className="btn-group">
          <button type="submit" className="btn-guardar">
            Guardar cambios
          </button>
          <button
            type="button"
            onClick={() => navigate("/noticias")}
            className="btn-cancelar"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export { PanelEditNoticia };
