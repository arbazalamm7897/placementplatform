import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (!token || token === "undefined" || token === "null" || !user) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  try {
    const [, payloadBase64] = token.split(".");

    if (!payloadBase64) {
      throw new Error("Malformed token");
    }

    const payload = JSON.parse(atob(payloadBase64));

    if (payload?.exp && payload.exp * 1000 <= Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return <Navigate to="/login" replace />;
    }
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
