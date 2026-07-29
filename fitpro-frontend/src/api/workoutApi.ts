import api from "./axios";

export interface Workout {
  id: number;
  workoutName: string;
  workoutType: string;
  durationMinutes: number;
  caloriesBurned: number;
  sets: number;
  reps: number;
  weight: number;
  notes: string;
  workoutDate: string;
  createdAt: string;
}

export const getWorkouts = () =>
  api.get<Workout[]>("/workouts");

export const getWorkoutStats = () =>
  api.get("/workouts/stats");

export const addWorkout = (data: Partial<Workout>) =>
  api.post<Workout>("/workouts", data);

export const deleteWorkout = (id: number) =>
  api.delete(`/workouts/${id}`);