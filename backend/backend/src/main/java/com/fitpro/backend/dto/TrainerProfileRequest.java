package com.fitpro.backend.dto;

import lombok.Data;
import java.util.List;

@Data
public class TrainerProfileRequest {
    private String aboutMe;
    private Integer experienceYears;
    private Double hourlyPrice;
    private Double monthlyPrice;
    private List<String> specializations;
    private List<String> certifications;
    private List<String> languagesSpoken;
    private String availabilitySchedule;
    private List<String> achievements;
    private List<String> transformationGallery;
    private String profilePhotoUrl;
}
