function checkRoles() {
  let token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  const payload = JSON.parse(jsonPayload);

  if (!payload.roles || payload.roles.length === 0) {
    return null;
  }
  return payload.roles;
}

export { checkRoles };
