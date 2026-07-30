package com.fitpro.backend.controller;

import com.fitpro.backend.dto.TrainerReviewDto;
import com.fitpro.backend.dto.TrainerReviewRequest;
import com.fitpro.backend.service.TrainerReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class TrainerReviewController {

    private final TrainerReviewService reviewService;

    @PostMapping
    public ResponseEntity<TrainerReviewDto> addReview(Principal principal, @RequestBody TrainerReviewRequest request) {
        return ResponseEntity.ok(reviewService.addReview(principal.getName(), request));
    }

    @GetMapping("/trainer/{trainerId}")
    public ResponseEntity<List<TrainerReviewDto>> getTrainerReviews(@PathVariable Long trainerId) {
        return ResponseEntity.ok(reviewService.getReviewsForTrainer(trainerId));
    }
}
