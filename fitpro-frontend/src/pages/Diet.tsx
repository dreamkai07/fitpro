import { useEffect, useState } from "react";
import type { DietEntry } from "../api/dietApi";
import { getMealsToday } from "../api/dietApi";
import DietList from "../components/diet/DietList";
import DietForm from "../components/diet/DietForm";

export default function Diet() {
  const [meals, setMeals] = useState<DietEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchMeals = async () => {
    setLoading(true);
    try {
      const res = await getMealsToday();
      setMeals(res.data);
    } catch (error) {
      console.error("Error fetching meals", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleMealAdded = (newMeal: DietEntry) => {
    setMeals((prev) => [...prev, newMeal]);
    setShowForm(false);
  };

  const handleMealDeleted = (id: number) => {
    setMeals((prev) => prev.filter((m) => m.id !== id));
  };

  const totalCalories = meals.reduce((sum, meal) => sum + (meal.calories || 0), 0);
  const totalProtein = meals.reduce((sum, meal) => sum + (meal.protein || 0), 0);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Your Diet</h1>
          <p className="text-slate-400 mt-2">Track what you eat to reach your goals.</p>
        </div>
        <div className="text-right hidden sm:block">
          <div className="flex gap-4">
            <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
              <span className="text-slate-400 text-sm">Calories: </span>
              <span className="text-white font-bold">{totalCalories}</span>
            </div>
            <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
              <span className="text-slate-400 text-sm">Protein: </span>
              <span className="text-white font-bold">{totalProtein}g</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full sm:w-auto bg-green-500 hover:bg-green-600 transition text-black font-bold py-3 px-8 rounded-xl shadow-lg shadow-green-500/20"
          >
            + Log Meal
          </button>
        )}
      </div>

      {showForm ? (
        <div className="mb-10 max-w-2xl mx-auto">
          <DietForm
            onSuccess={handleMealAdded}
            onCancel={() => setShowForm(false)}
          />
        </div>
      ) : null}

      {loading ? (
        <div className="text-center text-slate-400 py-10">Loading meals...</div>
      ) : (
        <DietList meals={meals} onMealDeleted={handleMealDeleted} />
      )}
    </div>
  );
}
