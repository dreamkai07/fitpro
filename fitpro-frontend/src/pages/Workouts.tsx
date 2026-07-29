import { useEffect, useState } from "react";
import { type Workout, getWorkouts } from "../api/workoutApi";
import WorkoutList from "../components/workout/WorkoutList";
import WorkoutForm from "../components/workout/WorkoutForm";

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const fetchWorkouts = async () => {
    setLoading(true);
    try {
      const res = await getWorkouts();
      setWorkouts(res.data);
    } catch (error) {
      console.error("Error fetching workouts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleWorkoutAdded = (newWorkout: Workout) => {
    setWorkouts((prev) => [newWorkout, ...prev]);
    setShowForm(false);
  };

  const handleWorkoutDeleted = (id: number) => {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Your Workouts</h1>
          <p className="text-slate-400 mt-2">Track your fitness journey and progress.</p>
        </div>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-500 hover:bg-green-600 transition text-black font-bold py-3 px-6 rounded-xl shadow-lg shadow-green-500/20"
          >
            + Log Workout
          </button>
        )}
      </div>

      {showForm ? (
        <div className="mb-10 max-w-2xl mx-auto">
          <WorkoutForm 
            onSuccess={handleWorkoutAdded} 
            onCancel={() => setShowForm(false)} 
          />
        </div>
      ) : null}

      {loading ? (
        <div className="text-center text-slate-400 py-10">Loading workouts...</div>
      ) : (
        <WorkoutList workouts={workouts} onWorkoutDeleted={handleWorkoutDeleted} />
      )}
    </div>
  );
}
