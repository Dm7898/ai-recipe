import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { toast } from "sonner";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email || !user.password) {
      toast.error("All fields are required!");
      return;
    }
    try {
      const res = await api.post("/auth/login", user, {
        withCredentials: true,
      });
      console.log(res.data);
      login(res.data);
      navigate("/dashboard");
      toast.success("Login Successfull");
      setUser({ email: "", password: "" });
    } catch (err) {
      toast.error("Server Error");
      console.error(err);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="grid grid-cols-1 gap-2 p-6 w-full mx-auto lg:max-w-md bg-amber-200 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl text-center font-semibold">Login Here</h2>
        <div className="flex flex-col">
          <label>Email</label>
          <input
            className="input"
            type="email"
            value={user.email}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="Enter email id"
            required
          />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            className="input"
            type="password"
            value={user.password}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="Enter password"
            required
          />
        </div>
        <button type="submit" className="btn-primary">
          Submit
        </button>
        <div className="text-center">
          If you don&apos;t have account{" "}
          <Link className="text-blue-500" to="/register">
            Register here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
