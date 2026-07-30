package com.fitpro.backend.repository;

import com.fitpro.backend.model.AssignedWorkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AssignedWorkoutRepository extends JpaRepository<AssignedWorkout, Long> {
    List<AssignedWorkout> findByTraineeId(Long traineeId);
    List<AssignedWorkout> findByTrainerId(Long trainerId);
}
