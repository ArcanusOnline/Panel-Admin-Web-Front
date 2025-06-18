import { useState } from "react";
import { iniciarSesion } from "../../querys/scripts";
import { useNavigate } from "react-router";
import { checkRoles } from "../../utils/checkRoles";
import "./style.css";
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await iniciarSesion({
      username: credentials.username,
      password: credentials.password,
    });
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      let roles = await checkRoles();
      if (roles && roles[0] != null) {
        setError("Logeo exitoso");
        setTimeout(() => {
          navigate("/inicio");
        }, 1500);
        return;
      } else {
        setError("No estas autorizado");
        return;
      }
    }
    setError(data);
    return;
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Iniciar Sesión</h2>

        <input
          type="text"
          name="username"
          placeholder="Usuario"
          className="login-input"
          value={credentials.username}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="login-input"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="login-button">
          Iniciar Sesión
        </button>
      </form>
      {error && (
        <span
          style={{ color: error === "Logeo exitoso" ? "#38a169" : "#e53e3e" }}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export { Login };
