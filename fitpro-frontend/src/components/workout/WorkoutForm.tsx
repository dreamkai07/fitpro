import { useState } from "react";
import type { Workout } from "../../api/workoutApi";

interface WorkoutFormProps {
  onSuccess: (workout: Workout) => void;
  onCancel: () => void;
}

export default function WorkoutForm({ onSuccess, onCancel }: WorkoutFormProps) {
  const [formData, setFormData] = useState({
    workoutName: "",
    workoutType: "STRENGTH",
    durationMinutes: "",
    caloriesBurned: "",
    sets: "",
    reps: "",
    weight: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { addWorkout } = await import("../../api/workoutApi");
      const res = await addWorkout({
        ...formData,
        durationMinutes: Number(formData.durationMinutes),
        caloriesBurned: Number(formData.caloriesBurned),
        sets: Number(formData.sets),
        reps: Number(formData.reps),
        weight: Number(formData.weight),
      });
      onSuccess(res.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to add workout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-4">Log a New Workout</h3>
      
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            name="workoutName"
            className="col-span-2 p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-green-500 transition"
            placeholder="Workout Name (e.g., Morning Run, Chest Day)"
            value={formData.workoutName}
            onChange={handleChange}
            required
          />

          <select
            name="workoutType"
            className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-green-500 transition"
            value={formData.workoutType}
            onChange={handleChange}
          >
            <option value="STRENGTH">Strength</option>
            <option value="CARDIO">Cardio</option>
            <option value="FLEXIBILITY">Flexibility</option>
            <option value="SPORTS">Sports</option>
          </select>

          <input
            name="durationMinutes"
            type="number"
            className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-green-500 transition"
            placeholder="Duration (mins)"
            value={formData.durationMinutes}
            onChange={handleChange}
            required
          />

          <input
            name="sets"
            type="number"
            className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-green-500 transition"
            placeholder="Sets"
            value={formData.sets}
            onChange={handleChange}
          />

          <input
            name="reps"
            type="number"
            className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-green-500 transition"
            placeholder="Reps per set"
            value={formData.reps}
            onChange={handleChange}
          />

          <input
            name="weight"
            type="number"
            step="0.1"
            className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-green-500 transition"
            placeholder="Weight (kg)"
            value={formData.weight}
            onChange={handleChange}
          />

          <input
            name="caloriesBurned"
            type="number"
            className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-green-500 transition"
            placeholder="Calories Burned (optional)"
            value={formData.caloriesBurned}
            onChange={handleChange}
          />
          
          <textarea
            name="notes"
            className="col-span-2 p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-green-500 transition resize-none h-24"
            placeholder="Notes (optional)"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>

        <div className="flex gap-4 mt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-slate-700 hover:bg-slate-600 transition text-white py-3 rounded-lg font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-green-500 hover:bg-green-600 transition text-black py-3 rounded-lg font-semibold shadow-lg shadow-green-500/20"
          >
            {loading ? "Saving..." : "Save Workout"}
          </button>
        </div>
      </form>
    </div>
  );
}
