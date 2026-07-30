import { useEffect, useState } from "react";
import { getWorkoutStats } from "../api/workoutApi";
import { getNutrition } from "../api/dietApi";
import { getProfile } from "../api/authApi";
import { getTraineeBookings } from "../api/bookingApi";

export default function Dashboard() {
  const [workoutStats, setWorkoutStats] = useState({
    todayCaloriesBurned: 0,
    monthlyWorkouts: 0,
  });

  const [dietStats, setDietStats] = useState({
    totalCalories: 0,
    totalProtein: 0,
  });

  const [userProfile, setUserProfile] = useState<any>(null);
  const [activeTrainer, setActiveTrainer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workoutRes, dietRes, profileRes, bookingsRes] = await Promise.all([
          getWorkoutStats(),
          getNutrition(),
          getProfile(),
          getTraineeBookings().catch(() => []),
        ]);
        
        setWorkoutStats(workoutRes.data);
        setDietStats(dietRes.data);
        setUserProfile(profileRes.data);
        
        const active = bookingsRes.find((b: any) => b.status === "ACTIVE");
        if (active) setActiveTrainer(active);
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
  const targetCalories = userProfile?.calorieTarget || 2000;
  const goalPercentage = Math.min(Math.round((dietStats.totalCalories / targetCalories) * 100), 100) || 0;

  const roleColors: Record<string, string> = {
    ADMIN: "bg-red-500/20 text-red-400 border-red-500/50",
    TRAINER: "bg-blue-500/20 text-blue-400 border-blue-500/50",
    TRAINEE: "bg-green-500/20 text-green-400 border-green-500/50",
  };
  const roleStyle = userProfile?.role ? roleColors[userProfile.role] : roleColors["TRAINEE"];

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
          <p className="font-semibold opacity-80">Calorie Goal ({targetCalories})</p>
          <h2 className="text-4xl font-bold mt-3">
            {goalPercentage}%
          </h2>
          <div className="w-full bg-green-700/30 h-2 mt-4 rounded-full overflow-hidden">
             <div className="bg-black h-full rounded-full" style={{ width: `${goalPercentage}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        
        {/* Left Column: Profile & Trainer */}
        <div className="space-y-6 col-span-1">
          {/* Profile Section */}
          <div className="bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-700/50">
          <div className="flex justify-between items-start mb-6">
             <h2 className="text-xl font-bold text-white">My Profile</h2>
             {userProfile?.role && (
               <span className={`px-3 py-1 rounded-full text-xs font-bold border ${roleStyle}`}>
                 {userProfile.role}
               </span>
             )}
          </div>
          
          {userProfile ? (
            <div className="space-y-4">
              <div>
                <p className="text-slate-500 text-sm">Full Name</p>
                <p className="text-white font-medium text-lg">{userProfile.fullName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700/30 p-3 rounded-xl border border-slate-700">
                  <p className="text-slate-500 text-sm">Age</p>
                  <p className="text-white font-medium">{userProfile.age} yrs</p>
                </div>
                <div className="bg-slate-700/30 p-3 rounded-xl border border-slate-700">
                  <p className="text-slate-500 text-sm">Weight</p>
                  <p className="text-white font-medium">{userProfile.weight} kg</p>
                </div>
              </div>
              <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-700 mt-2">
                <p className="text-slate-500 text-sm mb-1">Fitness Goal</p>
                <p className="text-green-400 font-semibold uppercase tracking-wider text-sm">
                  {userProfile.fitnessGoal ? userProfile.fitnessGoal.replace('_', ' ') : 'NOT SET'}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-slate-500">Profile data unavailable.</p>
          )}
        </div>

        {/* My Trainer Section */}
        {activeTrainer && (
          <div className="bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-700/50">
            <h2 className="text-xl font-bold text-white mb-4">My Trainer</h2>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-slate-700 overflow-hidden shrink-0">
                 <img src={`https://i.pravatar.cc/150?u=${activeTrainer.trainerName}`} alt={activeTrainer.trainerName} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-lg font-bold text-white">{activeTrainer.trainerName}</div>
                <div className="text-sm text-green-400">Active Coach</div>
              </div>
            </div>
            <a href="/trainer-dashboard" className="block w-full bg-slate-700 hover:bg-slate-600 transition text-white text-center py-2 rounded-xl text-sm font-semibold">
              View Plan & Progress
            </a>
          </div>
        )}
      </div>

        {/* Activity & Goals Section */}
        <div className="bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-700/50 lg:col-span-2 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Activity Summary & Goal Progress</h2>
            <p className="text-slate-400 text-sm mb-6">Track your daily and monthly progress towards your fitness goals.</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700/30 p-6 rounded-2xl border border-slate-700 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-orange-500/20 text-orange-400 rounded-full flex items-center justify-center mb-3">
                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path></svg>
                </div>
                <p className="text-3xl font-bold text-white mb-1">{workoutStats.todayCaloriesBurned}</p>
                <p className="text-slate-400 text-sm">Calories Burned Today</p>
              </div>

              <div className="bg-slate-700/30 p-6 rounded-2xl border border-slate-700 flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-3">
                   <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <p className="text-3xl font-bold text-white mb-1">{userProfile?.activityLevel ? userProfile.activityLevel.replace('_', ' ') : 'MODERATE'}</p>
                <p className="text-slate-400 text-sm">Current Activity Level</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-white font-semibold mb-3">Quick Actions</h3>
            <div className="flex gap-4">
               <a href="/workout" className="bg-green-500 hover:bg-green-600 transition p-3 rounded-xl text-center w-full shadow text-white font-medium">Add Workout</a>
               <a href="/diet" className="bg-slate-700 hover:bg-slate-600 border border-slate-600 transition p-3 rounded-xl text-center w-full shadow text-white font-medium">Log Meal</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
