package com.fitpro.backend.dto;

import lombok.Data;

@Data
public class TrainerReviewRequest {
    private Long trainerId;
    private Integer rating;
    private String reviewComment;
}
