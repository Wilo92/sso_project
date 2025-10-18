import api from "./api/client";

const email = "admin@ejemplo.com";  
const password = "123456";          

api.post("/v1/login", { email, password })
  .then((res) => {
    console.log("✅ Login correcto:", res.data);
    localStorage.setItem("token", res.data.token);
  })
  .catch((err) => {
    console.error("❌ Error de login:", err.response?.data || err.message);
  });
