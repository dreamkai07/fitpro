package com.fitpro.backend.service;

import com.fitpro.backend.dto.TrainerProfileDto;
import com.fitpro.backend.dto.TrainerProfileRequest;
import com.fitpro.backend.model.TrainerProfile;
import com.fitpro.backend.model.User;
import com.fitpro.backend.repository.TrainerProfileRepository;
import com.fitpro.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TrainerService {

    private final TrainerProfileRepository trainerProfileRepository;
    private final UserRepository userRepository;

    public List<TrainerProfileDto> getAllTrainers() {
        return trainerProfileRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public TrainerProfileDto getTrainerProfile(Long trainerId) {
        TrainerProfile profile = trainerProfileRepository.findByUserId(trainerId)
                .orElseThrow(() -> new RuntimeException("Trainer profile not found"));
        return mapToDto(profile);
    }

    public TrainerProfileDto createOrUpdateProfile(String username, TrainerProfileRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!"TRAINER".equalsIgnoreCase(user.getRole())) {
            throw new RuntimeException("Only trainers can update their profile");
        }

        TrainerProfile profile = trainerProfileRepository.findByUserId(user.getId())
                .orElse(new TrainerProfile());

        profile.setUser(user);
        profile.setAboutMe(request.getAboutMe());
        profile.setExperienceYears(request.getExperienceYears());
        profile.setHourlyPrice(request.getHourlyPrice());
        profile.setMonthlyPrice(request.getMonthlyPrice());
        profile.setSpecializations(request.getSpecializations());
        profile.setCertifications(request.getCertifications());
        profile.setLanguagesSpoken(request.getLanguagesSpoken());
        profile.setAvailabilitySchedule(request.getAvailabilitySchedule());
        profile.setAchievements(request.getAchievements());
        profile.setTransformationGallery(request.getTransformationGallery());
        profile.setProfilePhotoUrl(request.getProfilePhotoUrl());
        
        // Default values for new profiles
        if (profile.getId() == null) {
            profile.setActiveClients(0);
            profile.setRating(0.0);
            profile.setTotalReviews(0);
            profile.setIsVerified(false);
        }

        TrainerProfile savedProfile = trainerProfileRepository.save(profile);
        return mapToDto(savedProfile);
    }

    private TrainerProfileDto mapToDto(TrainerProfile profile) {
        TrainerProfileDto dto = new TrainerProfileDto();
        dto.setId(profile.getId());
        dto.setUserId(profile.getUser().getId());
        dto.setFullName(profile.getUser().getFullName());
        dto.setUsername(profile.getUser().getUsername());
        dto.setAboutMe(profile.getAboutMe());
        dto.setExperienceYears(profile.getExperienceYears());
        dto.setHourlyPrice(profile.getHourlyPrice());
        dto.setMonthlyPrice(profile.getMonthlyPrice());
        dto.setActiveClients(profile.getActiveClients());
        dto.setRating(profile.getRating());
        dto.setTotalReviews(profile.getTotalReviews());
        dto.setIsVerified(profile.getIsVerified());
        dto.setSpecializations(profile.getSpecializations());
        dto.setCertifications(profile.getCertifications());
        dto.setLanguagesSpoken(profile.getLanguagesSpoken());
        dto.setAvailabilitySchedule(profile.getAvailabilitySchedule());
        dto.setAchievements(profile.getAchievements());
        dto.setTransformationGallery(profile.getTransformationGallery());
        dto.setProfilePhotoUrl(profile.getProfilePhotoUrl());
        return dto;
    }
}
