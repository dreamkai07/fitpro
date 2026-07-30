package com.fitpro.backend.dto;

import lombok.Data;

@Data
public class UpdateProfileRequest {
    private String fullName;
    private Integer age;
    private Double weight;
    private Double height;
    private String fitnessGoal;
    private String activityLevel;
    private Integer calorieTarget;
    private Integer proteinTarget;
    private String role;
}
