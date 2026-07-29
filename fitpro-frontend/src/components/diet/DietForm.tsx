import { useState } from "react";
import type { DietEntry } from "../../api/dietApi";

interface DietFormProps {
  onSuccess: (meal: DietEntry) => void;
  onCancel: () => void;
}

export default function DietForm({ onSuccess, onCancel }: DietFormProps) {
  const [formData, setFormData] = useState({
    foodName: "",
    mealType: "BREAKFAST",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
    quantity: "1",
    unit: "serving",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { addMeal } = await import("../../api/dietApi");
      const res = await addMeal({
        ...formData,
        calories: Number(formData.calories),
        protein: Number(formData.protein),
        carbs: Number(formData.carbs),
        fats: Number(formData.fats),
        quantity: Number(formData.quantity),
      });
      onSuccess(res.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to add meal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-4">Log a Meal</h3>
      
      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            name="foodName"
            className="col-span-2 p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-green-500 transition"
            placeholder="Food Name (e.g., Oatmeal, Chicken Breast)"
            value={formData.foodName}
            onChange={handleChange}
            required
          />

          <select
            name="mealType"
            className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-green-500 transition"
            value={formData.mealType}
            onChange={handleChange}
          >
            <option value="BREAKFAST">Breakfast</option>
            <option value="LUNCH">Lunch</option>
            <option value="DINNER">Dinner</option>
            <option value="SNACK">Snack</option>
          </select>

          <input
            name="calories"
            type="number"
            className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-green-500 transition"
            placeholder="Calories"
            value={formData.calories}
            onChange={handleChange}
            required
          />

          <input
            name="protein"
            type="number"
            step="0.1"
            className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-green-500 transition"
            placeholder="Protein (g)"
            value={formData.protein}
            onChange={handleChange}
          />

          <input
            name="carbs"
            type="number"
            step="0.1"
            className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-green-500 transition"
            placeholder="Carbs (g)"
            value={formData.carbs}
            onChange={handleChange}
          />

          <input
            name="fats"
            type="number"
            step="0.1"
            className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-green-500 transition"
            placeholder="Fats (g)"
            value={formData.fats}
            onChange={handleChange}
          />

          <input
            name="quantity"
            type="number"
            step="0.1"
            className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-green-500 transition"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
          />

          <input
            name="unit"
            className="p-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-green-500 transition"
            placeholder="Unit (e.g., cups, grams)"
            value={formData.unit}
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
            {loading ? "Saving..." : "Save Meal"}
          </button>
        </div>
      </form>
    </div>
  );
}
