import { useEffect, useState } from "react";
import { getWorkoutStats } from "../api/workoutApi";
import { getNutrition } from "../api/dietApi";

export default function Dashboard() {
  const [workoutStats, setWorkoutStats] = useState({
    todayCaloriesBurned: 0,
    monthlyWorkouts: 0,
  });

  const [dietStats, setDietStats] = useState({
    totalCalories: 0,
    totalProtein: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workoutRes, dietRes] = await Promise.all([
          getWorkoutStats(),
          getNutrition(),
        ]);
        
        setWorkoutStats(workoutRes.data);
        setDietStats(dietRes.data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-white text-center mt-20">Loading dashboard...</div>;
  }

  // Calculate goal percentage mock logic (e.g., target 2000 calories)
  const goalPercentage = Math.min(Math.round((dietStats.totalCalories / 2000) * 100), 100) || 0;

  return (
    <div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-700/50">
          <p className="text-slate-400 font-medium">Diet Calories</p>
          <h2 className="text-4xl font-bold mt-3 text-white">
            {dietStats.totalCalories} <span className="text-sm font-normal text-slate-500">kcal</span>
          </h2>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-700/50">
          <p className="text-slate-400 font-medium">Protein Intake</p>
          <h2 className="text-4xl font-bold mt-3 text-white">
            {dietStats.totalProtein} <span className="text-sm font-normal text-slate-500">g</span>
          </h2>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-700/50">
          <p className="text-slate-400 font-medium">Monthly Workouts</p>
          <h2 className="text-4xl font-bold mt-3 text-white">
            {workoutStats.monthlyWorkouts}
          </h2>
        </div>

        <div className="bg-green-500 rounded-2xl p-6 text-black shadow-lg shadow-green-500/20">
          <p className="font-semibold opacity-80">Calorie Goal (2000)</p>
          <h2 className="text-4xl font-bold mt-3">
            {goalPercentage}%
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-slate-800 rounded-2xl p-8 h-[350px] shadow-lg border border-slate-700/50">
          <h2 className="text-xl font-bold text-white mb-4">Activity Summary</h2>
          <div className="flex justify-center items-center h-full text-slate-500">
            <p>Today you burned {workoutStats.todayCaloriesBurned} calories from workouts.</p>
          </div>
        </div>
        <div className="bg-slate-800 rounded-2xl p-8 h-[350px] shadow-lg border border-slate-700/50 flex flex-col justify-center items-center">
          <h2 className="text-xl font-bold text-white mb-4 w-full text-left">Quick Actions</h2>
          <div className="flex gap-4 w-full h-full items-center justify-center">
             <a href="/workout" className="bg-slate-700 hover:bg-slate-600 transition p-4 rounded-xl text-center w-full shadow text-white font-medium">Add Workout</a>
             <a href="/diet" className="bg-slate-700 hover:bg-slate-600 transition p-4 rounded-xl text-center w-full shadow text-white font-medium">Log Meal</a>
          </div>
        </div>
      </div>
    </div>
  );
}
