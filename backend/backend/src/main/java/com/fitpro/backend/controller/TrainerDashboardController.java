package com.fitpro.backend.controller;

import com.fitpro.backend.dto.AssignedDietRequest;
import com.fitpro.backend.dto.AssignedWorkoutRequest;
import com.fitpro.backend.model.AssignedDiet;
import com.fitpro.backend.model.AssignedWorkout;
import com.fitpro.backend.service.TrainerDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/trainer-dashboard")
@RequiredArgsConstructor
public class TrainerDashboardController {

    private final TrainerDashboardService dashboardService;

    @PostMapping("/assign-workout")
    public ResponseEntity<AssignedWorkout> assignWorkout(Principal principal, @RequestBody AssignedWorkoutRequest request) {
        return ResponseEntity.ok(dashboardService.assignWorkout(principal.getName(), request));
    }

    @PostMapping("/assign-diet")
    public ResponseEntity<AssignedDiet> assignDiet(Principal principal, @RequestBody AssignedDietRequest request) {
        return ResponseEntity.ok(dashboardService.assignDiet(principal.getName(), request));
    }

    @GetMapping("/trainee/{traineeId}/workouts")
    public ResponseEntity<List<AssignedWorkout>> getAssignedWorkouts(@PathVariable Long traineeId) {
        return ResponseEntity.ok(dashboardService.getAssignedWorkouts(traineeId));
    }

    @GetMapping("/trainee/{traineeId}/diets")
    public ResponseEntity<List<AssignedDiet>> getAssignedDiets(@PathVariable Long traineeId) {
        return ResponseEntity.ok(dashboardService.getAssignedDiets(traineeId));
    }
}
