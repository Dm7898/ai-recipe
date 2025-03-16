import { createContext, useEffect, useState } from "react";
import { api } from "../api/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    token: localStorage.getItem("token") || "",
    role: localStorage.getItem("role") || "",
  });

  useEffect(() => {
    localStorage.getItem("token");
    localStorage.getItem("role");
  }, [user]);

  const refreshToken = async () => {
    if (!user) return;
    try {
      const res = await api.post(
        "/auth/refresh-token",
        {},
        { withCredentials: true }
      );
      console.log("refresh:", res.data.token);
      setUser((prev) => ({ ...prev, token: res.data.token }));
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.error("refresh token failed,please login again", err);
      logOut();
    }
  };

  useEffect(() => {
    const intervel = setInterval(refreshToken, 14 * 60 * 1000);

    return () => clearInterval(intervel);
  }, []);

  const login = (data) => {
    if (!data) return;
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);

    setUser({ token: data.token, role: data.role });
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setUser({
      token: "",
      role: "",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
