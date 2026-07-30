package com.fitpro.backend.repository;

import com.fitpro.backend.model.TrainerReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TrainerReviewRepository extends JpaRepository<TrainerReview, Long> {
    List<TrainerReview> findByTrainerId(Long trainerId);
}
