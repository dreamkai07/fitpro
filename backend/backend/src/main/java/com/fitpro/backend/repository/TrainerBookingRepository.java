package com.fitpro.backend.repository;

import com.fitpro.backend.model.TrainerBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface TrainerBookingRepository extends JpaRepository<TrainerBooking, Long> {
    List<TrainerBooking> findByTrainerId(Long trainerId);
    List<TrainerBooking> findByTraineeId(Long traineeId);
    Optional<TrainerBooking> findByTraineeIdAndStatus(Long traineeId, String status);
}
