import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/authApi";

export default function Goals() {
  const [formData, setFormData] = useState({
    fitnessGoal: "",
    calorieTarget: "",
    proteinTarget: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setFormData({
          fitnessGoal: res.data.fitnessGoal || "BUILD_MUSCLE",
          calorieTarget: res.data.calorieTarget?.toString() || "",
          proteinTarget: res.data.proteinTarget?.toString() || ""
        });
      } catch (error) {
        console.error("Failed to fetch goals", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    
    try {
      await updateProfile({
        fitnessGoal: formData.fitnessGoal,
        calorieTarget: formData.calorieTarget ? parseInt(formData.calorieTarget) : null,
        proteinTarget: formData.proteinTarget ? parseInt(formData.proteinTarget) : null
      });
      setMessage("Goals updated successfully!");
    } catch (error) {
      console.error("Failed to update goals", error);
      setMessage("Error updating goals. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white text-center p-10">Loading goals...</div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-4xl font-bold text-white mb-8">My Goals</h1>

      <div className="bg-slate-800 rounded-2xl p-8 shadow-xl border border-slate-700/50">
        <form onSubmit={handleSave}>
          
          {message && (
            <div className={`p-4 rounded-lg mb-6 text-sm font-semibold ${message.includes("success") ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
              {message}
            </div>
          )}

          <div className="mb-6">
            <label className="block text-slate-400 mb-2 font-medium">Primary Fitness Goal</label>
            <select
              name="fitnessGoal"
              className="w-full p-4 rounded-xl bg-slate-700 text-white outline-none border border-slate-600 focus:border-green-500 transition"
              value={formData.fitnessGoal}
              onChange={handleChange}
            >
              <option value="WEIGHT_LOSS">Weight Loss</option>
              <option value="BUILD_MUSCLE">Build Muscle</option>
              <option value="MAINTAIN">Maintain</option>
              <option value="ENDURANCE">Endurance</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-slate-400 mb-2 font-medium">Daily Calorie Target (kcal)</label>
            <input
              type="number"
              name="calorieTarget"
              className="w-full p-4 rounded-xl bg-slate-700 text-white outline-none border border-slate-600 focus:border-green-500 transition"
              placeholder="e.g. 2500"
              value={formData.calorieTarget}
              onChange={handleChange}
            />
            <p className="text-xs text-slate-500 mt-2">Set your daily target to track your diet progress on the dashboard.</p>
          </div>

          <div className="mb-8">
            <label className="block text-slate-400 mb-2 font-medium">Daily Protein Target (g)</label>
            <input
              type="number"
              name="proteinTarget"
              className="w-full p-4 rounded-xl bg-slate-700 text-white outline-none border border-slate-600 focus:border-green-500 transition"
              placeholder="e.g. 150"
              value={formData.proteinTarget}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-green-500 hover:bg-green-600 transition rounded-xl py-4 font-bold text-white shadow-lg disabled:opacity-50"
          >
            {saving ? "Saving Goals..." : "Save Target Goals"}
          </button>
        </form>
      </div>
    </div>
  );
}
