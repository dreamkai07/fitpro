package com.fitpro.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TrainerBookingDto {
    private Long id;
    private Long trainerId;
    private String trainerName;
    private Long traineeId;
    private String traineeName;
    private String status;
    private String notes;
    private LocalDateTime bookingDate;
}
