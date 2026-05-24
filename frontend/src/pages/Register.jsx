import axios from "axios";

import { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/register",

        {
          username,
          email,
          password,
        },
      );

      console.log(response.data);

      alert("Registered Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-10 rounded-2xl shadow-xl w-[400px]"
      >
        <h1 className="text-3xl font-bold mb-8 text-center">Register</h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full border p-3 rounded-xl mb-5"
          onChange={(e) => setUsername(e.target.value)}
        />

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

        <button className="w-full bg-black text-white py-3 rounded-xl">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
