import type { Workout } from "../../api/workoutApi";
import { deleteWorkout } from "../../api/workoutApi";
import { Trash2 } from "lucide-react";
import { useState } from "react";

interface WorkoutListProps {
  workouts: Workout[];
  onWorkoutDeleted: (id: number) => void;
}

export default function WorkoutList({ workouts, onWorkoutDeleted }: WorkoutListProps) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this workout?")) return;
    
    setDeletingId(id);
    try {
      await deleteWorkout(id);
      onWorkoutDeleted(id);
    } catch (error) {
      console.error("Failed to delete workout", error);
      alert("Failed to delete workout.");
    } finally {
      setDeletingId(null);
    }
  };

  if (workouts.length === 0) {
    return (
      <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-center text-slate-400 shadow-lg">
        No workouts found. Time to hit the gym!
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {workouts.map((workout) => (
        <div key={workout.id} className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700/50 hover:border-slate-500 transition-colors group">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors">{workout.workoutName}</h3>
              <span className="inline-block px-2 py-1 bg-slate-700 text-xs font-semibold rounded-md text-slate-300 mt-2">
                {workout.workoutType}
              </span>
            </div>
            <button 
              onClick={() => handleDelete(workout.id)}
              disabled={deletingId === workout.id}
              className="text-slate-500 hover:text-red-400 transition p-2 hover:bg-red-400/10 rounded-lg"
            >
              <Trash2 size={18} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm text-slate-400">
            <div>
              <p className="font-semibold text-slate-300">Duration</p>
              <p>{workout.durationMinutes} mins</p>
            </div>
            {workout.caloriesBurned > 0 && (
              <div>
                <p className="font-semibold text-slate-300">Burned</p>
                <p>{workout.caloriesBurned} kcal</p>
              </div>
            )}
            {workout.sets > 0 && (
              <div>
                <p className="font-semibold text-slate-300">Sets x Reps</p>
                <p>{workout.sets} x {workout.reps}</p>
              </div>
            )}
            {workout.weight > 0 && (
              <div>
                <p className="font-semibold text-slate-300">Weight</p>
                <p>{workout.weight} kg</p>
              </div>
            )}
          </div>
          
          {workout.notes && (
             <div className="mt-4 pt-4 border-t border-slate-700/50">
               <p className="text-sm text-slate-400 italic">"{workout.notes}"</p>
             </div>
          )}
          
          <div className="mt-4 text-xs text-slate-500 text-right">
            {new Date(workout.workoutDate).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
}
