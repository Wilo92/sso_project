import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginV1 = async ({ document, password }) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/v1/login", {
        document,
        password,
      });
      localStorage.setItem("token", res.data.tokenJWT);
      navigate("/restricted-v1");
    } catch (err) {
      console.error("❌ Error en loginV1:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  const loginV2 = async (form) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v2/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Error al iniciar sesión v2");
      const data = await response.json();
      if (data.tokenJWT) {
        localStorage.setItem("token", data.tokenJWT);
        navigate("/restricted-v2");
      }
      return data;
    } catch (error) {
      console.error("❌ Error en loginV2:", error);
      setError("Error al iniciar sesión v2");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Enviar OTP correcto
  const sendOtp = async ({ phone }) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/otp/generate", { phone });
      console.log("✅ OTP enviado:", res.data);
      return res.data;
    } catch (err) {
      console.error("❌ Error al enviar OTP:", err.response?.data || err.message);
      setError("No se pudo enviar el OTP");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Validar OTP
  const loginV3 = async ({ phone, otp }) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("http://127.0.0.1:8000/api/v3/login", { phone, otp });
      console.log("✅ Login con OTP exitoso:", res.data);
      if (res.data.tokenJWT) {
        localStorage.setItem("token", res.data.tokenJWT);
        navigate("/restricted-v1");
      }
      return res.data;
    } catch (err) {
      console.error("❌ Error en loginV3:", err.response?.data || err.message);
      setError("OTP inválido o expirado");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login-v1");
  };

  return (
    <AuthContext.Provider
      value={{ loginV1, loginV2, loginV3, sendOtp, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
