import axios from "axios";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("username", email);

      formData.append("password", password);

      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login",

        formData,
      );

      localStorage.setItem("token", response.data.access_token);
      window.location.reload()

      alert("Login Successful");

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-2xl shadow-xl w-[400px]"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-xl mb-5"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-xl mb-5"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-black text-white py-3 rounded-xl active:scale-95 transition">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
