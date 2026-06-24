import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Register } from "../services/authService";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); 
    try {
      await Register(name, email, password);
      setName("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF6EF] relative overflow-hidden px-4">
      <div
        className="absolute -top-32 -left-24 w-96 h-96 rounded-full bg-[#EF8354]/10 blur-2xl"
        aria-hidden="true"
      ></div>
      <div
        className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#A8C4B0]/30 blur-2xl"
        aria-hidden="true"
      ></div>

      <div className="relative bg-white p-8 md:p-10 rounded-[28px] shadow-[0_20px_60px_-15px_rgba(51,43,37,0.15)] w-full max-w-md border border-[#E8DFD0]/40 z-10">
        
        <div className="text-center mb-8">
          <h2
            className="text-3xl md:text-4xl font-semibold text-[#332B25] mb-2 tracking-tight"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Create <span className="text-[#2A6B63] italic">Account</span>
          </h2>
          <p className="text-sm text-[#5C5249]">
            Join us to find and book your doctor in minutes
          </p>
        </div>

        <form onSubmit={handleRegister} autoComplete="off" className="space-y-5">
          <div className="w-full text-left">
            <label className="block text-sm font-medium text-[#332B25] mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              className="w-full p-3.5 border border-[#E8DFD0] rounded-2xl outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] transition-all text-[#332B25] placeholder:text-[#A39A8C]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="w-full text-left">
            <label className="block text-sm font-medium text-[#332B25] mb-1.5">
              Email address
            </label>
            <input
              type="email"
              placeholder="e.g. john@example.com"
              className="w-full p-3.5 border border-[#E8DFD0] rounded-2xl outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] transition-all text-[#332B25] placeholder:text-[#A39A8C]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="w-full text-left">
            <label className="block text-sm font-medium text-[#332B25] mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3.5 border border-[#E8DFD0] rounded-2xl outline-none focus:ring-2 focus:ring-[#2A6B63]/15 focus:border-[#2A6B63] transition-all text-[#332B25] placeholder:text-[#A39A8C]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 bg-[#EF8354] text-white p-3.5 rounded-2xl font-medium hover:bg-[#DD6E3D] transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <i className="ti ti-user-plus text-lg" aria-hidden="true"></i>
            Register
          </button>
        </form>

        <div className="mt-8 text-center border-t border-[#E8DFD0]/60 pt-6">
          <p className="text-sm text-[#5C5249]">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-[#2A6B63] font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer transition-colors"
            >
              Login here
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}

export default RegisterPage;