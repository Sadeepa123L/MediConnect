import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Register} from "../services/authService"

function RegisterPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    const handleRegister = async () => {
      try{
        await Register(
          name,
          email,
          password
        );
        setName("");
        setEmail("");
        setPassword("")

        navigate("/login")
      }catch(error){
        console.log(error);
      }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <form autoComplete="off">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">

        <h2 className="text-3xl font-bold text-center mb-6">
          Register
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
        onClick={handleRegister}
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Register
        </button>
        <button
            type="button"
            onClick={() => navigate("/login")}
            className="w-full mt-2 bg-green-500 text-white p-2 rounded"
            >
             Login
            </button>
      </div>
      </form>

    </div>
  );
}

export default RegisterPage;