package com.fitpro.backend.service;

import com.fitpro.backend.dto.TrainerReviewDto;
import com.fitpro.backend.dto.TrainerReviewRequest;
import com.fitpro.backend.model.TrainerProfile;
import com.fitpro.backend.model.TrainerReview;
import com.fitpro.backend.model.User;
import com.fitpro.backend.repository.TrainerProfileRepository;
import com.fitpro.backend.repository.TrainerReviewRepository;
import com.fitpro.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TrainerReviewService {

    private final TrainerReviewRepository reviewRepository;
    private final TrainerProfileRepository trainerProfileRepository;
    private final UserRepository userRepository;

    public TrainerReviewDto addReview(String traineeUsername, TrainerReviewRequest request) {
        User trainee = userRepository.findByUsername(traineeUsername)
                .orElseThrow(() -> new RuntimeException("Trainee not found"));
        User trainer = userRepository.findById(request.getTrainerId())
                .orElseThrow(() -> new RuntimeException("Trainer not found"));

        TrainerReview review = new TrainerReview();
        review.setTrainee(trainee);
        review.setTrainer(trainer);
        review.setRating(request.getRating());
        review.setReviewComment(request.getReviewComment());

        TrainerReview saved = reviewRepository.save(review);

        // Update trainer rating
        TrainerProfile profile = trainerProfileRepository.findByUserId(trainer.getId())
                .orElseThrow(() -> new RuntimeException("Trainer profile not found"));
        
        List<TrainerReview> allReviews = reviewRepository.findByTrainerId(trainer.getId());
        double avgRating = allReviews.stream().mapToInt(TrainerReview::getRating).average().orElse(0.0);
        
        profile.setRating(avgRating);
        profile.setTotalReviews(allReviews.size());
        trainerProfileRepository.save(profile);

        return mapToDto(saved);
    }

    public List<TrainerReviewDto> getReviewsForTrainer(Long trainerId) {
        return reviewRepository.findByTrainerId(trainerId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    private TrainerReviewDto mapToDto(TrainerReview review) {
        TrainerReviewDto dto = new TrainerReviewDto();
        dto.setId(review.getId());
        dto.setTraineeId(review.getTrainee().getId());
        dto.setTraineeName(review.getTrainee().getFullName());
        dto.setRating(review.getRating());
        dto.setReviewComment(review.getReviewComment());
        dto.setReviewDate(review.getReviewDate());
        return dto;
    }
}
