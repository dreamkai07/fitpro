package com.fitpro.backend.dto;

import lombok.Data;

@Data
public class AssignedWorkoutRequest {
    private Long traineeId;
    private String exerciseName;
    private Integer sets;
    private Integer repetitions;
    private Integer restTimeSeconds;
    private String difficulty;
    private String instructions;
}
