package com.fitpro.backend.service;

import com.fitpro.backend.dto.AssignedDietRequest;
import com.fitpro.backend.dto.AssignedWorkoutRequest;
import com.fitpro.backend.model.AssignedDiet;
import com.fitpro.backend.model.AssignedWorkout;
import com.fitpro.backend.model.User;
import com.fitpro.backend.repository.AssignedDietRepository;
import com.fitpro.backend.repository.AssignedWorkoutRepository;
import com.fitpro.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TrainerDashboardService {

    private final AssignedWorkoutRepository workoutRepository;
    private final AssignedDietRepository dietRepository;
    private final UserRepository userRepository;

    public AssignedWorkout assignWorkout(String trainerUsername, AssignedWorkoutRequest request) {
        User trainer = userRepository.findByUsername(trainerUsername)
                .orElseThrow(() -> new RuntimeException("Trainer not found"));
        User trainee = userRepository.findById(request.getTraineeId())
                .orElseThrow(() -> new RuntimeException("Trainee not found"));

        if (!trainer.getId().equals(trainee.getActiveTrainerId())) {
            throw new RuntimeException("You are not the active trainer for this trainee");
        }

        AssignedWorkout workout = new AssignedWorkout();
        workout.setTrainer(trainer);
        workout.setTrainee(trainee);
        workout.setExerciseName(request.getExerciseName());
        workout.setSets(request.getSets());
        workout.setRepetitions(request.getRepetitions());
        workout.setRestTimeSeconds(request.getRestTimeSeconds());
        workout.setDifficulty(request.getDifficulty());
        workout.setInstructions(request.getInstructions());

        return workoutRepository.save(workout);
    }

    public List<AssignedWorkout> getAssignedWorkouts(Long traineeId) {
        return workoutRepository.findByTraineeId(traineeId);
    }

    public AssignedDiet assignDiet(String trainerUsername, AssignedDietRequest request) {
        User trainer = userRepository.findByUsername(trainerUsername)
                .orElseThrow(() -> new RuntimeException("Trainer not found"));
        User trainee = userRepository.findById(request.getTraineeId())
                .orElseThrow(() -> new RuntimeException("Trainee not found"));

        if (!trainer.getId().equals(trainee.getActiveTrainerId())) {
            throw new RuntimeException("You are not the active trainer for this trainee");
        }

        AssignedDiet diet = new AssignedDiet();
        diet.setTrainer(trainer);
        diet.setTrainee(trainee);
        diet.setBreakfast(request.getBreakfast());
        diet.setLunch(request.getLunch());
        diet.setSnacks(request.getSnacks());
        diet.setDinner(request.getDinner());
        diet.setTotalCalories(request.getTotalCalories());
        diet.setTotalProtein(request.getTotalProtein());
        diet.setTotalCarbs(request.getTotalCarbs());
        diet.setTotalFats(request.getTotalFats());

        return dietRepository.save(diet);
    }

    public List<AssignedDiet> getAssignedDiets(Long traineeId) {
        return dietRepository.findByTraineeId(traineeId);
    }
}
