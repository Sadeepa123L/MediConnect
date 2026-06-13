import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Login} from '../services/authService'

function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent ) => {
    e.preventDefault();

    const data = await Login(
      email,
      password
    );  
    localStorage.setItem("token", data.token);
      navigate("/dashboard"); 
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-lg w-96">

        <h2 className="text-3xl font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Enter email"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="w-full mt-2 bg-green-500 text-white p-2 rounded"
            >
             Register
            </button>
        </form>

      </div>

    </div>
  );
}

export default LoginPage;