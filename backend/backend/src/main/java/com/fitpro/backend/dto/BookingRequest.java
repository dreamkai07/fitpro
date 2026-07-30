package com.fitpro.backend.dto;

import lombok.Data;

@Data
public class BookingRequest {
    private Long trainerId;
    private String notes;
}
