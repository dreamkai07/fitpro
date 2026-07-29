import type { DietEntry } from "../../api/dietApi";
import { deleteMeal } from "../../api/dietApi";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface DietListProps {
  meals: DietEntry[];
  onMealDeleted: (id: number) => void;
}

export default function DietList({ meals, onMealDeleted }: DietListProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this meal?")) return;
    
    setDeletingId(id);
    try {
      await deleteMeal(id);
      onMealDeleted(id);
    } catch (error) {
      console.error("Failed to delete meal", error);
      alert("Failed to delete meal.");
    } finally {
      setDeletingId(null);
    }
  };

  if (meals.length === 0) {
    return (
      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center text-slate-400 shadow-lg">
        No meals logged for today. Let's eat healthy!
      </div>
    );
  }

  // Group meals by mealType
  const groupedMeals = meals.reduce((acc, meal) => {
    const type = meal.mealType || "OTHER";
    if (!acc[type]) acc[type] = [];
    acc[type].push(meal);
    return acc;
  }, {} as Record<string, DietEntry[]>);

  const mealOrder = ["BREAKFAST", "LUNCH", "DINNER", "SNACK"];
  const sortedTypes = Object.keys(groupedMeals).sort(
    (a, b) => mealOrder.indexOf(a) - mealOrder.indexOf(b)
  );

  return (
    <div className="flex flex-col gap-6">
      {sortedTypes.map((type) => (
        <div key={type} className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700/50">
          <h3 className="text-xl font-bold text-white mb-4 capitalize border-b border-slate-700 pb-2">
            {type.toLowerCase()}
          </h3>
          
          <div className="flex flex-col gap-4">
            {groupedMeals[type].map((meal) => (
              <div key={meal.id} className="flex justify-between items-center group">
                <div className="flex-1">
                  <p className="font-semibold text-slate-200 text-lg">{meal.foodName}</p>
                  <p className="text-sm text-slate-400">
                    {meal.quantity} {meal.unit} • <span className="text-green-400 font-medium">{meal.calories} kcal</span>
                  </p>
                  <div className="flex gap-4 mt-1 text-xs text-slate-500">
                    <span>Protein: {meal.protein}g</span>
                    <span>Carbs: {meal.carbs}g</span>
                    <span>Fats: {meal.fats}g</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(meal.id)}
                  disabled={deletingId === meal.id}
                  className="text-slate-600 hover:text-red-400 transition p-2 hover:bg-red-400/10 rounded-lg opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
