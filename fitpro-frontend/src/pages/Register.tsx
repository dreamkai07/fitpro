import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../api/authApi";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    age: "",
    weight: "",
    height: "",
    fitnessGoal: "BUILD_MUSCLE",
    activityLevel: "MODERATE",
    role: "TRAINEE",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await register({
        ...formData,
        age: Number(formData.age),
        weight: Number(formData.weight),
        height: Number(formData.height),
      });

      // Redirect to login on success
      navigate("/login");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8">
      <form
        onSubmit={handleRegister}
        className="bg-slate-800 p-8 rounded-2xl w-full max-w-lg shadow-xl"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Join FitPro
        </h1>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4">
          <input
            name="username"
            className="col-span-2 p-3 rounded-lg bg-slate-700 text-white outline-none"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            className="col-span-2 p-3 rounded-lg bg-slate-700 text-white outline-none"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            name="password"
            type="password"
            className="col-span-2 p-3 rounded-lg bg-slate-700 text-white outline-none"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            name="fullName"
            className="col-span-2 p-3 rounded-lg bg-slate-700 text-white outline-none"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            name="age"
            type="number"
            className="p-3 rounded-lg bg-slate-700 text-white outline-none"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />
          <input
            name="weight"
            type="number"
            step="0.1"
            className="p-3 rounded-lg bg-slate-700 text-white outline-none"
            placeholder="Weight (kg)"
            value={formData.weight}
            onChange={handleChange}
            required
          />
          <input
            name="height"
            type="number"
            step="0.1"
            className="p-3 rounded-lg bg-slate-700 text-white outline-none"
            placeholder="Height (cm)"
            value={formData.height}
            onChange={handleChange}
            required
          />
          <select
            name="fitnessGoal"
            className="col-span-2 p-3 rounded-lg bg-slate-700 text-white outline-none"
            value={formData.fitnessGoal}
            onChange={handleChange}
          >
            <option value="WEIGHT_LOSS">Weight Loss</option>
            <option value="BUILD_MUSCLE">Build Muscle</option>
            <option value="MAINTAIN">Maintain</option>
            <option value="ENDURANCE">Endurance</option>
          </select>
          <select
            name="activityLevel"
            className="col-span-2 p-3 rounded-lg bg-slate-700 text-white outline-none"
            value={formData.activityLevel}
            onChange={handleChange}
          >
            <option value="SEDENTARY">Sedentary</option>
            <option value="LIGHTLY_ACTIVE">Lightly Active</option>
            <option value="MODERATELY_ACTIVE">Moderately Active</option>
            <option value="VERY_ACTIVE">Very Active</option>
            <option value="EXTRA_ACTIVE">Extra Active</option>
          </select>
          <select
            name="role"
            className="col-span-2 p-3 rounded-lg bg-slate-700 text-white outline-none"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="TRAINEE">Trainee</option>
            <option value="TRAINER">Trainer</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        <button
          disabled={loading}
          className="w-full mt-6 bg-green-500 hover:bg-green-600 transition rounded-lg py-3 font-semibold text-white mb-4"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-center text-slate-400 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-green-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
