import { Outlet, Navigate } from "react-router";

const PrivateRoute = () => {
  let token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const payload = JSON.parse(jsonPayload);
    if (!payload.username) {
      return <Navigate to="/" replace />;
    }


    return <Outlet />;
  } catch (e) {
    console.error("Token inválido:", e);
    return <Navigate to="/" replace />;
  }
};

export { PrivateRoute };
