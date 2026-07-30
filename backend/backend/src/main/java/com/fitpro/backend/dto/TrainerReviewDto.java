package com.fitpro.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TrainerReviewDto {
    private Long id;
    private Long traineeId;
    private String traineeName;
    private Integer rating;
    private String reviewComment;
    private LocalDateTime reviewDate;
}
