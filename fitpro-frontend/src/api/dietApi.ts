import api from "./axios";

export interface DietEntry {
  id: number;
  foodName: string;
  mealType: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  quantity: number;
  unit: string;
  entryDate: string;
  createdAt: string;
}

export const getMealsToday = () =>
  api.get<DietEntry[]>("/diet/meals/today");

export const getNutrition = (date?: string) =>
  api.get("/diet/nutrition", {
    params: { date },
  });

export const addMeal = (data: Partial<DietEntry>) =>
  api.post<DietEntry>("/diet/meals", data);

export const deleteMeal = (id: number) =>
  api.delete(`/diet/meals/${id}`);