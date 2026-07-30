package com.fitpro.backend.dto;

import lombok.Data;

@Data
public class AssignedDietRequest {
    private Long traineeId;
    private String breakfast;
    private String lunch;
    private String snacks;
    private String dinner;
    private Integer totalCalories;
    private Double totalProtein;
    private Double totalCarbs;
    private Double totalFats;
}
