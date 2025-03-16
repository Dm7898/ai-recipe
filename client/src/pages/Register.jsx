import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.username || !user.email || !user.password) {
      toast.error("All fields required!");
      return;
    }
    if (user.password.length < 8) {
      toast.error("Password length should be more than 6 characters");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/register", user);
      toast.success("Reigster Successfully!");
      navigate("/login");
      setUser({ username: "", email: "", password: "" });
    } catch (err) {
      toast.error("Server Error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className="grid grid-cols-1 gap-2 mt-4 p-4 w-full mx-auto lg:max-w-xl bg-amber-200 rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl text-center font-semibold">Register Here</h2>
      <div className="">
        <label className="block font-medium">Username</label>
        <input
          className="input w-full"
          type="text"
          placeholder="Enter username"
          name="username"
          required
          onChange={handleChange}
        />
      </div>
      <div className="">
        <label className="block font-medium">Email</label>
        <input
          className="input w-full"
          type="email"
          placeholder="Enter email"
          name="email"
          required
          onChange={handleChange}
        />
      </div>
      <div className="">
        <label className="block font-medium">Password</label>
        <input
          className="input w-full"
          type="password"
          placeholder="Enter password"
          name="password"
          required
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn-primary">
        {loading ? "Registering..." : "Regsiter"}
      </button>
      <div className="text-center">
        If you have account{" "}
        <Link className="text-blue-500" to="/login">
          Login here
        </Link>
      </div>
    </form>
  );
};

export default Register;
